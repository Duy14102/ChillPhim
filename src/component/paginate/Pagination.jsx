import "./Pagination.css"

function Pagination({ currentPage, pageCount, callBack, searchEnale }) {
    function HandlePageClick(e) {
        currentPage.current = e + 1
        callBack(searchEnale !== "" ? searchEnale : null);
    }

    function pagePrev() {
        if (currentPage.current <= 1) {
            return false
        }
        currentPage.current = currentPage.current - 1
        callBack(searchEnale !== "" ? searchEnale : null)
    }
    function pageNext() {
        if (currentPage.current >= pageCount) {
            return false
        }
        currentPage.current = currentPage.current + 1
        callBack(searchEnale !== "" ? searchEnale : null)
    }
    return (
        <div className="pagination">
            <button onClick={() => pagePrev()} type="button" className="page-item">{"<"}</button>
            {Array.from(Array(pageCount), (e, i) => {
                return (
                    <button style={i + 1 === currentPage.current ? { background: "#94b1f2", color: "#fff" } : null} onClick={() => HandlePageClick(i)} key={i} type="button" className="page-item">{i + 1}</button>
                )
            })}
            <button onClick={() => pageNext()} type="button" className="page-item">{">"}</button>
        </div>
    )
}
export default Pagination