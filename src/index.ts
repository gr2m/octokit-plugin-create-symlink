import { Octokit } from "@octokit/core";
import { VERSION } from "./version";

import { composeCreateSymlink } from "./compose-create-symlink";
export { composeCreateSymlink } from "./compose-create-symlink";

/**
 * @param {Octokit} octokit
 */
export function createSymlink(octokit: Octokit) {
  return {
    createSymlink: composeCreateSymlink.bind(null, octokit),
  };
}
createSymlink.VERSION = VERSION;
