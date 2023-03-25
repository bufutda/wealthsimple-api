import WebSocket from 'ws';
import { EventEmitter } from 'node:events';
import {
    BASE_WS_TRADE_SERVICE,
    WEBSOCKET_TICKET,
    BASE_WS_SOCKET
} from './endpoints.mjs';
import {SocketNotInitializedException} from './exceptions.mjs';
import {post} from './fetch.mjs';


export class WSSocket extends EventEmitter {
    #socket = null;
    #socketMessages = [];

    constructor(authenticator) {
        super();

        this.authenticator = authenticator;
        this.#socket = null;
        this.#socketMessages = [];
    }

    async initSocket() {
        const {ticket} = await (await post(
            [BASE_WS_TRADE_SERVICE, WEBSOCKET_TICKET],
            null,
            {
                Authorization: this.authenticator.authorizationHeader(),
                'x-ws-profile': 'trade',
                'x-ws-api-version': '12'
            }
        )).body;

        const params = new URLSearchParams(Object.entries({
            ticket,
        }));

        this.#socket = new WebSocket(`${BASE_WS_SOCKET}?${params}`);

        this.#socket.on('error', err => this.emit('error', err));

        this.#socket.on('open', () => this.emit('open'));

        this.#socket.on('message', data => {
			data = JSON.parse(data.toString('utf-8'));
            this.#socketMessages.push(data);
            this.emit('message', data);
        });

        this.#socket.on('close', () => {
            this.#socket = null;
            this.#socketMessages = [];
            this.emit('close');
        });

        return ticket;
    }

    send(data) {
        if (!this.#socket) {
            throw new SocketNotInitializedException('Socket is not initialized');
        }
        this.#socket.send(data);
    }

    getSocketMessages() {
        if (!this.#socket) {
            throw new SocketNotInitializedException('Socket is not initialized');
        }
        return this.#socketMessages;
    }

    close() {
        if (this.#socket) {
			this.#socket.close();
        }
    }
}
