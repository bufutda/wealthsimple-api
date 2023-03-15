# GRAPHQL

All the requests in this directory are authenticated. See [AUTHENTICATION.md](../../main/AUTHENTICATION.md).

These are superior to the regular trade-service API calls as they can deal with data from WS Invest - which allows WS Cash information to be extracted.

```http
POST https://my.wealthsimple.com/graphql
x-ws-profile: invest
x-ws-api-version: 12

{
    "operationName": ":operation",
    "variables": {
    },
    "query": "..."
}
```
