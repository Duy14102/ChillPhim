const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username exists"],
    },

    password: {
        type: String
    },

    role: {
        type: Number
    }
}, { timestamps: { createdAt: true, updatedAt: false } })

module.exports = mongoose.model.Accounts || mongoose.model("Accounts", AccountSchema);