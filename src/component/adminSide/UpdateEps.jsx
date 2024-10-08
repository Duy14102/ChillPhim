function UpdateEps({ state, setState }) {
    function updateEpsFunc(e) {
        e.preventDefault()
        state.newEps.map((i, index) => {
            if (index === state.epsIndex) {
                i.title = state.epsTitle
                i.url = state.epsUrl
                i.time = Date.now()
            }
        });
        setState({ epsTitle: "", epsUrl: "", epsIndex: null, modalState: false, modalStateOptions: null })
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
            <button type="submit">Cập nhật</button>
        </form>
    )
}
export default UpdateEps