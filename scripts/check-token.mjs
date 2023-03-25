// check an authentication token

import {WSAuthentication} from '../src/authentication.mjs';


async function main() {
    if (!process.argv[2]) {
        console.error('Usage: check-token <oauth-token>');
        process.exit(1);
    }

    const auth = new WSAuthentication();
    auth.initTokens(process.argv[2], null, 'Bearer');
    if (await auth.checkToken()) {
        console.log('token is valid');
    } else {
        console.log('token is not valid');
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
