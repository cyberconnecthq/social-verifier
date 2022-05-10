import { gql } from "graphql-request";

export const verifyTwitterGql = gql`
  mutation VerifyTwitter(
    $address: String!
    $handle: String!
    $namespace: String
  ) {
    verifyTwitter(address: $address, handle: $handle, namespace: $namespace) {
      result
    }
  }
`;

export const verifyGithubGql = gql`
  mutation VerifyGithub(
    $address: String!
    $gistId: String!
    $namespace: String
  ) {
    verifyGithub(address: $address, gistId: $gistId, namespace: $namespace) {
      result
    }
  }
`;
