# social-verifier

`Social Verifier` supports the APIs for users to simply implement social verify process. (Twitter supported currently).

You can check the list of verified mappings in [Connect-list](https://github.com/cyberconnecthq/connect-list) repo.

Also, you can use our [CyberConnect API](https://docs.cyberconnect.me/) to check an identity twitter account.

## Getting started

### Installation

```sh
npm install @cyberlab/social-verifier
or
yarn add @cyberlab/social-verifier
```

### Use the Verifier

`Social Verifier` uses a 3 step process for linking an Ethereum address to a social identity.

1. User uses their Ethereum private key to sign a message to get a message which contains the generated signature.
2. User posts this message on their social profile so others can view.
3. Our server recovers the signer address from the signature found in the social post.

#### Signing Data

```ts
import { twitterAuthorize } from "@cyberlab/cyberconnect";

const sig = twitterAuthorize(provider, address);
```

- `provider` - An ETH provider which should implement one of the following methods: send, sendAsync, request.
- `address` - The Ethereum address that you want to link with your profile.

#### Post message

You can customize your tweet text, but the text should include the sig from the Signing Data step

```ts
const text = `Verifying my Web3 identity on @cyberconnecthq: %23LetsCyberConnect %0A ${sig}`;

window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
```

#### Verify

After posting the tweet, you can call `twitterVerify` to link your address with your twitter account. You can check the list of verified mappings in [Connect-list](https://github.com/cyberconnecthq/connect-list) repo.

```ts
import { twitterVerify } from "@cyberlab/cyberconnect";

await twitterVerify(address, handle);
console.log("Verify Success!");
```

- `address` - The Ethereum address that you want to link with your twitter account.
- `handle` - The handle of your twitter account.

## Contributing

We are happy to accept any contributions, feel free to make a suggestion or submit a pull request.
