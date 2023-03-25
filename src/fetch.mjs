import nodeFetch from 'node-fetch';
import {NonJSONResponseException} from './exceptions.mjs';

const DEBUG = true;

const fetch = async function(...args) {
    if (DEBUG) {
        console.log(
            args[1].method, args[0]
        );
        console.log(Object.entries(args[1].headers).map(([k, v]) => `${k}: ${v}`).join('\n'));

        if (args[1].method === 'POST') {
            console.log();
            console.log(JSON.parse(args[1].body));
        }
    }

    const resp = new Response(await nodeFetch(...args));

    if (DEBUG) {
        console.log();
        console.log(await resp.body);
    }

    return resp;
};

class Response {
    constructor(fetchResponse) {
        this.response = fetchResponse;
        this.statusCode = fetchResponse.status;
        this.headers = fetchResponse.headers;
        this.jsonBody = null;
    }

    get body() {
        return new Promise((resolve, reject) => {
            if (this.jsonBody) {
                resolve(this.jsonBody);
                return;
            }

            this.response.text().then(x => {
                try {
                    this.jsonBody = JSON.parse(x);
                } catch (e) {
                    console.error(x);
                    throw new NonJSONResponseException('Wealthsimple response was not JSON', {cause: e});
                }

                resolve(this.jsonBody);
            }).catch(reject);
        });
    }
}

export const post = async function(dest, body, headers) {
    headers = headers || {};

    if (body) {
        headers['content-type'] = 'application/json';
    }

    return await fetch(dest.join(''), {
        method: 'POST',
        headers,
        ...(body ? {
            body: JSON.stringify(body),
        } : {})
    });
};

export const get = async function(dest, headers) {
    headers = headers || {};

    return await fetch(dest.join(''), {
        method: 'GET',
        headers
    });
};
