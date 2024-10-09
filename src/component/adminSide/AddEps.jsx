function AddEps({ state, setState }) {
    function addNewEps(e) {
        e.preventDefault()
        const dataFirst = state.movieKeysUpdate ? state.movieKeysUpdate : state.newEps
        const data = {
            title: state.epsTitle,
            url: state.epsUrl,
            time: Date.now()
        }
        if (state.movieKeysUpdate) {
            dataFirst.filmSources.push(data)
            setState({ movieKeysUpdate: dataFirst, epsTitle: "", epsUrl: "", wantUpdatePrevEps: false })
        } else {
            dataFirst.push(data)
            setState({ newEps: dataFirst, epsTitle: "", epsUrl: "", modalState: false, modalStateOptions: null })
        }
    }
    return (
        <form onSubmit={(e) => addNewEps(e)} className="addEpsDiv">
            <div className="addEpsDivChild">
                <label htmlFor="titleEps">Tiêu đề</label>
                <input id="titleEps" type="text" value={state.epsTitle} onChange={(e) => setState({ epsTitle: e.target.value })} required />
            </div>
            <div className="addEpsDivChild">
                <label htmlFor="linkEps">Url</label>
                <input id="linkEps" type="text" value={state.epsUrl} onChange={(e) => setState({ epsUrl: e.target.value })} required />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <button type="submit">Thêm</button>
                {state.movieKeysUpdate ? (
                    <button onClick={() => setState({ epsTitle: "", epsUrl: "", wantUpdatePrevEps: false })} type="button">Hủy</button>
                ) : null}
            </div>
        </form>
    )
}
export default AddEps