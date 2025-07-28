/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\nquery GetLaunches {\n  launchesPast(limit:10){\n    id\n    mission_name\n    launch_date_utc\n    launch_success\n    launch_site {\n      site_name\n    }\n    rocket{\n        rocket_name\n        rocket{\n            mass {\n              kg\n            }\n        }\n    }\n  }\n}\n    ": typeof types.GetLaunchesDocument,
};
const documents: Documents = {
    "\nquery GetLaunches {\n  launchesPast(limit:10){\n    id\n    mission_name\n    launch_date_utc\n    launch_success\n    launch_site {\n      site_name\n    }\n    rocket{\n        rocket_name\n        rocket{\n            mass {\n              kg\n            }\n        }\n    }\n  }\n}\n    ": types.GetLaunchesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetLaunches {\n  launchesPast(limit:10){\n    id\n    mission_name\n    launch_date_utc\n    launch_success\n    launch_site {\n      site_name\n    }\n    rocket{\n        rocket_name\n        rocket{\n            mass {\n              kg\n            }\n        }\n    }\n  }\n}\n    "): (typeof documents)["\nquery GetLaunches {\n  launchesPast(limit:10){\n    id\n    mission_name\n    launch_date_utc\n    launch_success\n    launch_site {\n      site_name\n    }\n    rocket{\n        rocket_name\n        rocket{\n            mass {\n              kg\n            }\n        }\n    }\n  }\n}\n    "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;