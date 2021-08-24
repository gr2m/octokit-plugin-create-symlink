import { Octokit } from "@octokit/core";
import fetchMock from "fetch-mock";

import { createSymlink, composeCreateSymlink } from "../src";

const MyOctokit = Octokit.plugin(createSymlink);

describe("happy path", () => {
  it("README example", async () => {
    const mock = fetchMock
      .sandbox()
      .post("path:/graphql", {
        data: {
          repository: {
            defaultBranchRef: {
              name: "main",
              target: {
                oid: "commitsha1",
                tree: {
                  oid: "treesha1",
                },
              },
            },
          },
        },
      })
      .post(
        "path:/repos/gr2m/test/git/blobs",
        {
          sha: "blobsha1",
        },
        {
          body: {
            content: "../README.md",
          },
        }
      )
      .post(
        "path:/repos/gr2m/test/git/trees",
        {
          sha: "treesha2",
        },
        {
          body: {
            base_tree: "treesha1",
            tree: [
              {
                path: "folder-with-symlinked-readme/README.md",
                mode: "120000",
                type: "blob",
                sha: "blobsha1",
              },
            ],
          },
        }
      )
      .post(
        "path:/repos/gr2m/test/git/commits",
        {
          sha: "commitsha2",
        },
        {
          body: {
            message:
              "Link folder-with-symlinked-readme/README.md to ../README.md",
            tree: "treesha2",
            parents: ["commitsha1"],
          },
        }
      )
      .patch(
        "path:/repos/gr2m/test/git/refs/heads%2Fmain",
        {},
        {
          body: {
            sha: "commitsha2",
          },
        }
      );

    const octokit = new MyOctokit({
      request: { fetch: mock },
    });

    // the symlink file that will be created or updated
    const sourcePath = "folder-with-symlinked-readme/README.md";

    // path to the existing file or directory, relative from `sourcePath`.
    const targetPath = "../README.md";

    const result = await octokit.createSymlink({
      owner: "gr2m",
      repo: "test",
      sourcePath,
      targetPath,
      message: `Link ${sourcePath} to ${targetPath}`,
    });

    expect(result).toEqual({
      commit: {
        sha: "commitsha2",
      },
    });
  });

  it("composeCreateSymlink", async () => {
    const mock = fetchMock
      .sandbox()
      .post("path:/graphql", {
        data: {
          repository: {
            defaultBranchRef: {
              name: "main",
              target: {
                oid: "commitsha1",
                tree: {
                  oid: "treesha1",
                },
              },
            },
          },
        },
      })
      .post(
        "path:/repos/gr2m/test/git/blobs",
        {
          sha: "blobsha1",
        },
        {
          body: {
            content: "../README.md",
          },
        }
      )
      .post(
        "path:/repos/gr2m/test/git/trees",
        {
          sha: "treesha2",
        },
        {
          body: {
            base_tree: "treesha1",
            tree: [
              {
                path: "folder-with-symlinked-readme/README.md",
                mode: "120000",
                type: "blob",
                sha: "blobsha1",
              },
            ],
          },
        }
      )
      .post(
        "path:/repos/gr2m/test/git/commits",
        {
          sha: "commitsha2",
        },
        {
          body: {
            message:
              "Link folder-with-symlinked-readme/README.md to ../README.md",
            tree: "treesha2",
            parents: ["commitsha1"],
          },
        }
      )
      .patch(
        "path:/repos/gr2m/test/git/refs/heads%2Fmain",
        {},
        {
          body: {
            sha: "commitsha2",
          },
        }
      );

    const octokit = new Octokit({
      request: { fetch: mock },
    });

    // the symlink file that will be created or updated
    const sourcePath = "folder-with-symlinked-readme/README.md";

    // path to the existing file or directory, relative from `sourcePath`.
    const targetPath = "../README.md";

    const result = await composeCreateSymlink(octokit, {
      owner: "gr2m",
      repo: "test",
      sourcePath,
      targetPath,
      message: `Link ${sourcePath} to ${targetPath}`,
    });

    expect(result).toEqual({
      commit: {
        sha: "commitsha2",
      },
    });
  });

  it("custom branch", async () => {
    const mock = fetchMock
      .sandbox()
      .post("path:/graphql", {
        data: {
          repository: {
            defaultBranchRef: {
              name: "main",
              target: {
                oid: "commitsha1",
                tree: {
                  oid: "treesha1",
                },
              },
            },
          },
        },
      })
      .post(
        "path:/repos/gr2m/test/git/blobs",
        {
          sha: "blobsha1",
        },
        {
          body: {
            content: "../README.md",
          },
        }
      )
      .post(
        "path:/repos/gr2m/test/git/trees",
        {
          sha: "treesha2",
        },
        {
          body: {
            base_tree: "treesha1",
            tree: [
              {
                path: "folder-with-symlinked-readme/README.md",
                mode: "120000",
                type: "blob",
                sha: "blobsha1",
              },
            ],
          },
        }
      )
      .post(
        "path:/repos/gr2m/test/git/commits",
        {
          sha: "commitsha2",
        },
        {
          body: {
            message:
              "Link folder-with-symlinked-readme/README.md to ../README.md",
            tree: "treesha2",
            parents: ["commitsha1"],
          },
        }
      )
      .patch(
        "path:/repos/gr2m/test/git/refs/heads%2Fmy-branch",
        {},
        {
          body: {
            sha: "commitsha2",
          },
        }
      );

    const octokit = new MyOctokit({
      request: { fetch: mock },
    });

    // the symlink file that will be created or updated
    const sourcePath = "folder-with-symlinked-readme/README.md";

    // path to the existing file or directory, relative from `sourcePath`.
    const targetPath = "../README.md";

    const result = await octokit.createSymlink({
      owner: "gr2m",
      repo: "test",
      sourcePath,
      targetPath,
      message: `Link ${sourcePath} to ${targetPath}`,
      branch: "my-branch",
    });

    expect(result).toEqual({
      commit: {
        sha: "commitsha2",
      },
    });
  });
});
