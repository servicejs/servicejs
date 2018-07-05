# service.js

## Code & package management

This repository contains the source code for all official service.js packages. The repository is managed using lerna, a tool for managing repostiories with multiple packages, which can have mutual dependencies.

It also uses yarn workspaces to correctly handle the shared and dependent node modules. **Therefore, you must use yarn to install packages and execute commands.** (However, you do not need to use yarn if you just use service.js in one of your projects).

### Setting up the repository

To install all dependencies at the root level, run `yarn install`, then you can run `lerna install` to install the dependencies of all packages and link the package versions.

### Bootstrapping a new package

There is a small helper script that will create a new package in the `packages` directory (if such a package does not yet exist). Run `yarn run bootstrap-new-package <PACKAGE_NAME>` and this will create the directory `packages/<PACKAGE_NAME>` and add all important core files. The package will be named `@service/<PACKAGE_NAME>`.

## License: MIT

See [./LICENSE](./LICENSE).
