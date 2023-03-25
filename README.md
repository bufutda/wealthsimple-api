# wealthsimple-api
Unofficial WealthSimple API Documentation

This information was extracted from the web WSTrade client as well as the mobile app.

Use at your own risk.

This API documentation does not cover requests with write scopes (placing orders, etc).

## API Documentation
See the following files
* [API.md](API.md)
* [AUTHENTICATION.md](AUTHENTICATION.md)
* [WEBSOCKET.md](WEBSOCKET.md)
* [GRAPHQL.md](graphql/README.md)

# Node Package
## Installation
Install via npm
```
npm i wealthsimple-api
```
Or simply clone the repo
```
git clone git@github.com:bufutda/wealthsimple-api.git
```

## Usage
```js
import {WSAPI} from 'wealthsimple-api';
import {createInterface} from 'node:readline';

function prompt(question) {
    return new Promise((resolve, _reject) => {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function main() {
    const api = new WSAPI();
    await api.authenticator.authenticate({
        username: 'example@example.com',
        password: '1234'
    }, (method) => prompt(`2FA Code Required. (Check ${method}) > `));
    
    // Regular API call
    console.log(await api.searchForSecurity('AAPL'));
    
    // GraphqL API call
    console.log(await (await api.gql.query).fetchSecurity({securityId: 'sec-s-3c2fe9c9cff54ba283d291eebbd091c8'}));
    
    // WebSocket API
    api.socket.on('message', console.log);
    await api.socket.initSocket();
}
```
