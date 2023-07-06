const sendOtp = require("../middleware/sendMail");
const generateOTP = require("../utils/generateOtp")
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const fs = require('fs');
const generatePDF = require('../middleware/generatePdf');


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

module.exports.signIn = async (req, res) => {
    try {
        let user = await User.findOne({email:req.body.email})
        if (user) {
            let isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                if (user.isVerified === true) {
                    return res.status(200).json({
                        id: user._id,
                        user: 'user',
                        token: generateToken(user._id)
                    })
                }else{
                    return res.status(401).json('User Not verified');
                }
            }else{
                return res.status(401).json('Invalid Login')
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error ', error.message);
    }
}

module.exports.getExcel = async(req, res) => {
    const xlsx = require('xlsx');
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }

        const userWithoutProfilePicture = { 
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            hobbies: user.hobbies.join(', '),
            projects: user.projects.join(', '),
            email: user.email
        };
    
        const userDataArray = [userWithoutProfilePicture];

        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(userDataArray);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        const excelBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        res.attachment('data.xlsx')
        res.status(200).send(excelBuffer);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred during profile download.' });
      }  
}

module.exports.getPdf = async(req, res) => {
    try {
        const userId = req.params.id;
    
        // Fetch user data from the database
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }
    
        // Generate the PDF document
        const pdfDoc = await generatePDF(user);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=profile.pdf');

        pdfDoc.pipe(res);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred during profile download.' });
      }
}





