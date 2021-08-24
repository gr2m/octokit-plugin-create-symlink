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
  import { createSymlink } from "https://cdn.skypack.dev/octokit-plugin-create-symlink";
</script>
```

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/core octokit-plugin-create-symlink`. Optionally replace `@octokit/core` with a compatible module

```js
const { Octokit } = require("@octokit/core");
const { createSymlink } = require("octokit-plugin-create-symlink");
```

</td></tr>
</tbody>
</table>

```js
const MyOctokit = Octokit.plugin(createSymlink);
const octokit = new MyOctokit({ auth: "secret123" });

const sourcePath = "README.md";
const targetPath = "folder-with-symlinked-readme/README.md";

octokit.createSymlink({
  owner: "gr2m",
  repo: "octokit-plugin-create-symlink",
  sourcePath,
  targetPath,
  message: `Link ${targetPath} to ${targetPath}`,
});
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
        <code>option name</code>
      </th>
      <th>
        <code>option type</code>
      </th>
      <td>
        <strong>Required.</strong> Description here
      </td>
    </tr>
  </tbody>
</table>## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
