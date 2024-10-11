function AddFilm({ state, setState, axios, callMovies, toast, ToastUpdate, useRef, useEffect }) {
    const toastNow = useRef(null)

    useEffect(() => {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/api/v1/getAllCategories"
        }
        axios(configuration).then((res) => {
            setState({ listAllCate: res.data })
        })
    }, [])

    useEffect(() => {
        if (state.searchFilm !== "") {
            const debounceResult = setTimeout(() => {
                const configuration = {
                    method: 'get',
                    url: `https://api.themoviedb.org/3/search/movie?query=${state.searchFilm}&include_adult=false&language=vi-VN&page=1`,
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${process.env.REACT_APP_themoviedbApikey}`
                    }
                }
                axios(configuration).then((res) => {
                    setState({ listAutoComplete: res.data.results })
                })
            }, 1000);
            return () => clearTimeout(debounceResult)
        } else {
            setTimeout(() => {
                setState({ listAutoComplete: [] })
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.searchFilm])

    function getFilmDetail(id) {
        toastNow.current = toast.loading("Chờ một chút...")
        const filmConfiguration = {
            method: 'get',
            url: `https://api.themoviedb.org/3/movie/${id}?language=vi-VN`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_themoviedbApikey}`
            }
        }
        axios(filmConfiguration).then((res) => {
            const creditConfiguration = {
                method: 'get',
                url: `https://api.themoviedb.org/3/movie/${id}/credits?language=vi-VN`,
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_themoviedbApikey}`
                }
            }
            axios(creditConfiguration).then((res2) => {
                const dataFetch = {
                    director: res2.data.crew.filter((a) => a.job === "Director")[0].name,
                    stars: res2.data.cast.slice(0, 3),
                    screenWriters: res2.data.crew.filter((a) => a.known_for_department === "Writing" && a.job === "Screenplay")
                }
                setState({ listCrew: dataFetch, movieData: res.data })
                ToastUpdate({ type: 1, message: `Đã chọn ${res.data.title}`, refCur: toastNow.current })
            })
        })
    }

    function updateCate(title) {
        const data = state.listCateMovie
        data.includes(title) ? data.splice(data.indexOf(title), 1) : data.push(title)
        setState({ listCateMovie: data })
    }

    function getSrcYoutube(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        const ID = (match && match[2].length === 11) ? match[2] : null
        return 'https://www.youtube.com/embed/' + ID
    }

    function addMovies(e) {
        e.preventDefault()
        toastNow.current = toast.loading("Chờ một chút...")
        if (state.listCateMovie.length === 0) {
            return ToastUpdate({ type: 2, message: "Danh mục bị trống!", refCur: toastNow.current })
        }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/api/v1/addMovies",
            data: {
                movie: state.movieData,
                crew: state.listCrew,
                trailerSource: getSrcYoutube(state.movieTrailer),
                ageRate: state.movieAge,
                note: state.movieNote,
                category: state.listCateMovie,
                filmSources: state.newEps,
                totalEps: state.totalEps
            }
        }
        axios(configuration).then((res) => {
            ToastUpdate({ type: 1, message: res.data.message, refCur: toastNow.current })
            setState({ wantAddFilm: false, searchFilm: "", listAutoComplete: [], listCrew: null, movieData: null, newEps: [], epsTitle: "", totalEps: 1, servers: [], epsIndex: null, movieTrailer: "", movieNote: "", movieAge: "", listCateMovie: [] })
            callMovies("")
        }).catch((err) => {
            ToastUpdate({ type: 2, message: err.response.data.message, refCur: toastNow.current })
        })
    }
    return (
        <form onSubmit={(e) => addMovies(e)} id="formMovieExists" className="coverAddFilm">
            {state.movieData ? (
                <>
                    <div className="coverAddFilmChild">
                        <div className="filmChild">
                            <img alt={""} src={"https://image.tmdb.org/t/p/original" + state.movieData.poster_path} />
                            <div className="filmChildIn4">
                                <h3>{state.movieData.title}</h3>
                                <p>{state.movieData.original_title}</p>
                                <p className="contentFilmChildIn4">{state.movieData.overview}</p>
                                <div className="sideIn4">
                                    Năm sản xuất: <span style={{ color: "#fff" }}>{state.movieData.release_date.slice(0, 4)}</span> - Rating: <span style={{ color: "#fff" }}>{state.movieData.vote_average.toFixed(1)}</span>/10
                                </div>
                            </div>
                            <button onClick={() => setState({ listCrew: null, movieData: null, newEps: [], movieTrailer: "", movieNote: "", movieAge: "", totalEps: 1, listCateMovie: [] })} type="button" className="deleteFilm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                            </button>
                        </div>
                        <div className="formMovieExists">
                            <input value={state.movieTrailer} onChange={(e) => setState({ movieTrailer: e.target.value })} type="text" placeholder="Url trailer..." className="movieExistsInput" required />
                            <input value={state.totalEps} onChange={(e) => setState({ totalEps: e.target.value })} type="number" placeholder="Tổng số tập..." className="movieExistsInput" required />
                            <select onChange={(e) => setState({ movieAge: e.target.value })} className="movieExistsInput" required>
                                <option hidden value={""}>Nhãn tuổi...</option>
                                <option value={"G"}>G (Tất cả tuổi)</option>
                                <option value={"PG"}>PG (Cân nhắc cho trẻ nhỏ)</option>
                                <option value={"PG-13"}>PG-13 (13+)</option>
                                <option value={"R"}>R (18+)</option>
                                <option value={"NC-17"}>NC-17 (Phim XXX)</option>
                            </select>
                        </div>
                    </div>
                    <div className="underAddFilmChild">
                        <textarea value={state.movieNote} onChange={(e) => setState({ movieNote: e.target.value })} className="noteMovie" placeholder="Ghi chú cho phim..."></textarea>
                        <div className="chooseCateFilm">
                            <div className="chooseCateFilmChild">
                                <p>Chọn danh mục :</p>
                                {state.listAllCate.map((c) => {
                                    return (
                                        <button onClick={() => updateCate(c.title)} key={c.title} type="button">{c.title}
                                            <svg style={{ opacity: state.listCateMovie.includes(c.title) ? 1 : 0 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="addEps">
                        <button className="addEpsMainButton" onClick={() => setState({ modalState: true, modalStateOptions: 4 })} type="button">Thêm tập</button>
                        {state.newEps.map((e, indexE) => {
                            return (
                                <button key={indexE} onClick={() => setState({ modalState: true, modalStateOptions: 5, epsTitle: e.title, servers: e.servers, epsIndex: indexE })} type="button">{e.title}</button>
                            )
                        })}
                    </div>
                </>
            ) : (
                <div className="titleAdd">
                    <input type="text" placeholder="Tên phim..." value={state.searchFilm} onChange={(e) => setState({ searchFilm: e.target.value })} required />
                    {state.listAutoComplete.length === 0 ? null : (
                        <div className="autoCompleteFilm">
                            {state.listAutoComplete.map((i) => {
                                return (
                                    <div onClick={() => getFilmDetail(i.id)} key={i.id} className="filmChild">
                                        <img alt={i.title} src={"https://image.tmdb.org/t/p/original" + i.poster_path} />
                                        <div className="filmChildIn4">
                                            <h3>{i.title}</h3>
                                            <p>{i.original_title}</p>
                                            <p className="contentFilmChildIn4">{i.overview}</p>
                                            <div className="sideIn4">
                                                Năm sản xuất: <span style={{ color: "#fff" }}>{i.release_date.slice(0, 4)}</span> - Rating: <span style={{ color: "#fff" }}>{i.vote_average.toFixed(1)}</span>/10
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </form>
    )
}
export default AddFilm