function UpdateFilm({ state, setState, axios, callMovies, AddEps, UpdateEps, toast, ToastUpdate, useRef, useEffect }) {
    const selectsAge = [{ value: "G", content: "G (Tất cả tuổi)" }, { value: "PG", content: "PG (Cân nhắc cho trẻ nhỏ)" }, { value: "PG-13", content: "PG-13 (13+)" }, { value: "R", content: "R (18+)" }, { value: "NC-17", content: "NC-17 (Phim XXX)" }]
    const toastNow = useRef(null)

    useEffect(() => {
        const configuration = {
            method: "get",
            url: `${process.env.REACT_APP_backendAPI}/api/v1/getAllCategories`
        }
        axios(configuration).then((res) => {
            setState({ listAllCate: res.data })
        })
    }, [])

    function checkCateExists(item) {
        const data = state.movieKeysUpdate
        if (data.category.includes(item)) {
            data.category.splice(data.category.indexOf(item), 1)
        }
        else {
            data.category.push(item)
        }
        setState({ movieKeysUpdate: data })
    }

    function updateMovies(e) {
        e.preventDefault()
        toastNow.current = toast.loading("Chờ một chút...")
        if (state.movieKeysUpdate.category.length === 0) {
            return ToastUpdate({ type: 2, message: "Danh mục bị trống!", refCur: toastNow.current })
        }
        const configuration = {
            method: "post",
            url: `${process.env.REACT_APP_backendAPI}/api/v1/updateMovies`,
            data: {
                update: state.movieKeysUpdate
            }
        }
        axios(configuration).then((res) => {
            ToastUpdate({ type: 1, message: res.data.message, refCur: toastNow.current })
            setState({ epsTitle: "", servers: [], epsIndex: null, wantUpdatePrevEps: false, wantUpdateOldEps: false, movieSeason: "" })
            callMovies()
        }).catch((err) => {
            ToastUpdate({ type: 2, message: err.response.data.message, refCur: toastNow.current })
        })
    }

    function updateField(item, e) {
        const data = state.movieKeysUpdate
        data[item] = e.target.value
        setState({ movieKeysUpdate: data })
    }

    return (
        <form id="updateMoviesForm" onSubmit={(e) => updateMovies(e)} className="updateMovies">
            <input type="text" defaultValue={state.movieKeysUpdate?.trailerSource} onChange={(e) => updateField("trailerSource", e)} className="fieldUpdate" required placeholder="Trailer url..." />
            <select onChange={(e) => updateField("ageRate", e)} defaultValue={state.movieKeysUpdate?.ageRate} required className="fieldUpdate">
                {selectsAge.map((s, indexS) => {
                    return (
                        <option key={indexS} value={s.value}>{s.content}</option>
                    )
                })}
            </select>
            <input type="number" defaultValue={state.movieKeysUpdate?.totalEps} onChange={(e) => updateField("totalEps", e)} className="fieldUpdate" placeholder="Tổng số tập..." />
            <textarea style={{ height: 150 }} defaultValue={state.movieKeysUpdate?.note} onChange={(e) => updateField("note", e)} className="fieldUpdate" placeholder="Ghi chú...(Có thể để trống)"></textarea>
            <div className="fieldCategory">
                <p style={{ color: "rgba(211,211,211,0.8)", fontSize: 16 }}>Chọn danh mục: </p>
                {state.listAllCate.map((c) => {
                    return (
                        <button key={c.title} onClick={() => checkCateExists(c.title)} className="cateFieldButton" type="button">{c.title}
                            <svg style={{ opacity: state.movieKeysUpdate?.category.includes(c.title) ? 1 : 0 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                        </button>
                    )
                })}
            </div>
            <hr className="hrClassGray" />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <input style={{ width: "49%" }} type="text" className="fieldUpdate" defaultValue={state.movieKeysUpdate?.movieSeason} onChange={(e) => updateField("movieSeason", e)} placeholder="Phần phim...(Có thể để trống)" />
                <select style={{ width: "49%" }} defaultValue={state.movieKeysUpdate?.mainGenres} onChange={(e) => updateField("mainGenres", e)} className="fieldUpdate" required>
                    <option hidden value={""}>Chọn thể loại...</option>
                    <option value={"Phim lẻ"}>Phim lẻ</option>
                    <option value={"Phim bộ"}>Phim bộ</option>
                </select>
            </div>
            <div className="fieldCategory">
                <button style={{ background: "#202124", color: "#94b1f2", border: "1px solid #94b1f2" }} className="epsFieldButton" onClick={() => setState({ wantUpdatePrevEps: true })} type="button">Thêm tập</button>
                {state.movieKeysUpdate?.filmSources.map((f, indexF) => {
                    return (
                        <button key={indexF} onClick={() => setState({ wantUpdateOldEps: true, epsTitle: f.title, servers: f.servers, epsIndex: indexF })} className="epsFieldButton" type="button">{f.title}</button>
                    )
                })}
            </div>
            {state.wantUpdatePrevEps ? (
                <AddEps state={state} setState={setState} />
            ) : null}
            {state.wantUpdateOldEps ? (
                <UpdateEps state={state} setState={setState} />
            ) : null}
            <button type="submit" className="updateFilmSubmitButton" form="updateMoviesForm">Cập nhật</button>
        </form>
    )
}
export default UpdateFilm