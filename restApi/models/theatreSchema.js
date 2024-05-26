const mongoose = require("mongoose");

const theatreSchema = mongoose.Schema({
    theatreName: {
        type: String,
        required: [true, "Theatre name is required"],
    },
    theatreImage: {
        type: String,
        required: [true, "Theatre image is required"],
    }
});

module.exports = mongoose.model("theatres", theatreSchema);