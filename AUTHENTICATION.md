# Authentication

- [Obtain an OAuth Token](#obtain-an-oauth-token)
- [2FA Required](#2fa-required)
- [Refreshing an OAuth Token](#refresh-an-oauth-token)
- [Authenticating Requests](#authenticating-requests)
- [Switch Profile](#switch-profile)
- [Verify an OAuth Token](#verify-an-oauth-token)

## Obtain an OAuth token
```http
POST https://api.production.wealthsimple.com/v1/oauth/v2/token
{
  "grant_type": "password",
  "username": ":username",
  "password": ":password",
  "skip_provision": true,
  "scope": ":scope",
  "client_id": ":client_id"
}
```
|Param|Description|Options|
|---|---|---|
|`:username`|The username of the user logging in||
|`:password`|The password of the user logging in||
|`:client_id`|The client ID of the application. Since you probably don't have one of these you can use the WS Trade Web Client|`4da53ac2b03225bed1550eba8e4611e086c7b905a3855e6ed12ea08c246758fa`|
|`:scope`|A space-separated list of the scopes the token has. Note that WS Cash is under the `invest` scope|<ul><li>invest.read</li><li>invest.write</li><li>trade.read</li><li>trade.write</li><li>tax.read</li><li>tax.write</li><li>mfda.read</li><li>mercer.read</li></ul>|

#### Response
```http
{
    "access_token": ":access_token",
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": ":refresh_token",
    "scope": ":scope",
    "created_at": 1111111111
}
```

#### 2FA Required
If the token generation requires a 2FA token, the response will be
```http
X-Wealthsimple-OTP-Required: true
X-Wealthsimple-OTP: required; method=:method
X-Wealthsimple-OTP-Authenticated-Claim: :claim

{
    "error": "invalid_grant",
    "error_description": "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client. If this is a \"password\" grant request, either the username or password is incorrect or 2FA is enabled (check headers)."
}
```
|Param|Description|Options|
|---|---|---|
|`:method`|The method the OTP will be delivered|`email`, `app`|
|`:claim`|A JWT to be included in the subsequent request||

```http
POST https://api.production.wealthsimple.com/v1/oauth/v2/token
x-wealthsimple-otp: :code;remember=:remember
x-wealthsimple-otp-authenticated-claim: :claim
{
  "grant_type": "password",
  "username": ":username",
  "password": ":password",
  "skip_provision": true,
  "scope": ":scope",
  "client_id": ":client_id"
}
```
|Param|Description|Options|
|---|---|---|
|`:code`|The OTP Code||
|`:remember`|If you would like the device to be remembered. Functionality likely requires OTP claims to appended to subsequent requests. This has not been tested.|`true`, `false`|
|`:claim`|The claim from the error response||

The response will then be the same as if 2FA was not required.

## Refresh an OAuth token
```http
POST https://api.production.wealthsimple.com/v1/oauth/v2/token
{
    "grant_type": "refresh_token",
    "refresh_token": ":refresh_token",
    "client_id": ":client_id"
 }
 ```
|Param|Description|Options|
|---|---|---|
|`:refresh_token`|The refresh token. See above.||
|`:client_id`|The same client ID that was used to fetch the original token.||

The response will be of the same form as the above requests.

# Authenticating Requests
A request can be authenticated by including an `Authorization:` header with the OAuth token.
For many WealthSimple API calls, you will also need to supply the following headers:
|Header|Description|Options|
|---|---|---|
|`x-ws-profile`|The WS app you're using|`invest`, `trade`, `tax`|
|`x-ws-api-version`|The API version being used.|`12`|


## Switch Profile
```http
POST https://api.production.wealthsimple.com/v1/oauth/switch
{
    "profile": "trade",
    "scope": ":scope",
    "client_id": ":client_id"
}
```
This request is authenticated. It will generate a new token based on the token you authenticated with.


## Verify an OAuth token
This request requires an `Authorization` header, but not other headers.
```http
GET https://api.production.wealthsimple.com/v1/oauth/v2/token/info
 ```
 
 ```http
 {
    "resource_owner_id": "identity-####",
    "scope": [
        "invest.read",
        "trade.read"
    ],
    "expires_in": 3573,
    "application": {
        "uid": ":client_id"
    },
    "created_at": 111111111,
    "user_canonical_id": "identity-user",
    "identity_canonical_id": "identity-####",
    "client_canonical_id": null,
    "client_canonical_ids": {
        "invest": {
            "default": "person-####"
        },
        "trade": {
            "default": "person-####"
        }
    },
    "application_uid": ":client_id",
    "application_family_id": null,
    "profiles": {
        "invest": {
            "default": "user-####"
        },
        "trade": {
            "default": "user-####"
        }
    },
    "suspended_profiles": {},
    "families": [
        null,
        "application_family-####"
    ],
    "email": ":username",
    "password_last_updated_at": "2023-01-01T01:01:01.000Z"
}
```
