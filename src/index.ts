import { getSignature } from "./utils";

const getMsgParams = (contents: string) =>
  JSON.stringify({
    domain: {
      name: "CyberConnect Verifier",
      version: "1",
    },
    message: {
      contents,
    },
    primaryType: "Permit",
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
      ],
      Permit: [{ name: "contents", type: "string" }],
    },
  });

export const twitterAuthorize = async (provider: any, address: string) => {
  if (!address) {
    throw Error("Address can not be empty.");
  }

  if (!provider) {
    throw Error("Provider can not be empty.");
  }

  const msgParams = getMsgParams("I'm verifying my Twitter account.");

  const sig = await getSignature({ provider, message: msgParams, address });

  return `sig:${sig}`;
};

export const twitterVerify = async (address: string, handle: string) => {
  const url = `https://cyberconnect-worker.twitter-verify.workers.dev/api/github-verify?handle=${handle}&addr=${address}`;
  const response = await fetch(url);
  const res = await response.json();

  if (res.errorText) {
    throw Error(res.errorText);
  }
};

export const githubAuthorize = async (
  provider: any,
  address: string,
  username: string
) => {
  if (!address) {
    throw Error("Address can not be empty.");
  }

  if (!provider) {
    throw Error("Provider can not be empty.");
  }

  const msgParams = getMsgParams(
    `I'm verifying my Github account with username ${username}.`
  );

  const sig = await getSignature({ provider, message: msgParams, address });

  return `sig:${sig}`;
};

export const githubVerify = async (address: string, username: string) => {
  const url = `https://cyberconnect-worker.twitter-verify.workers.dev/api/twitter-verify?handle=${username}&addr=${address}`;
  const response = await fetch(url);
  const res = await response.json();

  if (res.errorText) {
    throw Error(res.errorText);
  }
};
