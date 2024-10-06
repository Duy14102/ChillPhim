const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username exists"],
    },

    password: {
        type: String
    }
}, { timestamps: { createdAt: true, updatedAt: false } })

module.exports = mongoose.model.Accounts || mongoose.model("Accounts", AccountSchema);