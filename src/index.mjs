import {WSAuthentication} from './authentication.mjs';
import {WSSocket} from './websocket.mjs';
import {GraphQL} from './graphql.mjs';
import {get} from './fetch.mjs';
import * as endpoints from './endpoints.mjs';
import {
    RequiredArgumentException,
    NotAuthenticatedException,
    NotFoundException
} from './exceptions.mjs';


export class WSAPI {
    constructor({
        authenticationOptions,
        tokens,
    } = {
        authenticationOptions: {
            clientID: null,
            rememberOTP: false
        },
        tokens: {
            accessToken: null,
            refreshToken: null,
            tokenType: null
        }
    }) {
        this.authenticator = new WSAuthentication(authenticationOptions);

        if (tokens.tokenType) {
            this.authenticator.initTokens(tokens.accessToken, tokens.refresh_token, tokens.tokenType);
        }

        this.socket = new WSSocket(this.authenticator);
        this.gql = new GraphQL(this.authenticator);
    }

    async #authenticatedGet(dest, headers={}) {
        headers.Authorization = this.authenticator.authorizationHeader();
        headers['x-ws-profile'] = 'trade';
        headers['x-ws-api-version'] = '12';

        const body = await (await get(dest, headers)).body;
        if (body.error === 'Not authorized') {
            throw new NotAuthenticatedException('Not authorized');
        }
        if (body.error === 'Record not found') {
            throw new NotFoundException('Record not found');
        }
        return body;
    }

    #paramsFromObj(obj={}) {
        const params = new URLSearchParams(
            Object.entries(obj).filter(([_, v]) => typeof v !== 'undefined' && v !== null)
        );

        if (params.toString()) {
            return `?${params.toString()}`;
        }
        return '';
    }

    async getInfo() {
        return (await this.authenticator.verifyToken()).body;
    }

    async getUser(user) {
        if (!user) {
            throw new RequiredArgumentException('Argument "user" is required');
        }

        return this.#authenticatedGet([endpoints.BASE_WS_PRODUCTION_API, endpoints.USER_GET, user]);
    }

    async getSubscription() {
        return this.#authenticatedGet([endpoints.BASE_WS_TRADE_SERVICE, endpoints.SUBSCRIPTION_GET]);
    }

    async getMe() {
        return this.#authenticatedGet([endpoints.BASE_WS_TRADE_SERVICE, endpoints.ME_GET]);
    }

    async getPerson(personFields=[
        'email', 'phone_numbers', 'residential_address', 'mailing_address', 'employment', 'jurisdictions',
        'preferred_first_name', 'citizenships', 'date_of_birth', 'locale', 'us_person', 'backup_withholding',
        'tax_identification_numbers', 'communication_materials', 'gender', 'insiders', 'kyc_submitted',
        'full_legal_name'
    ]) {
        const queryParams = new URLSearchParams(personFields.map(x => ['person_fields', x]));
        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.PERSON_GET,
            '?',
            queryParams.toString()
        ]);
    }

    async getExchangeRate() {
        return this.#authenticatedGet([endpoints.BASE_WS_TRADE_SERVICE, endpoints.FOREX_GET]);
    }

    async getMarkets() {
        return this.#authenticatedGet([endpoints.BASE_WS_TRADE_SERVICE, endpoints.MARKETS_GET]);
    }

    async getPositions({account_id, security_id, limit, offset} = {}) {
        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.POSITIONS_GET,
            this.#paramsFromObj({
                account_id,
                security_id,
                limit,
                offset
            })
        ]);
    }

    async getDeposits() {
        return this.#authenticatedGet([endpoints.BASE_WS_TRADE_SERVICE, endpoints.DEPOSITS_GET]);
    }

    async getAccounts() {
        return this.#authenticatedGet([endpoints.BASE_WS_TRADE_SERVICE, endpoints.ACCOUNTS_GET]);
    }

    async getBankAccounts() {
        return this.#authenticatedGet([endpoints.BASE_WS_TRADE_SERVICE, endpoints.BANKACCOUNTS_GET]);
    }

    async getInvestAccounts() {
        return this.#authenticatedGet([endpoints.BASE_WS_TRADE_SERVICE, endpoints.INVESTACCOUNTS_GET]);
    }

    async getActivities({account_ids, security_id, limit, bookmark, type} = {}) {
        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.ACTIVITIES_GET,
            this.#paramsFromObj({
                account_ids,
                security_id,
                limit,
                type,
                bookmark
            })
        ]);
    }

    async getHistoricalAccountValue(account_id, duration='1w', {combined_with_linked_account} = {}) {
        if (!account_id) {
            throw new RequiredArgumentException('Argument "account_id" is required');
        }

        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.ACCOUNT_HISTORY_GET,
            duration,
            this.#paramsFromObj({
                account_id,
                combined_with_linked_account
            })
        ]);
    }

    async getWatchlist() {
        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.WATCHLIST_GET
        ]);
    }

    async getReferrals() {
        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.REFERRALS_GET
        ]);
    }

    async getReferralBonuses() {
        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.REFERRALBONUS_GET
        ]);
    }

    async getMobileDashboard({account_id, max_positions, max_watchlist} = {}) {
        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.MOBILE_DASHBOARD_GET,
            this.#paramsFromObj({
                account_id,
                max_positions,
                max_watchlist
            })
        ]);
    }

    async getInstantAssetMovementEligability() {
        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.INSTANT_ASSET_GET
        ]);
    }

    async getOrder(order_id) {
        if (!order_id) {
            throw new RequiredArgumentException('Argument "order_id" is required');
        }

        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.ORDER_GET,
            order_id
        ]);
    }

    // TODO
    async getOrders() {
        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.ORDER_GET
        ]);
    }

    // TODO
    async getOrderTradeConfirmation(order_id) {
        if (!order_id) {
            throw new RequiredArgumentException('Argument "order_id" is required');
        }

        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.ORDER_GET,
            order_id,
            '/trade_confirmation_url'
        ]);
    }

    async searchForSecurity(query) {
        if (!query) {
            throw new RequiredArgumentException('Argument "query" is required');
        }

        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.SECURITY_GET,
            this.#paramsFromObj({
                query
            })
        ]);
    }

    async getSecurity(security_id) {
        if (!security_id) {
            throw new RequiredArgumentException('Argument "security_id" is required');
        }

        return this.#authenticatedGet([
            endpoints.BASE_WS_TRADE_SERVICE,
            endpoints.SECURITY_GET,
            security_id
        ]);
    }
}
