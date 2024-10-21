const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, "Title exists"]
    },

    content: {
        type: String
    },

    count: {
        type: Number,
        default: 0
    }
}, { timestamps: { createdAt: true, updatedAt: false } })

module.exports = mongoose.model.Categories || mongoose.model("Categories", CategorySchema);