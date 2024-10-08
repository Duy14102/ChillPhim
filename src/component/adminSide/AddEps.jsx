function AddEps({ state, setState }) {
    function addNewEps(e) {
        e.preventDefault()
        const data = {
            title: state.epsTitle,
            url: state.epsUrl,
            time: Date.now()
        }
        state.newEps.push(data)
        setState({ epsTitle: "", epsUrl: "", modalState: false, modalStateOptions: null })
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
            <button type="submit">Thêm</button>
        </form>
    )
}
export default AddEps