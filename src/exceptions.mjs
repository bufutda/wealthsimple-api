export class WealthsimpleAPIError extends Error {}

export class AuthenticationException extends WealthsimpleAPIError {}
export class NotAuthenticatedException extends AuthenticationException {}
export class CircularOTPException extends WealthsimpleAPIError {}
export class RequiredArgumentException extends WealthsimpleAPIError {}
export class NonJSONResponseException extends WealthsimpleAPIError {}
export class NotFoundException extends WealthsimpleAPIError {}
