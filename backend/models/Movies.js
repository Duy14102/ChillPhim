const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: {
        type: String
    },

    content: {
        type: String
    },

    banner: {
        vertical: {
            type: String
        },
        horizontal: {
            type: String
        }
    },

    trailerSource: {
        type: String
    },

    filmSources: {
        type: Array
    },

    imdbScore: {
        type: Number
    },

    ageRate: {
        type: String
    },

    time: {
        hour: {
            type: String
        },
        minute: {
            type: String
        }
    },

    category: {
        type: Array
    },

    directors: {
        type: Array
    },

    stars: {
        type: Array
    },

    screenWriters: {
        type: Array
    },

    comments: {
        type: Array
    }
}, { timestamps: { createdAt: true, updatedAt: false } })

module.exports = mongoose.model.Movies || mongoose.model("Movies", MovieSchema);