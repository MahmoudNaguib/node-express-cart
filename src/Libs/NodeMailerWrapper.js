require('dotenv').config();
const nodeMailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const handlebarOptions = {
    viewEngine: {
        layoutsDir: path.resolve('./src/views/emails/layouts/'),
        defaultLayout: 'main.hbs',
    },
    viewPath: path.resolve('./src/views/emails/'),
    extName:'.hbs'
};
const transportOptions = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
};
const transporter = nodeMailer.createTransport(transportOptions);
transporter.use('compile', hbs(handlebarOptions));

class NodeMailerWrapper {
    constructor(to, subject, template, data) {
        this.to = to;
        this.subject = process.env.APP_NAME+" - "+subject;
        this.template = template
        ///// append appName
        data.appName=process.env.APP_NAME;
        data.baseUrl=process.env.APP_URL;
        data.year=new Date().getFullYear();
        /////////
        this.context = data;
    }
    send() {
        return new Promise((resolve,reject)=>{
            let mailOptions = {
                from: process.env.MAIL_FROM_NAME + '<' + process.env.MAIL_FROM_ADDRESS + '>',
                to: this.to,
                subject: this.subject,
                template: this.template,
                context: this.context
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    resolve(false);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                resolve(true);
            });
        });
    }
}

module.exports = NodeMailerWrapper;