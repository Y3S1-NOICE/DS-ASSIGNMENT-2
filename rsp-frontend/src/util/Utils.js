import jwtDecode from 'jwt-decode';

export const roles = {
    ADMIN: 'Admin',
    WORKER: 'Worker',
    CUSTOMER: 'Customer'
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