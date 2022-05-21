export const roles = {
    CUSTOMER: 'Customer',
    HOTEL_ADMIN: 'HotelAdmin',
    SYSTEM_ADMIN: 'SystemAdmin'
}

export const decodeJwt = (token) => {
    const tokenDecodablePart = token.split('.')[1];
    const decoded = Buffer.from(tokenDecodablePart, 'base64').toString();
    return JSON.parse(decoded);
}