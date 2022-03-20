const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, require: true },
        img: { type: String, require: true },
        categories: { type: Array },
        connect: { type: String },
        color: { type: String },
        price: { type: Number, require: true },
        inStock: { type: Boolean, default: true },
    },
    { timestamps: true }

)

module.exports = mongoose.model('Product', ProductSchema)