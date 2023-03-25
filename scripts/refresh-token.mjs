// refresh an authentication token

import {WSAuthentication} from '../src/authentication.mjs';

async function main() {
    if (!process.argv[2]) {
        console.error('Usage: refresh-token <oauth-token>');
        process.exit(1);
    }

    const auth = new WSAuthentication();
    auth.initTokens(null, process.argv[2], 'Bearer');
    console.log(await auth.refreshAuthToken());
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
