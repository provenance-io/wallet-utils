# Provenance Blockchain Foundation - Wallet Utils

Typescript Utilities for Provenance Blockchain Wallet

## Status

[![Latest Release][release-badge]][release-latest]
[![Apache 2.0 License][license-badge]][license-url]
[![LOC][loc-badge]][loc-report]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[license-badge]: https://img.shields.io/github/license/provenance-io/wallet-utils.svg
[license-url]: https://github.com/provenance-io/wallet-utils/blob/main/LICENSE
[release-badge]: https://img.shields.io/github/tag/provenance-io/wallet-utils.svg
[release-latest]: https://github.com/provenance-io/wallet-utils/releases/latest
[loc-badge]: https://tokei.rs/b1/github/provenance-io/wallet-utils
[loc-report]: https://github.com/provenance-io/wallet-utils
[lint-badge]: https://github.com/provenance-io/wallet-utils/workflows/Lint/badge.svg
[provenance]: https://provenance.io/#overview

## Use

Import the dependency

```bash
npm install @provenanceio/wallet-utils --save
```

> The package json import will look like this: "@provenanceio/wallet-utils": "^0.2.0"

Below is a quick example of how to use a GUI item in a component:

```js
import { buildMessage } from "@provenanceio/wallet-utils";

const type = 'MsgDelegate';
const sendMessage = {
    delegatorAddress,
    validatorAddress,
    amount: { denom: 'nhash', amount: sendAmountNHash },
  };
  const messageMsgSend = buildMessage(type, sendMessage);
  const message = createAnyMessageBase64(type, messageMsgSend as Message);
```

## System Requirements

- `node >= 16.14` (LTS)
- `npm >= 8.0` (included with node 16)
> It's recommended to use `n` ([GitHub](https://github.com/tj/n)) or `nvm` ([GitHub](https://github.com/nvm-sh/nvm)) to manage your local node/npm versions

## Contributing

Read the [contributing guide](/CONTRIBUTING.md) to learn about our development process, how to submit bugfixes and improvements, and how to build and test your changes.
