import jwtDecode from 'jwt-decode';

export const roles = {
    CUSTOMER: 'Customer',
    HOTEL_ADMIN: 'HotelAdmin',
    SYSTEM_ADMIN: 'SystemAdmin'
}

export const getAuth = () => {
    const token = localStorage.getItem('authentication');
    if (!token) return null;
    return jwtDecode(token);
}

export const logout = () => {
    localStorage.removeItem('authentication');
    window.location.href = '/login';
}