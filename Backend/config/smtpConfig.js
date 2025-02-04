const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config()

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

module.exports = createTransporter;
