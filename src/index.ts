import { getSignature } from "./utils";
import { endpoint } from "./const";
import { verifyGithubGql, verifyTwitterGql } from "./graphql";
import request from "graphql-request";

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

export const twitterAuthorize = async (
  provider: any,
  address: string,
  handle: string
) => {
  if (!address) {
    throw Error("Address can not be empty.");
  }

  if (!provider) {
    throw Error("Provider can not be empty.");
  }

  const msgParams = getMsgParams(
    `I'm verifying my Twitter account with handle ${handle}.`
  );

  const sig = await getSignature({ provider, message: msgParams, address });

  return `sig:${sig}`;
};

export const twitterVerify = async (
  address: string,
  handle: string,
  namespace?: string
) => {
  const res = await request(endpoint, verifyTwitterGql, {
    address,
    handle,
    namespace,
  });

  if (res?.verifyTwitter?.result !== "SUCCESS") {
    throw Error(res?.verifyTwitter?.result);
  }

  return res;
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

export const githubVerify = async (
  address: string,
  gistId: string,
  namespace?: string
) => {
  const res = await request(endpoint, verifyGithubGql, {
    address,
    gistId,
    namespace,
  });

  if (res?.verifyGithub?.result !== "SUCCESS") {
    throw Error(res?.verifyGithub?.result);
  }

  return res;
};
