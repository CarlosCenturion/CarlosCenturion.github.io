const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true,'Please enter product name'],
        trim: true,
        maxLength: [100,'Product name cannot exceed 100 characters']   
    },

    price:{
        type: Number,
        required: [true,'Please enter product price'],
        maxLength: [5,'Product name cannot exceed 100 characters'],   
        default: 0.0
    },

    description:{
        type: String,
        required: [true,'Please enter product description'],         
    },

    ratings:{
        type: Number,
        default: 0  
    },

    images: [
        {
            public_id:{
                type:String,
                required: true
            },

            url:{
                type:String,
                required:true
            }
        }
    ],

    category: {
        type: String,
        required:[true,'Please select a category for this product'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptop',
                'Accesories',
                'Headphones',
                'Food',
                'Books',
                'Clothes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home',
                'Other'
            ],
            message: 'Please select correct category forproduct'
        }
    },

    seller: {
        type:String,
        required: [true,'please enter product seller']
    },

    stock:{
        type:Number,
        required: [true,'Please enter product stock'],
        maxlength: [5,'Stock cannot exceed 5 characters'],
        default: 0
    },

    numOfReviews: {
        type:Number,
        default:0
    },

    reviews: [
        {
            name: {
                type:String,
                required: true
            },
            rating: {
                type:Number,
                required: true
            },
            comment: {
                type:String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

    
})

module.exports = mongoose.model('product', productSchema)