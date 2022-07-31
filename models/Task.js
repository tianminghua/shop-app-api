const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema(
    {
        nickname: { type: String },
        tasks: [
            {
                text: { type: String },
                day: { type: String },
                reminder: { type: Boolean, default: false },
            }
        ]
    }, { timestamps: true }

)

module.exports = mongoose.model('Task', TaskSchema)