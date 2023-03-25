// generate a new authentication token

import {WSAuthentication} from '../src/authentication.mjs';
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
    const auth = new WSAuthentication();

    const username = await prompt('username > ');
    const password = await prompt('password > ');

    console.log(await auth.authenticate({
        username,
        password
    }, function(method) {
        return prompt(`2FA Code Required. (Check ${method}) > `);
    }));
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
