import {
    BASE_WS_PRODUCTION_API,
    OAUTH_GENERATE,
    OAUTH_CHECK,
    OAUTH_REFRESH
} from './endpoints.mjs';
import {
    AuthenticationException,
    CircularOTPException
} from './exceptions.mjs';

import {get, post} from './fetch.mjs';

const WS_TRADE_CLIENT_ID = '4da53ac2b03225bed1550eba8e4611e086c7b905a3855e6ed12ea08c246758fa';

export class WSAuthentication {
    constructor({clientID, rememberOTP} = {}) {
        this.clientID = clientID || WS_TRADE_CLIENT_ID;
        this.rememberOTP = rememberOTP || false;

        this.accessToken = null;
        this.tokenType = null;
        this.refreshToken = null;
    }

    authorizationHeader() {
        return `${this.tokenType} ${this.accessToken}`;
    }

    initTokens(accessToken, refreshToken, tokenType) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.tokenType = tokenType;
    }

    async authenticate({
        username,
        password,
        scopes,
        otpHeaders
    }, otpCallback) {
        scopes = scopes || ['invest.read', 'trade.read'];

        let response = await post([BASE_WS_PRODUCTION_API, OAUTH_GENERATE], {
            grant_type: 'password',
            skip_provision: true,
            scope: scopes.join(' '),
            client_id: this.clientID,
            username,
            password
        }, otpHeaders);

        const otpHeader = response.headers.get('x-wealthsimple-otp');
        if (!otpHeader) {
            const authBody = await response.body;
            if (authBody.error) {
                throw new AuthenticationException(authBody.error);
            }

            this.initTokens(
                authBody.access_token,
                authBody.refresh_token,
                authBody.token_type
            );
            this.createdAt = new Date(authBody.created_at);
            this.expiresAt = new Date(Date.now() + (authBody.expires_in * 1000));

            return this.authorizationHeader();
        }

        const otpParams = Object.fromEntries(otpHeader.split(';').map(x => x.trim().split('=')));
        if (Object.keys(otpParams).includes('required')) {
            const otpCode = await otpCallback(otpParams.method);

            return await this.authenticate(
                {
                    username,
                    password,
                    scopes,
                    otpHeaders: {
                        'x-wealthsimple-otp': `${otpCode};remember=${this.rememberOTP}`,
                        'x-wealthsimple-otp-authenticated-claim': response.headers.get(
                            'x-wealthsimple-otp-authenticated-claim'
                        )
                    }
                },
                function() {
                    throw new CircularOTPException('OTP was requested on an OTP request');
                }
            );
        }

        throw new AuthenticationException(
            `OAuth token fetch was unsuccessful: ${JSON.stringify(await response.body, null, 4)}`
        );
    }

    async refreshAuthToken() {
        const response = await post([BASE_WS_PRODUCTION_API, OAUTH_REFRESH], {
            grant_type: 'refresh_token',
            refresh_token: this.refreshToken,
            client_id: this.clientID
        });

        const authBody = await response.body;
        if (authBody.error) {
            throw new AuthenticationException(authBody.error);
        }

        this.initTokens(
            authBody.access_token,
            authBody.refresh_token,
            authBody.token_type
        );
        this.createdAt = new Date(authBody.created_at);
        this.expiresAt = new Date(Date.now() + (authBody.expires_in * 1000));

        return this.authorizationHeader();
    }

    async verifyToken() {
        return get([BASE_WS_PRODUCTION_API, OAUTH_CHECK], {
            Authorization: this.authorizationHeader()
        });
    }

    async checkToken() {
        const resp = await this.verifyToken();
        return resp.statusCode === 200;
    }
}
