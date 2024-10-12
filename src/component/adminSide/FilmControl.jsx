import Pagination from "../paginate/Pagination";

function FilmControl({ currentPage1, state, setState, callMovies, useEffect }) {
    useEffect(() => {
        callMovies(state.searchMain ? state.searchMain : null)
    }, [])

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}p`;
    }

    function nFormatter(num, digits) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
        const item = lookup.findLast(item => num >= item.value);
        return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
    }

    return (
        <div style={state.wantAddFilm ? { pointerEvents: "none" } : null} className="bottomBody">
            {state.listMovies.length > 0 ? (
                <>
                    {state.listMovies.map((i, indexI) => {
                        return (
                            <div key={i._id} className="bottomBodyChild">
                                <img loading="lazy" alt={i.title} src={window.innerWidth <= 991 ? i.banner.horizontal : i.banner.vertical} />
                                <div className="bottomBodyChildIn4">
                                    <h3 className="movieTitle">{i.title}</h3>
                                    <span className="movieSubtitle">{i.subtitle}</span>
                                    <p className="movieYearsRating">Năm sản xuất: <span style={{ color: "#fff" }}>{i.timeProduce.slice(0, 4)}</span> - Rating: <span style={{ color: "#fff" }}>{i.imdbScore}</span>/10</p>
                                    <div className="movieCategory">
                                        {i.category.slice(0, state.viewMoreCate && state.indexMovie === indexI ? i.category.length : 3).map((c) => {
                                            return (
                                                <div key={c} className="movieCategoryChild">{c}</div>
                                            )
                                        })}
                                        {i.category.length > 3 ? (
                                            <div onClick={() => setState({ viewMoreCate: state.viewMoreCate ? false : true, indexMovie: state.indexI ? null : indexI })} className="plusCategory">{state.viewMoreCate && state.indexMovie === indexI ? "Thu gọn" : `+${i.category.length - 3}`}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="bottomBodyChildSide">
                                    <div style={{ width: "100%", alignItems: "center", justifyContent: "space-between", display: "flex" }}>
                                        <div style={{ width: "49%" }} className="sideChild">
                                            <svg style={{ fill: "#0AB3E3" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                                            <p>{nFormatter(i.view, 1)}</p>
                                        </div>
                                        <div style={{ width: "49%" }} className="sideChild">
                                            <svg style={{ fill: "rgba(211,211,211,0.8)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
                                            <p>{nFormatter(i.comments.length, 1)}</p>
                                        </div>
                                    </div>
                                    <div className="sideChild">
                                        <svg style={{ fill: "#5DC3B3" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>
                                        <p>{toHoursAndMinutes(i.time)}</p>
                                    </div>
                                    <div className="sideChild">
                                        <svg style={{ fill: "orange" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z" /></svg>
                                        <p>{new Date(i.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="sideChild">
                                        <button onClick={() => setState({ modalState: true, modalStateOptions: 7, movieKeysUpdate: i })} title="Cập nhật" type="button" className="updateButton">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" /></svg>
                                        </button>
                                        <button onClick={() => setState({ modalState: true, modalStateOptions: 6, deleteMovieTitle: i.title })} title="Xóa" type="button" className="deleteButton">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <Pagination searchEnale={state.searchMain} state={state} currentPage={currentPage1} pageCount={state.pageCount1} callBack={callMovies} />
                </>
            ) : (
                <p style={{ color: "#fff", fontSize: 22 }} align="center">Hiện chưa có phim nào!</p>
            )}
        </div>
    )
}
export default FilmControl