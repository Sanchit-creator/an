const nodemailer = require("nodemailer");

const sendOtp = async(email, otp) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'dedric.howe84@ethereal.email',
          pass: 'MwYfR8zFXzVfGrmMsr'
        }
    });
    const mailOptions = {
        from: 'uppalsanchit9@gmail.com',
        to: email,
        subject: 'OTP for Registration',
        text: `Your OTP: ${otp}`,
    };
    
    await console.log(mailOptions.text);
}

module.exports = sendOtp;