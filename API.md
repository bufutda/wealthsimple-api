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
