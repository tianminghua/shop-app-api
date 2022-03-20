const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        username: { type: String, required: true, unique: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        isAdmin: { type: Boolean, default: false },
        cartId: { type: String },
    }, { timestamps: true }

)

module.exports = mongoose.model('User', UserSchema)