const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, "Title exists"]
    },

    content: {
        type: String
    }
}, { timestamps: { createdAt: true, updatedAt: false } })

module.exports = mongoose.model.Categories || mongoose.model("Categories", CategorySchema);