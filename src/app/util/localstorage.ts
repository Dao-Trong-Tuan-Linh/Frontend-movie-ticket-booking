export const getLocalToken = () => {
    return window.localStorage.getItem('token');
};

export const setLocalToken = (token:string) => {
    return window.localStorage.setItem('token',token);
} 

export const removeLocalToken = () => {
    return window.localStorage.removeItem('token');
}

export const setLocalUser = (user:string) => {
    return window.localStorage.setItem('user',user);
}

export const getLocalUser = () => {
    return window.localStorage.getItem('user') || '' || null;
}

export const removeLocalUser = () => {
    return window.localStorage.removeItem('user');
}