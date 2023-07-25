///
/// ***** Ендпойнт бекенду та робота з localStorage *****
///

// const backURL = `https://cups-store.onrender.com`;
// Змінити backURL на `http://localhost:4000` при запуску на локальному сервері;
const backURL = `http://localhost:4000`;

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const setUser = async (user) => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem('user', JSON.stringify(user));
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

const getCategories = () => {
    return JSON.parse(localStorage.getItem('categories'));
};

const setCategories = async (categories) => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem('categories', JSON.stringify(categories));
            renderProductCategoriesOptions();
            renderFilterCategoriesOptions();
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

const clearStorage = async () => {
    localStorage.clear();
};







