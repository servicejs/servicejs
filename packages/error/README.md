# @service/error

`@service/error` provides two shared error classes, which allow error classes to be extended and inheritance checks to be perfomed.

## Useful links & documentation

* [service.js Github repository](https://github.com/servicejs/servicejs)
* [service.js website](https://www.servicejs.org)
* [Learn service.js (tutorials + examples)](https://learn.servicejs.org)
* [service.js documentation](https://docs.servicejs.org)
* [Documentation for this package (@service/error)](https://docs.servicejs.org/packages/error)
* [Commercial support](https://www.servicejs.org/support)
* [Automorph (the company behind service.js)](https://www.automorph.com)

## Installation

If you're using Yarn:

```sh
yarn add @service/error
```

If you're using the `npm` command directly:

```sh
npm install @service/error
```

## Usage

This package exports the classes `DynamicError` and `ExtendableError`.

`ExtendableError` (from the [`ts-error`](https://github.com/gfmio/ts-error) package) is a base error class that can be extended to achieve custom error classes with a working inheritance hierarchy, supporting all browsers (including very old versions) and of course node.

`DynamicError` (from the [`dynamic-error`](https://github.com/gfmio/dynamic-error) package) extends `ExtendableError` and can(re-)compute its message and stack trace dynamically when its state changes. It is useful for error messages that dynamically depend on props passed in the error constructor.

```ts

import { DynamicError, ExtendableError } from "@service/error

class MyExtendableError extends ExtendableError {
    constructor() {
      super("An optional error message");
    }
}

class MyDynamicError<T> extends DynamicError {
    protected someVar: T;
  
    constructor(someVar: T) {
        super(() => {
            this.someVar = someVar;
        });
    }

    public errorMessage() {
        return `Some error message depending on properties of this object, like someVar${this.someVar}`;
    }
}

try {
    throw new MyDynamicError(42);
} catch (e) {
    if (e instanceof DynamicError) {
      console.error("A DynamicError has been caught", e);
    }
    if (e instanceof ExtendableError) {
      console.error("An ExtendableError has been caught. In this example both lines will thus get printed");
    }
}
```

## License: MIT

For the full license text, see [./LICENSE](./LICENSE).
