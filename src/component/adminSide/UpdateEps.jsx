function UpdateEps({ state, setState }) {
    function updateEpsFunc(e) {
        e.preventDefault()
        const data = state.movieKeysUpdate ? state.movieKeysUpdate : state.newEps
        if (state.movieKeysUpdate) {
            data.filmSources.map((i, index) => {
                if (index === state.epsIndex) {
                    i.title = state.epsTitle
                    i.url = state.epsUrl
                    i.time = Date.now()
                }
            });
            setState({ movieKeysUpdate: data, epsTitle: "", epsUrl: "", epsIndex: null, wantUpdateOldEps: false })
        } else {
            data.map((i, index) => {
                if (index === state.epsIndex) {
                    i.title = state.epsTitle
                    i.url = state.epsUrl
                    i.time = Date.now()
                }
            });
            setState({ newEps: data, epsTitle: "", epsUrl: "", epsIndex: null, modalState: false, modalStateOptions: null })
        }
    }
    return (
        <form onSubmit={(e) => updateEpsFunc(e)} className="addEpsDiv">
            <div className="addEpsDivChild">
                <label htmlFor="titleEps">Tiêu đề</label>
                <input id="titleEps" type="text" value={state.epsTitle} onChange={(e) => setState({ epsTitle: e.target.value })} required />
            </div>
            <div className="addEpsDivChild">
                <label htmlFor="linkEps">Url</label>
                <input id="linkEps" type="text" value={state.epsUrl} onChange={(e) => setState({ epsUrl: e.target.value })} required />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <button type="submit">Cập nhật</button>
                {state.movieKeysUpdate ? (
                    <button onClick={() => setState({ epsTitle: "", epsUrl: "", epsIndex: null, wantUpdateOldEps: false })} type="button">Hủy</button>
                ) : null}
            </div>
        </form>
    )
}
export default UpdateEps