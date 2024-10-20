import nodemailer from "nodemailer";

const GMAIL = "nemesisss112@gmail.com";
const G_APP_PASSWORD = "yjrp rxpv rcqy otzg";

// Transporter Service for Gmail
const GmailTransporter = nodemailer.createTransport({
    service: "gmail",
    //   host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: GMAIL,
        pass: G_APP_PASSWORD,
    },
});

export default GmailTransporter;