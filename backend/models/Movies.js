const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: {
        type: String
    },

    subtitle: {
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

    mainGenres: {
        type: String
    },

    movieSeason: {
        type: String
    },

    totalEps: {
        type: Number
    },

    national: {
        type: Object
    },

    ageRate: {
        type: String
    },

    note: {
        type: String
    },

    category: {
        type: Array
    },

    imdbScore: {
        type: Number
    },

    time: {
        type: Number
    },

    timeProduce: {
        type: String
    },

    crew: {
        directors: {
            type: Array
        },
        stars: {
            type: Array
        },
        screenWriters: {
            type: Array
        },
    },

    view: {
        type: Number,
        default: 0
    },

    comments: {
        type: Array
    }
}, { timestamps: { createdAt: true, updatedAt: false } })

module.exports = mongoose.model.Movies || mongoose.model("Movies", MovieSchema);