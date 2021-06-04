# Contributing to React Native Paper Codemod

## [Code of Conduct](/CODE_OF_CONDUCT.md)

We want this community to be friendly and respectful to each other. Please read [the full text](/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Our Development Process

The core team works directly on GitHub and all work is public.

### Development workflow

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

1. Fork the repo and create your branch from `master` (a guide on [how to fork a repository](https://help.github.com/articles/fork-a-repo/)).
2. Run `yarn install` to setup the developement environment.
3. Do the changes you want and test them out with `yarn test` before sending a pull request.

### Commit message convention

We prefix our commit messages with one of the following to signify the kind of change:

- `fix`: bug fixes, e.g. fix card transform.
- `feat`: new features, e.g. add button transform.
- `refactor`: code/structure refactor, e.g. new structure folder for transforms.
- `test`: adding or updating tests.
- `chore`: tooling changes, e.g. change circle ci config.

### Linting and tests

We use `eslint` with `prettier` for linting and formatting the code, and `jest` for testing. Our pre-commit hooks verify that the linter and tests pass when commiting. You can also run the following commands manually:

- `yarn lint`: run eslint and prettier.
- `yarn test`: run tests.

### Sending a pull request

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that `eslint` and tests are passing.

## Reporting issues

You can report issues on our [bug tracker](https://github.com/callstack/react-native-paper-codemod/issues). Please follow the issue template when opening an issue.

## License

By contributing to React Native Paper Codemod, you agree that your contributions will be licensed under its **MIT** license.
