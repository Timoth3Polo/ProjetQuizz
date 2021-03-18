/**
 * Use to get the JWT token from the authorization header
 * @param authorizationHeader 
 */
export const parseAuthorizationHeader = (authorizationHeader: string): string => {
    const [, token] = authorizationHeader.split(" ");
    return token || ""


}