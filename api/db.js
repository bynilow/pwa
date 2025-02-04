const USERS = [];

const getUserByEmail = (email) => {
    return USERS.find(user => user.email === email);
}

const getUsersById = (id) => {
    return USERS.find(user => user.id === id);
}

const createUser = (id, email, passKey) => {
    USERS.push({ id, email, passKey });
}

const updateUserCounter = (id, counter) => {
    const user = USERS.find(user => user.id === id);
    user.passKey.counter = counter;
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    updateUserCounter
}