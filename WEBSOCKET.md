# WEBSOCKET

All the following requests are authenticated. See [AUTHENTICATION.md](../main/AUTHENTICATION.md).


## Get Socket Ticket
```http
POST https://trade-service.wealthsimple.com/websocket-ticket
```
```
{
    "ticket": "f8..55"
}
```

## Open Socket
```http
GET wss://trade-service.wealthsimple.com/websocket
```
|Query Param|Description|
|---|---|
|`ticket`|The ticket from [Get Socket Ticket](#get-socket-ticket)|
|`version`|`2`|
|`Sec-Websocket-Version`|`13`|
|`Sec-WebSocket-key`|`n..==` (Base64, redacted)|


## Socket Behaviour
A `GREETING` object will be sent to you, followed by an `ACCOUNT` object for each account, and then a `PRICE_QUOTE` object for every relevant security to you. Then the socket will be closed.

### Greeting Object
```json
{
    "type": "GREETING",
    "parameter": "websocket-abcbcbcbcbcbcbcbc",
    "deviceId": "123123123123123"
}
```

### Account Object
```json
{
    "type": "ACCOUNT",
    "id": "tfsa-abcabc",
    "version": 2,
    "buying_power": {
        "amount": 0,
        "currency": "USD"
    },
    "available_to_withdraw": {
        "amount": 0,
        "currency": "USD"
    },
    "current_balance": {
        "amount": 0,
        "currency": "USD"
    },
    "net_deposits": {
        "amount": 0,
        "currency": "USD"
    },
    "withdrawn_earnings": {
        "amount": 0,
        "currency": "USD"
    },
    "pending_orders": [],
    "inkind_transfer": "upgrade_completed"
}
```

### Price Quote Object
```json
{
    "type": "PRICE_QUOTE",
    "prices": {
        "sec-z-eth-dc40261c82a191b11e53426aa25d91af": {
            "object": "spot_quote",
            "security_id": "sec-z-eth-dc40261c82a191b11e53426aa25d91af",
            "amount": 2334.106495274,
            "currency": "CAD",
            "ask": 2347.823601361888,
            "ask_size": 0,
            "bid": 2320.4235842069015,
            "bid_size": 0,
            "high": 0,
            "last_size": 0,
            "low": 0,
            "open": 0,
            "volume": 0,
            "quote_date": "2023-03-15T09:33:21.752Z",
            "quoted_as_of": "2023-03-15T09:33:21.752Z",
            "last": 2334.106495274
        }
    }
}
```
