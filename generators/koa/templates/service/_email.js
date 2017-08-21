'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');

let ENV = process.env;

let smtpConfig = {
    host: 'mail.everthis.com',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    authMethod: 'login',
    auth: {
        user: ENV['EMAIL_USERNAME'],
        pass: ENV['EMAIL_PASSWORD']
    }
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(smtpConfig);

let defaultOptions = {
    from: '"someone" <someone@everthis.com>'
};

const sender = function (options) {
  return new Promise( (resolve,reject) => {
    try {
        let mailOptions = Object.assign({}, defaultOptions);
        mailOptions.to = options.email; // 'wwwaap@everthis.com, evthis@everthis.com'
        mailOptions.subject = 'platform';
        mailOptions.html = `
            <h3>Hi,</h3>
            <a href="${options.url}">${options.url}</a>
            <p>reply：${options.msg}</p>
        `;
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            resolve(info);
        });
    }
    catch (err) {
      reject(err);
      return;
    }
  });
};

// send mail with defined transport object
module.exports = {
    sendNotify: async(ctx, next)=> {
        let fbd = ctx.request.body;
        await sender(fbd).then(data => ctx.body = data)
    }
}
