const User = require('../models/users')

const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");

// Checks if user is authenticated or not.
exports.isAuthenticatedUser = catchAsyncError(async (req,res,next) => {


    const { token} = req.cookies;

    if(!token){
        return next(new ErrorHandler('Login to acces',401))
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()

})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return(req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role ${req.user.role} is not allowed to access this`,403)
            )
        }
        next()
    }
}