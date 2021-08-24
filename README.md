# octokit-plugin-create-symlink

> Octokit plugin to create a symlink to a file within the same repository

[![@latest](https://img.shields.io/npm/v/octokit-plugin-create-symlink.svg)](https://www.npmjs.com/package/octokit-plugin-create-symlink)
[![Build Status](https://github.com/gr2m/octokit-plugin-create-symlink/workflows/Test/badge.svg)](https://github.com/gr2m/octokit-plugin-create-symlink/actions?query=workflow%3ATest+branch%3Amain)

## usage

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

Load `octokit-plugin-create-symlink` and [`@octokit/core`](https://github.com/octokit/core.js) (or core-compatible module) directly from [cdn.skypack.dev](https://cdn.skypack.dev)

```html
<script type="module">
  import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
  import {
    createSymlink,
    composeCreateSymlink,
  } from "https://cdn.skypack.dev/octokit-plugin-create-symlink";
</script>
```

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/core octokit-plugin-create-symlink`. Optionally replace `@octokit/core` with a compatible module

```js
const { Octokit } = require("@octokit/core");
const {
  createSymlink,
  composeCreateSymlink,
} = require("octokit-plugin-create-symlink");
```

</td></tr>
</tbody>
</table>

This plugin creates or updates a file (source) as a symlink which points to another file (target). It does not check whether the source or target file exists. If there is no change, an empty commit is created.

### Use as plugin

```js
const MyOctokit = Octokit.plugin(createSymlink);
const octokit = new MyOctokit({ auth: "secret123" });

// the symlink file that will be created or updated
const sourcePath = "folder-with-symlinked-readme/README.md";

// path to the existing file or directory, relative from `sourcePath`.
const targetPath = "../README.md";

const { commit } = await octokit.createSymlink({
  owner: "gr2m",
  repo: "octokit-plugin-create-symlink",
  sourcePath,
  targetPath,
  message: `Link ${sourcePath}`,
});

console.log("Symlink created via %s", commit.html_url);
```

### Standalone

When using the `composeCreateSymlink` function, pass the `octokit` instance as first argument.

```js
const { commit } = await composeCreateSymlink(octokit, {
  owner: "gr2m",
  repo: "octokit-plugin-create-symlink",
  sourcePath,
  targetPath,
  message: `Link ${targetPath} to ${targetPath}`,
});
console.log("Symlink created via %s", commit.html_url);
```

## Options

<table width="100%">
  <thead align=left>
    <tr>
      <th width=150>
        name
      </th>
      <th width=70>
        type
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody align=left valign=top>
    <tr>
      <th>
        <code>owner</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required.</strong> Repository owner login
      </td>
    </tr>
    <tr>
      <th>
        <code>repo</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required.</strong> Repository name
      </td>
    </tr>
    <tr>
      <th>
        <code>sourcePath</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required.</strong> The symlink file that will be created or updated
      </td>
    </tr>
    <tr>
      <th>
        <code>targetPath</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required.</strong> Path to the existing file or directory, relative from `sourcePath`.
      </td>
    </tr>
    <tr>
      <th>
        <code>message</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required.</strong> Commit message
      </td>
    </tr>
    <tr>
      <th>
        <code>branch</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        Branch name to commit to. Defaults to the repository's default branch.
      </td>
    </tr>
  </tbody>
</table>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
