# social-verifier

`Social Verifier` helps user to implement social verify process easily. (Twitter and Github supported).

You can check the list of verified mappings in [Connect List](https://github.com/cyberconnecthq/connect-list) repo.

Also, you can use our [CyberConnect API](https://docs.cyberconnect.me/) to check an identity Twitter account.

## Getting started

### Installation

```sh
npm install @cyberlab/social-verifier
or
yarn add @cyberlab/social-verifier
```

### Use the Verifier

- [Twitter](#Twitter)
- [Github](#Github)

---

### Twitter:

`Twitter Verifier` uses a 3 step process for linking an Ethereum address to a Twitter account.

1. Users use their Ethereum private key to sign a message with their Twitter handle to get a message which contains the generated signature.
2. Users post a tweet with this message so others can view.
3. Users send a verify request to our server with their wallet address. Our server will recover the signer address from the signature found in the tweet and write the verified inforamtion into [Connect List](https://github.com/cyberconnecthq/connect-list) if the signer address is the same as the address in the request.

#### Signing Data

Using `twitterAuthorize` to get signature message.

```ts
import { twitterAuthorize } from "@cyberlab/social-verifier";

const sig = twitterAuthorize(provider, address, handle);
```

- `provider` - An ETH provider which should implement one of the following methods: send, sendAsync, request.
- `address` - The Ethereum address that you want to link with your Twitter account.
- `handle` - The handle of your Twitter account.

#### Posting message

You can customize your tweet text, but the text should include the signature message from the `Signing Data` step.

```ts
const text = `Verifying my Web3 identity on @cyberconnecthq: %23LetsCyberConnect %0A ${sig}`;

window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
```

#### Verifying

After posting the tweet, you can call `twitterVerify` to link your address with your Twitter account. You can check the list of verified mappings in [Connect List](https://github.com/cyberconnecthq/connect-list) repo.

```ts
import { twitterVerify } from "@cyberlab/social-verifier";

try {
  await twitterVerify(address, handle);
  console.log("Verify Success!");
} catch (e) {
  console.log("Error: ", e.message);
}
```

- `address` - The Ethereum address that you want to link with your Twitter account.
- `handle` - The handle of your Twitter account.

---

### Github:

`Github Verifier` uses a 3 step process for linking an Ethereum address to a Github account.

1. Users use their Ethereum private key to sign a message with their Github username to get a message which contains the generated signature.
2. Users create a Github gist with this message.
3. Users send a verify request to our server with their wallet address and the gist id. Our server will recover the signer address from the signature found in the gist and write the verified inforamtion into [Connect List](https://github.com/cyberconnecthq/connect-list) if the signer address is the same as the address in the request.

#### Signing Data

Using `githubAuthorize` to get signature message.

```ts
import { githubAuthorize } from "@cyberlab/social-verifier";

const sig = githubAuthorize(provider, address, username);
```

- `provider` - An ETH provider which should implement one of the following methods: send, sendAsync, request.
- `address` - The Ethereum address that you want to link with your Github account.
- `username` - The username of your Github account.

#### Posting message

You need to create a gist in your Github. You can customize your gist text, but the text should include the signature message from the `Signing Data` step

#### Verifying

After posting the gist, you can call `githubVerify` to link your address with your Github account. You can check the list of verified mappings in [Connect List](https://github.com/cyberconnecthq/connect-list) repo.

```ts
import { githubVerify } from "@cyberlab/social-verifier";

try {
  await githubVerify(address, gist_id);
  console.log("Verify Success!");
} catch (e) {
  console.log("Error: ", e.message);
}
```

- `address` - The Ethereum address that you want to link with your Github account.
- `gist_id` - The id of your Github gist. It's the last part of your gist url.

## Contributing

We are happy to accept any contributions, feel free to make a suggestion or submit a pull request.
