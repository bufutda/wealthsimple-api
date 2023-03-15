# API

All the following requests are authenticated. See [AUTHENTICATION.md](../main/AUTHENTICATION.md).

## Get User
```http
GET https://api.production.wealthsimple.com/v1/first_party/users/:user
```
|Param|Description|Options|
|---|---|---|
|`:user`|The user identifier to grab.|`user-aabcabc1abc`|

```http
{
    "object": "user",
    "id": "user-aabcabc1abc",
    "canonical_id": "user-aabcabc1abc",
    "application_family_id": "application_family-aabcabc1abc",
    "branch": "AB",
    "profile": "trade",
    "roles": [],
    "jurisdiction": "CA",
    "suspended_at": null,
    "suspension_type": null,
    "visitor_id_at_creation": null,
    "created_at": "2021-01-01T01:01:01.000Z",
    "updated_at": "2021-01-01T01:01:01.000Z",
    "client_id": "person-aabcabc1abc",
    "identity": {
        "object": "identity",
        "id": "identity-aabcabc1abc",
        "email": "example@example.com",
        "unconfirmed_email": null,
        "email_confirmed_at": "2021-01-01T01:01:01.000Z",
        "phone": "(123) 123-4567",
        "mfa_verified_at": null,
        "password_last_updated_at": null,
        "suspended_at": null,
        "suspension_type": null,
        "created_at": "2021-01-01T01:01:01.000Z",
        "updated_at": "2021-01-01T01:01:01.000Z"
    }
}
```

## Get Subscription
```http
GET https://trade-service.wealthsimple.com/subscription
```

```http
{
    "subscriptionTier": {
        "product": "trade",
        "name": "silver",
        "monthlyPrice": {
            "amount": "01",
            "currency": "CAD",
            "taxAmount": "0",
            "taxType": []
        },
        "snapQuotes": true,
        "usdAccounts": true,
        "fxSpreadBps": "150",
        "subscription": {
            "userId": "user-aabcabc1abc",
            "sourceAccountId": "non-registered-aabcabc1abc",
            "status": "active",
            "tierName": "silver",
            "id": "subscription-aabcabc1abc",
            "createdAt": "2021-01-01T01:01:01.000Z",
            "nextPaymentDate": "2021-01-01T01:01:01.000Z",
            "startDate": "2021-01-01T01:01:01.000Z",
            "endDate": null,
            "type": "PayingSubscription",
            "trialStartDate": "2021-01-01T01:01:01.000Z",
            "trialEndDate": "2021-01-01T01:01:01.000Z"
        },
        "priceAlerts": {
            "max": null
        }
    }
}
```

## Get Me
```http
GET https://trade-service.wealthsimple.com/me
```

```http
{
    "object": "user",
    "canonical_id": "user-aabcabc1abc",
    "created_at": "2021-01-01T01:01:01.000Z",
    "updated_at": "2021-01-01T01:01:01.000Z",
    "external_hw_person_id": "person-aabcabc1abc",
    "external_hw_user_id": "user-aabcabc1abc",
    "first_name": "John",
    "last_name": "Doe",
    "attempted_existing_bank_account_import": true,
    "attempted_existing_document_import": null,
    "email_subscription_token": "aabcabc1abc",
    "feature_flags": [
        "balance_service",
        "crypto",
        "tfsa",
        "push_notifications",
        "edit_kyc",
        "stock_discovery_v2",
        "sparkline_v2",
        "institutional_transfers_v2"
    ],
    "id": "user-aabcabc1abc",
    "external_hw_esignature_id": "document-aabcabc1abc",
    "account_signatures": [
        {
            "external_account_id": "tfsa-aabcabc1abc",
            "custodian_account_number": "aabcabc1abc",
            "external_esignature_id": "document-aabcabc1abc",
            "opened_at": "2021-01-01",
            "deleted_at": null
        }
    ],
    "email": "example@example.com",
    "identity_canonical_id": "identity-aabcabc1abc",
    "email_confirmed": true,
    "unconfirmed_email": null,
    "is_funded": true,
    "completed_usd_order_value_sum": 0,
    "can_create_referral": false
}
```

## Get Person
```http
GET https://trade-service.wealthsimple.com/person
```

|Query Param|Description|
|---|---|
|`person_fields`|Fields to include in the response. Can be specified multiple times|

```http
{
    "email": "example@example.com",
    "phone_numbers": [
        {
            "primary": true,
            "country_code": "1",
            "number": "1231234567",
            "type": "mobile"
        }
    ],
    "residential_address": {
        "street_name": "Example Rd",
        "street_number": "123",
        "province_state_region": "AA",
        "unit": null,
        "city": "Exampleton",
        "country": "CA",
        "postal_code": "ABC123"
    },
    "mailing_address": {
        "street_name": "Example Rd",
        "street_number": "123",
        "province_state_region": "AA",
        "unit": null,
        "city": "Exampleton",
        "country": "CA",
        "postal_code": "ABC123"
    },
    "employment": {
        "status": "employed",
        "employer_info": {
            "employer_name": "Wealthsimple",
            "employer_industry": "Fintech",
            "position": "Software Developer"
        }
    },
    "jurisdictions": [
        "CA"
    ],
    "preferred_first_name": null,
    "citizenships": [
        "CA"
    ],
    "date_of_birth": "1900-01-01",
    "locale": "en-CA",
    "us_person": false,
    "backup_withholding": null,
    "tax_identification_numbers": [
        {
            "type": "ca_sin_itn",
            "number": "123456789"
        }
    ],
    "communication_materials": "decline",
    "gender": "male",
    "insiders": [],
    "kyc_submitted": true,
    "full_legal_name": {
        "first_name": "John",
        "middle_names": [],
        "last_name": "Doe"
    }
}
```

## Get Exchange Rate
```http
GET https://trade-service.wealthsimple.com/forex
```

```http
{
    "USD": {
        "buy_rate": 1.000,
        "sell_rate": 1.000,
        "spread": 0.015,
        "fx_rate": 1.000
    }
}
```

## Get Markets
```http
GET https://trade-service.wealthsimple.com/markets
```

```http
{
    "object": "market",
    "results": [
        {
            "object": "market",
            "mic": "XTSX",
            "date": "2021-01-01",
            "open": "09:30:00",
            "lunch_start": null,
            "lunch_end": null,
            "close": "16:00:00",
            "exchange_name": "TSX-V",
            "cache_date": "2021-01-01",
            "next_open_date": "2021-01-01",
            "next_open_time": "09:30:00",
            "last_open_date": "2021-01-01",
            "last_open_time": "09:30:00"
        }
    ]
}
```

## Get Positions
```http
GET https://trade-service.wealthsimple.com/account/positions
```

```http
{
    "results": [
        {
            "object": "position",
            "id": "sec-s-aabcabc1abc",
            "currency": "CAD",
            "security_type": "equity",
            "ws_trade_eligible": true,
            "ws_trade_ineligibility_reason": null,
            "is_volatile": false,
            "cds_eligible": true,
            "settleable": true,
            "active_date": "2021-01-01",
            "inactive_date": null,
            "active": true,
            "buyable": true,
            "sellable": true,
            "status": null,
            "stock": {
                "symbol": "AAPL",
                "name": "Apple CDR (CAD Hedged) ",
                "primary_exchange": "AEQUITAS NEO EXCHANGE",
                "primary_mic": "NEOE",
                "ipo_state": null,
                "description": null,
                "us_ptp": false
            },
            "groups": [],
            "allowed_order_subtypes": [
                "market",
                "limit"
            ],
            "option_details": {
                "expiry_date": null,
                "multiplier": null,
                "option_type": null,
                "osi_symbol": null,
                "strike_price": null,
                "underlying_security_id": null,
                "underlying_security": null
            },
            "options_eligible": false,
            "equity_trading_session_type": "REGULAR",
            "start_of_day_quantity": 1,
            "start_of_day_book_value": {
                "amount": 20.0,
                "currency": "CAD"
            },
            "start_of_day_market_book_value": {
                "amount": 20.0,
                "currency": "CAD"
            },
            "external_security_id": "sec-s-aabcabc1abc",
            "created_at": "2021-01-01T01:01:01.000Z",
            "updated_at": "2021-01-01T01:01:01.000Z",
            "sellable_quantity": 1,
            "quantity": 1,
            "book_value": {
                "amount": 20.0,
                "currency": "CAD"
            },
            "market_book_value": {
                "amount": 20.0,
                "currency": "CAD"
            },
            "sparkline": [
                {
                    "date": "2021-01-01",
                    "time": "16:00",
                    "currency": "CAD",
                    "adjusted_price": "20.0",
                    "security_id": "sec-s-aabcabc1abc",
                    "close": "20.0"
                }
            ],
            "quote": {
                "object": "spot_quote",
                "security_id": "sec-s-aabcabc1abc",
                "amount": "20.0",
                "currency": "CAD",
                "ask": "20.0",
                "ask_size": 4800,
                "bid": "20.0",
                "bid_size": 100,
                "high": "20.0",
                "last_size": 300,
                "low": "20.0",
                "open": "20.0",
                "volume": 100,
                "previous_close": "20.0",
                "previous_closed_at": "2021-01-01T01:01:01.000Z",
                "quote_date": "2021-01-01T01:01:01.000Z",
                "quoted_as_of": "2021-01-01T01:01:01.000Z",
                "last": "20.0"
            },
            "account_id": "rrsp-aabcabc1abc"
        }
    ]
}
```

## Get Deposits
```http
GET https://trade-service.wealthsimple.com/deposits
```

```http
{
    "object": "deposit",
    "results": [
        {
            "id": "funds_transfer-aabcabc1abc",
            "bank_account_id": "bank_account-aabcabc1abc",
            "created_at": "2021-01-01T01:01:01.000Z",
            "updated_at": "2021-01-01T01:01:01.000Z",
            "rejected_at": null,
            "cancelled_at": null,
            "accepted_at": "2021-01-01T01:01:01.000Z",
            "status": "accepted",
            "value": {
                "amount": 0.01,
                "currency": "CAD"
            },
            "cancellable": false,
            "object": "deposit",
            "instant_value": {
                "amount": 0,
                "currency": "CAD"
            },
            "account_id": "non-registered-aabcabc1abc"
        }
    ]
}
```

## Get Accounts
```http
GET https://trade-service.wealthsimple.com/account/list
```

```http
{
    "results": [
        {
            "object": "account",
            "id": "tfsa-aabcabc1abc",
            "created_at": "2021-01-01T01:01:01.000Z",
            "updated_at": "2021-01-01T01:01:01.000Z",
            "opened_at": "2021-01-01T01:01:01.000Z",
            "deleted_at": null,
            "archived_at": null,
            "buying_power": {
                "amount": 0.01,
                "currency": "CAD"
            },
            "current_balance": {
                "amount": 0.01,
                "currency": "CAD"
            },
            "withdrawn_earnings": {
                "amount": 0.01,
                "currency": "CAD"
            },
            "net_deposits": {
                "amount": 0.01,
                "currency": "CAD"
            },
            "available_to_withdraw": {
                "amount": 0.01,
                "currency": "CAD"
            },
            "base_currency": "CAD",
            "custodian_account_number": "aabcabc1abc",
            "status": "open",
            "last_synced_at": "2021-01-01T01:01:01.000Z",
            "last_partial_synced_at": "2021-01-01T01:01:01.000Z",
            "read_only": null,
            "external_esignature_id": "document-aabcabc1abc",
            "account_type": "ca_tfsa",
            "linked_account_id": "tfsa-aabcabc1abc",
            "inkind_transfer": "upgrade_completed",
            "position_quantities": {
                "sec-s-aabcabc1abc": 1
            }
        }
    ]
}
```

## Get Bank Accounts
```http
GET https://trade-service.wealthsimple.com/bank-accounts
```

```http
{
    "results": [
        {
            "object": "bank_account",
            "id": "bank_account-aabcabc1abc",
            "type": "chequing",
            "corporate": false,
            "currency": "CAD",
            "account_name": null,
            "nickname": null,
            "institution_name": "WS",
            "institution_number": "000",
            "transit_number": "***69",
            "account_number": "****420",
            "jurisdiction": "CA",
            "created_at": "2021-01-01T01:01:01.000Z",
            "updated_at": "2021-01-01T01:01:01.000Z",
            "verifications": [
                {
                    "id": "verification-aabcabc1abc",
                    "method": "plaid",
                    "status": "accepted",
                    "document_id": "document-aabcabc1abc",
                    "processed_at": "2021-01-01T01:01:01.000Z"
                }
            ],
            "verification_documents": [
                {
                    "id": "verification_document-aabcabc1abc",
                    "acceptable": true,
                    "document_id": "document-aabcabc1abc",
                    "document_type": "plaid",
                    "reviewed_at": "2021-01-01T01:01:01.000Z"
                }
            ]
        }
    ]
}
```

## Get Activities
```http
GET https://trade-service.wealthsimple.com/account/activities
```
|Query Param|Description|
|---|---|
|`account_ids`|The account identifiers to limit activities to|
|`limit`|Activities per page. Defaults to 20|
|`bookmark`|Gets the next page of data for paginated requests|

```http
{
    "results": [
        {
            "object": "order",
            "id": "order-aabcabc1abc",
            "account_hold_value": {
                "amount": 0,
                "currency": "CAD"
            },
            "account_id": "tfsa-aabcabc1abc",
            "account_value": {
                "amount": 0,
                "currency": "CAD"
            },
            "completed_at": "2021-01-01T01:01:01.000Z",
            "created_at": "2021-01-01T01:01:01.000Z",
            "fill_fx_rate": 0,
            "fill_quantity": 0,
            "filled_at": "2021-01-01T01:01:01.000Z",
            "market_value": {
                "amount": 0,
                "currency": "CAD"
            },
            "order_id": "order-aabcabc1abc",
            "order_sub_type": "market",
            "order_type": "buy_quantity",
            "perceived_filled_at": "2021-01-01T01:01:01.000Z",
            "quantity": 0,
            "security_id": "sec-s-aabcabc1abc",
            "security_name": "Stocks",
            "status": "posted",
            "stop_price": null,
            "symbol": "AA",
            "time_in_force": "day",
            "updated_at": "2021-01-01T01:01:01.000Z",
            "limit_price": {
                "amount": 0,
                "currency": "CAD"
            },
            "external_order_id": "order-aabcabc1abc",
            "external_order_batch_id": "order-batch-aabcabc1abc",
            "external_security_id": "sec-s-aabcabc1abc",
            "account_currency": "CAD",
            "market_currency": "CAD",
            "is_trade_desk_order": false,
            "rejection_code": null,
            "rejection_metadata": null,
            "cashback_order": null,
            "submittedTotalTransactionFee": {
                "amount": "0.00",
                "currency": "CAD"
            },
            "filledTotalTransactionFee": {
                "amount": "0.00",
                "currency": "CAD"
            },
            "auto_order_type": null
        },
        {
            "object": "dividend",
            "id": "custodian_account_activity-aabcabc1abc",
            "type": "dividend",
            "account_id": "tfsa-aabcabc1abc",
            "symbol": "AA",
            "country_code": "CA",
            "effective_date": "2021-01-01",
            "process_date": "2021-01-01",
            "quantity": "0.0",
            "market_price": {
                "amount": "0.0",
                "currency": "CAD"
            },
            "market_value": {
                "amount": 0,
                "currency": "CAD"
            },
            "book_value": {
                "amount": "0.0",
                "currency": "CAD"
            },
            "net_cash": {
                "amount": "0",
                "currency": "CAD"
            },
            "fx_rate": "1.0",
            "order_id": null
        },
        {
            "object": "subscription_payment",
            "id": "payment-aabcabc1abc",
            "subscription": {
                "tierName": "silver",
                "status": "active"
            },
            "subscription_id": "subscription-aabcabc1abc",
            "currency": "CAD",
            "end_at": "2021-01-01T01:01:01.000Z",
            "posted_at": "2021-01-01T01:01:01.000Z",
            "start_at": "2021-01-01T01:01:01.000Z",
            "created_at": "2021-01-01T01:01:01.000Z",
            "status": "posted",
            "subtotal": {
                "amount": 0,
                "currency": "CAD"
            },
            "tax_amount": {
                "amount": 0,
                "currency": "CAD"
            },
            "total_amount": {
                "amount": 0,
                "currency": "CAD"
            },
            "payment_discount": null,
            "account_id": "non-registered-aabcabc1abc"
        },
        {
            "id": "funds_transfer-aabcabc1abc",
            "bank_account_id": "bank_account-aabcabc1abc",
            "created_at": "2021-01-01T01:01:01.000Z",
            "updated_at": "2021-01-01T01:01:01.000Z",
            "rejected_at": null,
            "cancelled_at": null,
            "accepted_at": "2021-01-01T01:01:01.000Z",
            "status": "accepted",
            "value": {
                "amount": 0,
                "currency": "CAD"
            },
            "cancellable": false,
            "schedule_id": "funds_transfer_schedule-aabcabc1abc",
            "post_dated": "2021-01-01T01:01:01.000Z",
            "object": "deposit",
            "instant_value": {
                "amount": 0,
                "currency": "CAD"
            },
            "account_id": "non-registered-aabcabc1abc"
        },
        {
            "object": "internal_transfer",
            "id": "internal_transfer-aabcabc1abc",
            "source_account_id": "ca-cash-aabcabc1abc",
            "destination_account_id": "rrsp-aabcabc1abc",
            "post_dated": "2021-01-01",
            "status": "completed",
            "assets": [
                {
                    "security_id": "sec-c-aabcabc1abc",
                    "quantity": "0"
                }
            ],
            "created_at": "2021-01-01T01:01:01.000Z",
            "updated_at": "2021-01-01T01:01:01.000Z",
            "completed_at": "2021-01-01T01:01:01.000Z",
            "cancellable": false
        },
    ],
    "bookmark": "7b..7d",
    "errors": []
}
```

## Get Invest Accounts
```http
GET https://trade-service.wealthsimple.com/account/invest_accounts
```

```http
{
    "results": [
        {
            "object": "account",
            "id": "ca-cash-aabcabc1abc",
            "type": "ca_cash_msb",
            "nickname": null,
            "custodian_account_number": "aabcabc1abc",
            "custodian_account_status": "open",
            "base_currency": "CAD",
            "external_id": null,
            "status": "open",
            "owners": [
                {
                    "client_id": "person-aabcabc1abc",
                    "ownership_type": "primary",
                    "account_nickname": null
                }
            ],
            "net_liquidation": {
                "amount": "0.0",
                "currency": "CAD"
            },
            "gross_position": {
                "amount": "0.0",
                "currency": "CAD"
            },
            "total_deposits": {
                "amount": "0.0",
                "currency": "CAD"
            },
            "total_withdrawals": {
                "amount": "0.0",
                "currency": "CAD"
            },
            "withdrawn_earnings": {
                "amount": "0.0",
                "currency": "CAD"
            },
            "created_at": "2021-01-01T01:01:01.000Z",
            "updated_at": "2021-01-01T01:01:01.000Z"
        }
    ]
}
```

## Get Account Value History
```http
GET https://trade-service.wealthsimple.com/account/history/:duration
```
|Param|Location|Description|
|---|---|---|
|`duration`|path|History Length. One of `1d`, `1w`, `1m`, `3m`, `6m`, `1y`, `all`|
|`account_id`|query|Account to pull history of|

```http
{
    "results": [
        {
            "date": "2021-01-01",
            "value": {
                "amount": 0,
                "currency": "CAD"
            },
            "equity_value": {
                "amount": 0,
                "currency": "CAD"
            },
            "net_deposits": {
                "amount": 0,
                "currency": "CAD"
            },
            "withdrawn_earnings": {
                "amount": 0,
                "currency": "CAD"
            },
            "relative_equity_earnings": {
                "currency": "CAD",
                "amount": 0,
                "percentage": 0
            }
        }
    ],
    "start_earnings": {
        "amount": 0,
        "currency": "CAD"
    }
}
```

## Sync Accounts
```http
POST https://trade-service.wealthsimple.com/account-sync
```

```http
{
    "accounts": [
        {
            "id": "tfsa-aabcabc1abc",
            "last_synced_at": "2021-01-01T01:01:01.000Z",
            "last_partial_synced_at": "2021-01-01T01:01:01.000Z",
            "sync_state": "synced"
        }
    ]
}
```

## Create Session
```http
POST https://my.wealthsimple.com/api/sessions
{
    "session": {
        "access_token": "ey..GA"
    }
}
```
This request is authenticated, but you must also include your OAuth token in the POST body.

```http
"ok"
```

