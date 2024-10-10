import ToastError from "../Toastify/ToastError"

function AddEps({ state, setState }) {
    function addNewEps(e) {
        e.preventDefault()
        if (state.servers.includes("") || state.servers.length === 0) {
            return ToastError({ message: "Url server bị trống!" })
        }
        const dataFirst = state.movieKeysUpdate ? state.movieKeysUpdate : state.newEps
        const data = {
            title: state.epsTitle,
            servers: state.servers,
            time: Date.now()
        }
        if (state.movieKeysUpdate) {
            dataFirst.filmSources.push(data)
            setState({ movieKeysUpdate: dataFirst, epsTitle: "", servers: [], wantUpdatePrevEps: false })
        } else {
            dataFirst.push(data)
            setState({ newEps: dataFirst, epsTitle: "", servers: [], modalState: false, modalStateOptions: null })
        }
    }

    function addUrlToServers(index, e) {
        const data = state.servers
        data[index] = e.target.value
        setState({ servers: data })
    }

    function addServers() {
        const data = state.servers
        data.push("")
        setState({ servers: data })
    }

    function deleteServers(indexS) {
        const data = state.servers
        data.splice(indexS, 1)
        setState({ servers: data })
    }
    return (
        <form onSubmit={(e) => addNewEps(e)} className="addEpsDiv">
            <div className="addEpsDivChild">
                <label htmlFor="titleEps">Tiêu đề</label>
                <input id="titleEps" type="text" value={state.epsTitle} onChange={(e) => setState({ epsTitle: e.target.value })} required />
            </div>
            {state.servers.map((s, indexS) => {
                return (
                    <div key={indexS} className="addEpsDivChild">
                        <label htmlFor="linkEps">Server {indexS + 1}</label>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                            <input style={{ width: "95%" }} placeholder="Url..." id="linkEps" type="text" value={s} onChange={(e) => addUrlToServers(indexS, e)} required />
                            <button onClick={() => deleteServers(indexS)} type="button" className="destroyLinkEps">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                            </button>
                        </div>
                    </div>
                )
            })}
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <button type="button" onClick={() => addServers()}>+ Servers</button>
                <button type="submit">Xong</button>
                {state.movieKeysUpdate ? (
                    <button onClick={() => setState({ epsTitle: "", servers: [], wantUpdatePrevEps: false })} type="button">Hủy</button>
                ) : null}
            </div>
        </form>
    )
}
export default AddEps