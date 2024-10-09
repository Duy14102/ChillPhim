import "./Pagination.css"

function Pagination({ state, setState, callBack }) {
    function HandlePageClick(e) {
        state.currentPage = e + 1
        callBack();
    }

    function pagePrev() {
        if (state.currentPage <= 1) {
            return false
        }
        state.currentPage = state.currentPage - 1
        callBack()
    }
    function pageNext() {
        if (state.currentPage >= state.pageCount) {
            return false
        }
        state.currentPage = state.currentPage + 1
        callBack()
    }
    return (
        <div className="pagination">
            <button onClick={() => pagePrev()} type="button" className="page-item">{"<"}</button>
            {Array.from(Array(state.pageCount), (e, i) => {
                return (
                    <button style={i + 1 === state.currentPage ? { background: "#94b1f2", color: "#fff" } : null} onClick={() => HandlePageClick(i)} key={i} type="button" className="page-item">{i + 1}</button>
                )
            })}
            <button onClick={() => pageNext()} type="button" className="page-item">{">"}</button>
        </div>
    )
}
export default Pagination