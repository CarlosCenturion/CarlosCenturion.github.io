const User = require('../models/users')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError');
const { json } = require('body-parser');
const sendToken = require('../utils/jwToken');
const { response } = require('../app');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');
const { send } = require('process');

// Registrar un usuario => /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
        public_id: 'avatars/fae185107167297.Y3JvcCw4MzM0LDY1MTgsMCw5MDc',
        url: 'https://mir-s3-cdn-cf.behance.net/projects/404/fae185107167297.Y3JvcCw4MzM0LDY1MTgsMCw5MDc.jpg'
        }
    })

  
    sendToken(user,200,res)
})


// Login User => /api/v1/Login
exports.loginUser = catchAsyncError( async(req,res,next) => {
    const {email,password} = req.body;

    // Check if Emails and Password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Ingresa tu email y clave',400))
    }

    // Finding user in Database

    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }

    // Check if Password is correct or not
    const isPasswordMatched = await user.comparePassword(password) 

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }

    sendToken(user,200,res)
})

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})


//Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncError( async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler('User not found',404));
    }

    // Get reset jwToken
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    //Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email send to : ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500))

    }
})

//Reset Password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError( async (req, res, next) =>{
    //Hash URL Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user){
        return next(new ErrorHandler('Invalid Token or has been Expired',400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password not match',400))
    }

    // Setup new Password 
    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user,200,res)



})


// Get Currently Logged User Details => /api/v1/me
exports.getUserProfile = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

// Update / Change Password => /api/v1/password/update
exports.updatePassword = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    // Check previous password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler('La contraseña es incorrecta' , 400))
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user,200,res)
})


// Update User Profile => /api/v1/me/update
exports.updateProfile = catchAsyncError( async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    /// Update  Avatar: TODO

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true
    })
})

// Logout User => /api/v1/logout

exports.logout = catchAsyncError( async (req, res, next) => {
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        sucess:true ,
        message: 'Logged out'
    })
})

// Admin routes

// Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncError( async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// get user detais => /api/v1/admin/:id
exports.getUserDetails = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler('Usuario no encontrado'));
    }

    res.status(200).json({
        success: true,
        user
    })                                                                                                                                                                                                
})

// Update User Profile (ADMIN) => /api/v1/admin/user/:id
exports.updateUser = catchAsyncError( async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
   

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true
    })
})


// delete user  => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler('Usuario no encontrado'));
    }

    // Remove Avatar from cloudinary - TODO
    
    await user.remove();

    res.status(200).json({
        success: true,
        user
    })                                                                                                                                                                                                
})