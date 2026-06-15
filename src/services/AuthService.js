const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { signToken } = require('../utils/jwt');


async function register({ name, email, password }) {
    if (!name || !email || !password) {
        const error = new Error('name, email y password son obligatorios');
        error.status = 400;
        throw error;
    }

    if (password.length < 6) {
        const error = new Error('La contrasena debe tener al menos 6 caracteres');
        error.status = 400;
        throw error;
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        const error = new Error('El email ya esta registrado');
        error.status = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = this.generateToken(user);

    return { user, token };
}

async function login({ email, password }) {
    if (!email || !password) {
        const error = new Error('email y password son obligatorios');
        error.status = 400;
        throw error;
    }

    const user = await User.scope('withPassword').findOne({ where: { email } });

    if (!user) {
        const error = new Error('Credenciales invalidas');
        error.status = 401;
        throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        const error = new Error('Credenciales invalidas');
        error.status = 401;
        throw error;
    }

    const token = this.generateToken(user);

    return { user: user.toJSON(), token };
}

function generateToken(user) {
    return signToken({
        userId: user.id,
        email: user.email,
    });
}


module.exports = {
    register,
    login,
    generateToken
}
