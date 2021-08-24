import { Octokit } from "@octokit/core";

import { createSymlink } from "../src";

describe("Smoke test", () => {
  it("{ createSymlink } export is a function", () => {
    expect(createSymlink).toBeInstanceOf(Function);
  });

  it("{ composeCreateSymlink } export is a function", () => {
    expect(createSymlink).toBeInstanceOf(Function);
  });

  it("createSymlink.VERSION is set", () => {
    expect(createSymlink.VERSION).toEqual("0.0.0-development");
  });

  it("Plugin usage", () => {
    const TestOctokit = Octokit.plugin(createSymlink);
    const octokit = new TestOctokit();
    expect(octokit.createSymlink).toBeInstanceOf(Function);
  });
});
