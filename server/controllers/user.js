const sendOtp = require("../middleware/sendMail");
const generateOTP = require("../utils/generateOtp")
const User = require('../models/user');

module.exports.signup = async(req, res) => {
    try {
        const otp = generateOTP();
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            hobbies: req.body.hobbies,
            projects: req.body.projects,
            email: req.body.email,
            password: req.body.password,
            otp,
        })
        

        if (req.file) {
            user.profilePicture =  req.file.path;
        }


        await user.save();
        const response = await sendOtp(req.body.email, otp);
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(
            error
        )
        console.log(error);
    }
}


module.exports.verify = async(req, res) => {
    try {
        const { email, otp } = req.body;
    
        const user = await User.findOne({ email, otp });
    
        if (!user) {
          return res.status(400).json({ error: 'Invalid OTP.' });
        }
    
        user.isVerified = true;
        await user.save();
    
        res.status(200).json({ message: 'Account verified successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred during account verification.' });
      }
}