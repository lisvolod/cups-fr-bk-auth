const backURL = 'http://localhost:4000'

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const removeUser = async () => {
    localStorage.removeItem('user')
}

const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}; 




