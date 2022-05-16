export const roles = {
    CUSTOMER: 'Customer',
    ADMIN: 'Admin',
    WORKER: 'Worker'
}

export const decodeJwt = (token) => {
    const tokenDecodablePart = token.split('.')[1];
    const decoded = Buffer.from(tokenDecodablePart, 'base64').toString();
    return JSON.parse(decoded);
}