import nodemailer from "nodemailer";
import { config } from "./config.js";

//primero crear el transporte para conectarnos a gmail

const gmailTransporter = nodemailer.createTransport({
    service:"gmail", //servicio a utilizar
    port:587, //puerto que utiliza gmail
    auth:{
        user:config.gmail.account,
        pass:config.gmail.password
    }, //cuenta a utilizar para enviar los mails
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

export {gmailTransporter};