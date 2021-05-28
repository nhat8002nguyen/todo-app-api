const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    created_at: {
        type: String,
        default: new Date().toISOString(),
    },
});

module.exports = mongoose.model("User", UserSchema);
