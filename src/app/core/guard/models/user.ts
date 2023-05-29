export interface IUser {
    access_token: string
    expires_in: number
    refresh_expires_in: number
    refresh_token: string
    token_type: string
    "not-before-policy": number
    session_state: string
    scope: string
    roles: Roles
  }
  
  export interface Roles {
    exp: number
    iat: number
    jti: string
    iss: string
    sub: string
    typ: string
    azp: string
    session_state: string
    acr: string
    scope: string
    sid: string
    name: string
    groups: string[]
    preferred_username: string
    given_name: string
    authorities: string[]
  }
  