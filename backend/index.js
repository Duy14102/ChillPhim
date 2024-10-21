const express = require('express');
const http = require("http");
const https = require("https")
const app = express();
const server = http.createServer(app);
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");
// Connect to MongoDB
const mongoose = require('mongoose');
require('dotenv').config({ path: "../.env" })
mongoose.connect(process.env.REACT_APP_mongoAtlas).then(() => console.log('Connected To MongoDB')).catch((err) => { console.error(err); });

const cors = require('cors');
const corsOptions = {
    origin: 'https://chill-phim.netlify.app/',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(express.json());

server.listen(3000);

// Model
const Movies = require("./models/Movies");                                  // Movies
const Accounts = require("./models/Accounts");                              // Accounts
const Categories = require("./models/Categories");                          // Categories

// Refresh server
setInterval(() => {
    https.get(process.env.REACT_APP_BACKENDAPI, () => {
        console.log("Refresh");
    })
}, 600000);

// Create first admin account
Accounts.findOne({ username: "admin" }).then(async (res1) => {
    if (!res1) {
        const hashPassword = await argon2.hash(process.env.REACT_APP_firstAdminPassword);
        const firstAdmin = new Accounts({
            username: "admin",
            password: hashPassword,
            role: 1
        })
        firstAdmin.save()
    }
})

// Api
// Accounts Api
app.post("/api/v1/adminLogin", (req, res) => {
    Accounts.findOne({ username: req.body.username }).then(async (res1) => {
        const verifyPassword = await argon2.verify(res1.password, req.body.password)
        if (verifyPassword) {
            const token = jwt.sign(
                {
                    username: res1.username,
                    role: res1.role
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h" }
            )
            res.status(201).send({
                message: "Đăng nhập thành công!",
                token
            })
        } else {
            res.status(500).send({ message: "Mật khẩu không trùng khớp!" })
        }
    }).catch(() => {
        res.status(500).send({ message: "Tài khoản không tồn tại!" })
    })
})

app.post("/api/v1/changePassword", (req, res) => {
    Accounts.findOne({ username: req.body.username }).then(async (res1) => {
        const verifyPassword = await argon2.verify(res1.password, req.body.oldPassword)
        if (verifyPassword) {
            const hashPassword = await argon2.hash(req.body.newPassword);
            Accounts.updateOne({ username: req.body.username }, {
                password: hashPassword
            }).exec()
            res.status(201).send({ message: "Đổi mật khẩu thành công!" })
        } else {
            res.status(500).send({ message: "Mật khẩu cũ không trùng khớp!" })
        }
    })
})

app.post("/api/v1/addAccount", (req, res) => {
    Accounts.findOne({ username: req.body.username }).then(async (res1) => {
        if (res1) {
            res.status(500).send({ message: "Tài khoản đã tồn tại!" })
        } else {
            const hashPassword = await argon2.hash(req.body.password);
            const addAdmin = new Accounts({
                username: req.body.username,
                password: hashPassword,
                role: 2
            })
            addAdmin.save().then(() => {
                res.status(201).send({ message: "Thêm admin thành công!" })
            })
        }
    })
})

app.post("/api/v1/deleteAccount", (req, res) => {
    Accounts.deleteOne({ username: req.body.username }).then(() => {
        res.status(201).send({ message: "Xóa tài khoản thành công!" })
    }).catch(() => {
        res.status(500).send({ message: "Xóa tài khoản thất bại!" })
    })
})

app.get("/api/v1/getAccounts", async (req, res) => {
    const res1 = await Accounts.find(req.query.search && req.query.search !== "" ? { username: { $in: new RegExp(req.query.search, 'i') } } : {}).sort({ createdAt: -1 })
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const start = (page - 1) * limit
    const end = page * limit

    const results = {}
    results.total = res1.length
    results.pageCount = Math.ceil(res1.length / limit)

    if (end < res1.length) {
        results.next = {
            page: page + 1
        }
    }
    if (start > 0) {
        results.prev = {
            page: page - 1
        }
    }

    results.result = res1.slice(start, end)
    res.status(201).send({ results });
})



// Categories Api
app.get("/api/v1/getCategories", async (req, res) => {
    const res1 = await Categories.find(req.query.search && req.query.search !== "" ? { title: new RegExp(req.query.search, 'i') } : {}).sort({ createdAt: -1 })
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const start = (page - 1) * limit
    const end = page * limit

    const results = {}
    results.total = res1.length
    results.pageCount = Math.ceil(res1.length / limit)

    if (end < res1.length) {
        results.next = {
            page: page + 1
        }
    }
    if (start > 0) {
        results.prev = {
            page: page - 1
        }
    }

    results.result = res1.slice(start, end)
    res.status(201).send({ results });
})

app.get("/api/v1/getAllCategories", async (req, res) => {
    await Categories.find({}).then((res1) => {
        res.status(201).send(res1)
    })
})

app.post("/api/v1/addCategories", (req, res) => {
    Categories.findOne({ title: req.body.title }).then(async (res1) => {
        if (res1) {
            res.status(500).send({ message: "Danh mục đã tồn tại!" })
        } else {
            const addCategories = new Categories({
                title: req.body.title,
                content: req.body.content
            })
            addCategories.save().then(() => {
                res.status(201).send({ message: "Tạo danh mục thành công!" })
            })
        }
    })
})

app.post("/api/v1/deleteCategories", (req, res) => {
    Categories.deleteOne({ title: req.body.title }).then(() => {
        res.status(201).send({ message: "Xóa danh mục thành công!" })
    }).catch(() => {
        res.status(500).send({ message: "Xóa danh mục thất bại!" })
    })
})

// Movies Api
app.post("/api/v1/addMovies", async (req, res) => {
    await Movies.findOne({ subtitle: req.body.movie.original_title ? req.body.movie.original_title : req.body.movie.original_name }).then((res1) => {
        if (res1 && res1.movieSeason && res1.movieSeason !== "" && req.body.season && req.body.season !== "") {
            if (res1.movieSeason === req.body.season) {
                res.status(500).send({ message: "Phim bị trùng lặp!" })
            }
        }
        if (res1 && !res1.movieSeason && !req.body.season) {
            res.status(500).send({ message: "Phim bị trùng lặp!" })
        }
        if (res1 && res1.movieSeason && !req.body.season) {
            res.status(500).send({ message: "Phần phim thiếu!" })
        }
        if (!res1 || (res1 && res1.movieSeason && res1.movieSeason !== "" && req.body.season && req.body.season !== "" && res1.movieSeason !== req.body.season) || (res1 && !res1.movieSeason && req.body.season)) {
            const newMovies = new Movies({
                title: req.body.movie.title ? req.body.movie.title : req.body.movie.name,
                subtitle: req.body.movie.original_title ? req.body.movie.original_title : req.body.movie.original_name,
                content: req.body.movie.overview,
                "banner.vertical": `https://image.tmdb.org/t/p/original${req.body.movie.poster_path}`,
                "banner.horizontal": `https://image.tmdb.org/t/p/original${req.body.movie.backdrop_path}`,
                national: req.body.movie.production_countries,
                imdbScore: req.body.movie.vote_average.toFixed(1),
                time: req.body.movie.runtime ? req.body.movie.runtime : req.body.movie.last_episode_to_air.runtime,
                timeProduce: req.body.movie.release_date ? req.body.movie.release_date : req.body.movie.first_air_date,
                "crew.directors": req.body.crew.directors,
                "crew.stars": req.body.crew.stars,
                "crew.screenWriters": req.body.crew.screenWriters,
                trailerSource: req.body.trailerSource,
                filmSources: req.body.filmSources,
                totalEps: req.body.totalEps,
                ageRate: req.body.ageRate,
                note: req.body.note,
                category: req.body.category,
                mainGenres: req.body.mainGenres === 1 ? "Phim lẻ" : "Phim bộ",
                movieSeason: req.body.season
            })
            newMovies.save().then(() => {
                Categories.updateMany({ title: { $in: req.body.category } }, { $inc: { count: 1 } }).exec()
                res.status(201).send({ message: "Thêm phim thành công!" })
            }).catch((err) => {
                console.log(err)
                res.status(500).send({ message: "Thêm phim thất bại!" })
            })
        }
    })
})

app.get("/api/v1/getMovies", async (req, res) => {
    const res1 = await Movies.find(req.query.search && req.query.search !== "" ? { title: new RegExp(req.query.search, 'i') } : {}).sort({ createdAt: -1 })
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const start = (page - 1) * limit
    const end = page * limit

    const results = {}
    results.total = res1.length
    results.pageCount = Math.ceil(res1.length / limit)

    if (end < res1.length) {
        results.next = {
            page: page + 1
        }
    }
    if (start > 0) {
        results.prev = {
            page: page - 1
        }
    }

    results.result = res1.slice(start, end)
    res.status(201).send({ results });
})

app.get("/api/v1/getMoviesHomepage", async (req, res) => {
    const heroBanner = await Movies.find({}).sort({ createdAt: -1 }).limit(6)
    const newFilm = await Movies.find({}).sort({ createdAt: -1 }).limit(10)
    const mostViewFilm = await Movies.find({}).sort({ view: -1 }).limit(10)
    const animeFilm = await Movies.find({ category: "Anime" }).sort({ createdAt: -1 }).limit(10)
    res.status(201).send({ heroBanner, newFilm, mostViewFilm, animeFilm })
})

app.get("/api/v1/getMoviesIn4", async (req, res) => {
    const movies = await Movies.findOne({ subtitle: req.query.subtitle })
    const similarMovies = await Movies.find({ category: { $in: movies.category }, subtitle: { $ne: req.query.subtitle }, mainGenres: movies.mainGenres }).limit(10)
    res.status(201).send({ movies, similarMovies })
})

app.post("/api/v1/deleteMovies", (req, res) => {
    Movies.deleteOne({ _id: req.body.id }).then(() => {
        res.status(201).send({ message: "Xóa phim thành công!" })
    }).catch(() => {
        res.status(500).send({ message: "Xóa phim thất bại!" })
    })
})

app.post("/api/v1/updateMovies", async (req, res) => {
    await Movies.findOne({ _id: req.body.update._id }).then((res1) => {
        if (res1 && req.body.update.movieSeason !== "" && res1.movieSeason !== "" && req.body.update.movieSeason === res1.movieSeason) {
            res.status(500).send({ message: "Cập nhật phim thất bại!" })
        } else {
            const findOldCate = res1.category.filter(element => !req.body.update.category.includes(element));
            const findNewCate = req.body.update.category.filter(element => !res1.category.includes(element));
            Movies.updateOne({ _id: req.body.update._id }, {
                trailerSource: req.body.update.trailerSource,
                filmSources: req.body.update.filmSources,
                totalEps: req.body.update.totalEps,
                ageRate: req.body.update.ageRate,
                note: req.body.update.note,
                category: req.body.update.category,
                movieSeason: req.body.update.movieSeason,
                mainGenres: req.body.update.mainGenres
            }).then(() => {
                if (findOldCate.length > 0) {
                    Categories.updateMany({ title: { $in: findOldCate } }, { $inc: { count: -1 } }).exec()
                } else if (findNewCate.length > 0) {
                    Categories.updateMany({ title: { $in: findNewCate } }, { $inc: { count: 1 } }).exec()
                }
                res.status(201).send({ message: "Cập nhật phim thành công!" })
            }).catch(() => {
                res.status(500).send({ message: "Cập nhật phim thất bại!" })
            })
        }
    })
})

app.post("/api/v1/countMoviesView", (req, res) => {
    Movies.updateOne({ subtitle: req.body.subtitle }, {
        $inc: { view: 1 }
    }).then(() => {
        res.status(201).send({ message: "View + 1" })
    })
})

app.get("/api/v1/getMoviesList", async (req, res) => {
    var findChild = null
    switch (req.query.order) {
        case "Genres":
            findChild = { category: req.query.type }
            break;
        case "National":
            findChild = { "national.iso_3166_1": req.query.type === "All" ? { $nin: ["US", "GB", "TH", "VN", "FR", "IN", "KR", "CN"] } : { $in: req.query.type.match(/(\b[^\s]+\b)/g) } }
            break;
        case "Type":
            findChild = { mainGenres: req.query.type === "Series" ? "Phim bộ" : "Phim lẻ" }
            break;
        case "Directors":
            findChild = { "crew.directors": req.query.type }
            break;
        case "Stars":
            findChild = { "crew.stars.name": req.query.type }
            break;
        case "Search":
            const searchRegexp = new RegExp(req.query.type, 'i')
            findChild = { $or: [{ title: searchRegexp }, { subtitle: searchRegexp }] }
            break;
        default:
            findChild = {}
            break;
    }
    const res1 = await Movies.find(findChild).sort(req.query.sortMovie === "MV" ? { view: -1 } : req.query.sortMovie === "OF" ? { createdAt: 1 } : req.query.sortMovie === "AZ" ? { title: 1 } : { createdAt: -1 })
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const start = (page - 1) * limit
    const end = page * limit

    const results = {}
    results.total = res1.length
    results.pageCount = Math.ceil(res1.length / limit)

    if (end < res1.length) {
        results.next = {
            page: page + 1
        }
    }
    if (start > 0) {
        results.prev = {
            page: page - 1
        }
    }

    results.result = res1.slice(start, end)
    res.status(201).send({ results });
})

app.get("/api/v1/getMoviesSeen", async (req, res) => {
    const dataFind = []
    req.query.movies.reduce((acc, curr) => { dataFind.push(curr.title) }, 0)
    await Movies.find({ subtitle: { $in: dataFind } }).then((res1) => {
        res.status(201).send(res1)
    })
})

app.get("/api/v1/headerAutoComplete", async (req, res) => {
    const regExpSearch = new RegExp(req.query.search, 'i')
    await Movies.find({ $or: [{ title: regExpSearch }, { subtitle: regExpSearch }] }).limit(5).then((res1) => {
        res.status(201).send(res1)
    })
})

app.post("/api/v1/newComments", (req, res) => {
    Movies.updateOne({ _id: req.body.id }, {
        $push: {
            comments: req.body.data
        }
    }).then(() => {
        res.status(201).send({ message: "Gửi bình luận thành công!" })
    }).catch(() => {
        res.status(500).send({ message: "Gửi bình luận thất bại!" })
    })
})

app.get("/api/v1/getChart", async (req, res) => {
    try {
        const resMovies = await Movies.find({})
        const resCategories = await Categories.find({})
        const cateLabel = []
        const cateData = []
        const monthFilmLabel = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        const monthFilmData = new Array(12).fill(0);
        resMovies.forEach((date) => monthFilmData[new Date(date.createdAt).getMonth()] += 1);
        resCategories.forEach((data) => { data.count > 0 ? cateLabel.push(data.title) : null, data.count > 0 ? cateData.push(data.count) : null })
        res.status(201).send({ movieLabel: monthFilmLabel, movieData: monthFilmData, cateLabel: cateLabel, cateData: cateData })
    } catch (err) {
        res.status(400).send(err)
    }
})