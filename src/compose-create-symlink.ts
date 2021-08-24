import { Octokit } from "@octokit/core";

type Options = {
  owner: string;
  repo: string;
  sourcePath: string;
  targetPath: string;
  message: string;
  branch?: string;
};

export async function composeCreateSymlink(
  octokit: Octokit,
  { owner, repo, sourcePath, targetPath, message, branch }: Options
) {
  const query = `
    query ($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        defaultBranchRef {
          name
          target {
            oid
            ... on Commit {
              tree {
                oid
              }
            }
          }
        }
      }
    }
  `;

  // https://docs.github.com/en/rest/reference/repos#list-commits
  const {
    repository: {
      defaultBranchRef: {
        name: defaultBranch,
        target: {
          oid: latestCommitSha,
          tree: { oid: latestCommitTreeSha },
        },
      },
    },
  } = await octokit.graphql(query, {
    owner,
    repo,
  });

  // https://docs.github.com/en/rest/reference/git#create-a-blob
  const { data: blob } = await octokit.request(
    "POST /repos/{owner}/{repo}/git/blobs",
    {
      owner,
      repo,
      content: targetPath,
    }
  );

  // https://docs.github.com/en/rest/reference/git#create-a-tree
  const { data: tree } = await octokit.request(
    "POST /repos/{owner}/{repo}/git/trees",
    {
      owner,
      repo,
      base_tree: latestCommitTreeSha,
      tree: [
        {
          path: sourcePath,
          mode: "120000",
          type: "blob",
          sha: blob.sha,
        },
      ],
    }
  );

  // https://docs.github.com/en/rest/reference/git#create-a-commit
  const { data: newCommit } = await octokit.request(
    "POST /repos/{owner}/{repo}/git/commits",
    {
      owner,
      repo,
      message,
      tree: tree.sha,
      parents: [latestCommitSha],
    }
  );

  // https://docs.github.com/en/rest/reference/git#update-a-reference
  await octokit.request("PATCH /repos/{owner}/{repo}/git/refs/{ref}", {
    owner,
    repo,
    ref: `heads/${branch || defaultBranch}`,
    sha: newCommit.sha,
  });

  return {
    commit: newCommit,
  };
}
