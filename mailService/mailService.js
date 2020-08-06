const nodeMailer = require('nodemailer');

let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: 'photobooth931@gmail.com', // generated ethereal user
        pass: 'photobooth@1234' // generated ethereal password
    }
});
 
const mailOtp = async (reciever,Otp) => {
    console.log('reciever',reciever)

    let info = await transporter.sendMail({
        from: 'mail@chitChat.com', // sender address
        to: reciever, // list of receivers
        subject: "One Time Pasword", // Subject line
        text: "Hello new User", // plain text body
        html: `<div style='text-align: center;'><p style='font-size : 20px;'>Your one time password is</p><h1>${Otp}</h1></div>` // html body
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports =  mailOtp;