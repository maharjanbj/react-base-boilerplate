

export const GOOGLE_AUTH_CLIENT_ID: string = import.meta.env
    .REACT_APP_GOOGLE_AUTH_CLIENT_ID
    ? import.meta.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID!
    : ''
