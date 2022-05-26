# Contributing to @provenanceio/wallet-utils

Thank you for wanting to help us make this project great! Keep reading below to see some of our best practices.

## We love all contributions

Please know that there are many ways to contribute to the lib. Code contribution is one aspect of it, but documentation, tests, and package version improvements are equally as important.

## Contributing new components

1. Make sure you have the latest provenance-io/wallet-utils develop branch

2. Install the dependencies with npm:

> Make sure your terminal is navigated to your local provenance-io/wallet-utils directory

```sh
npm install
```

3. Create a new branch in the format of yourname/the-project-you-are-working-on/description-of-work

> Example: webbushka/web-wallet/support-new-msg

4. Make changes, commit and push to your branch

5. Go to [the repository](https://github.com/provenance-io/wallet-utils) and make a Pull Request.

The provenance team is monitoring for pull requests. We will review your pull request and if it is approved, then you may merge it into the requested branch. Please make sure to squash and merge.

### Semantic release

This GitHub action should automatically run when a PR is merged into the main branch. If something has failed in there, look at the details log. If you are expecting a certain version number and it has created a different one, please take a look at [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) and how to use them properly.

## Coding and commit style

We are using prettier to make our code uniform throughout. Please make sure you have the correct exentions installed, and your code has been formatted before submitting a PR.

The provenance team has implemented [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). Please take a look at the linked documentation to learn more about conventional commits. This is also how we can automatically version our application. These commits should be in the format: `<type>(<scope>): <subject>`
> An example commit could look like this: `docs: spelling error in contributing docs`

Our accepted types include:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests

When commiting run `npm run commit` to launch the commitizen wizard which will help ensure the commit message follow the convention.
