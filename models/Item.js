const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    detail: {
        type: String,
    },
    status: {
        type: String,
        require: true,
        default: "ACTIVE",
    },
    created_at: {
        type: String,
        default: new Date().toISOString(),
    },
});

module.exports = mongoose.model("Item", ItemSchema);
