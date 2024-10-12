import "./Pagination.css"

function PaginationAdd({ currentPage, pageCount, callBack, searchEnale }) {
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

    function pageNumbers(count, current) {
        var result = [];
        if (current >= 1 && count === 1) {
            result.push(current)
        }
        if (current >= 1 && count === 2) {
            result.push(current, count)
        }
        if (current >= 1 && count === 3) {
            result.push(current, count - 1, count)
        }
        if (current > 1 && count > 3) {
            result.push(current - 1, current, current + 1)
        }
        if (current === count && count > 3) {
            result.push(current - 2, current - 1, current)
        }
        return result
    }
    return (
        <div className="pagination">
            <button onClick={() => pagePrev()} type="button" className="page-item">{"<"}</button>
            {pageNumbers(pageCount, currentPage.current).map((i) => {
                return (
                    <button style={i === currentPage.current ? { background: "#94b1f2", color: "#fff" } : null} onClick={() => HandlePageClick(i)} key={i} type="button" className="page-item">{i}</button>
                )
            })}
            <button onClick={() => pageNext()} type="button" className="page-item">{">"}</button>
        </div>
    )
}
export default PaginationAdd