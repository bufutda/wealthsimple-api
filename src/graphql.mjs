import {readFile} from 'node:fs/promises';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

import {
    BASE_WS_GRAPHQL
} from './endpoints.mjs';

import gqlOperations from '../graphql/operations.mjs';
import {post} from './fetch.mjs';


export class GraphQL {
    #queries = null;

    constructor(authenticator) {
        this.authenticator = authenticator;
        this.#queries = null;
    }

    get query() {
        return new Promise((resolve, _reject) => {
            this.#loadQueries().then(() => {
                resolve(this.#queries);
            });
        });
    }

    async #loadQueries() {
        if (this.#queries) {
            return;
        }

        this.#queries = {};

        for (let [operation, operationName] of Object.entries(gqlOperations)) {
            const gql = await readFile(
                `${fileURLToPath(dirname(import.meta.url))}/../graphql/${operation}.gql`
            );

            this.#queries[operation] = async (variables={}) => this.#gqlRequest({
                operationName,
                variables,
                query: gql.toString('utf8')
            });
        }
    }

    async #gqlRequest({operationName, variables, query} = {}) {
        return await (await post(
            [BASE_WS_GRAPHQL],
            {
                operationName,
                variables,
                query
            },
            {
                Authorization: this.authenticator.authorizationHeader(),
                'x-ws-profile': 'invest',
                'x-ws-api-version': '12'
            }
        )).body;
    }
}
