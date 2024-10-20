import "./List.css"
import { useEffect, useReducer, useRef } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Pagination from "../../component/paginate/Pagination"
import Skeleton from "react-loading-skeleton"

function List() {
    const params = useParams()
    const [state, setState] = useReducer((prev, next) => ({
        ...prev, ...next
    }), {
        listMovie: null,
        pageCount: 6
    })
    const limit = window.innerWidth <= 991 ? 14 : 15
    const currentPage = useRef(1)
    const orderString = params.Order === "National" ? "Quốc gia" : "Thể loại"

    function callMovieList() {
        const configuration = {
            method: "get",
            url: `${process.env.REACT_APP_backendAPI}/api/v1/getMoviesList`,
            params: {
                order: params.Order,
                type: params.Type,
                page: currentPage.current,
                limit: limit,
                sortMovie: params.Sort
            }
        }
        axios(configuration).then((res) => {
            setState({ listMovie: res.data.results.result, pageCount: res.data.results.pageCount })
        })
    }

    useEffect(() => {
        callMovieList()
    }, [])
    return (
        <div className="list">
            <div className="topList">
                <h3><span style={{ color: "rgba(211,211,211,0.8)" }}>{orderString}:</span> {params.Order === "Directors" || params.Order === "Stars" || params.Order === "Search" ? `${params.Calling} (${params.Type})` : params.Calling}</h3>
                <select defaultValue={params.Sort} onChange={(e) => window.location.href = `/List/${params.Order}/${params.Type}/${params.Calling}/${e.target.value}`}>
                    <option hidden value={""}>Lọc phim...</option>
                    <option value={"MV"}>Xem nhiều nhất</option>
                    <option value={"NF"}>Phim mới</option>
                    <option value={"OF"}>Phim cũ</option>
                    <option value={"AZ"}>Tên A-Z</option>
                </select>
            </div>
            {state.listMovie ? (
                <div className="midList">
                    {state.listMovie?.length > 0 ? state.listMovie?.map((i) => {
                        return (
                            <div className="coverList" key={i._id}>
                                <a href={`/Information/${i.subtitle}`}>
                                    <div className='imgSwiper'>
                                        <img loading="lazy" alt={i.title} src={i.banner.vertical} />
                                    </div>
                                    <p className="titleSwiper"><span>{i.title}</span></p>
                                    <span className="playButtonSwiper">▶</span>
                                </a>
                                <div className="filmTotal">{!i.totalEps ? `${i.filmSources.length}/??` : i.totalEps === 1 ? "Tập Full" : `${i.filmSources.length}/${i.totalEps}`}</div>
                            </div>
                        )
                    }) : (
                        <div className="noFilmAnnounce">Không có kết quả!</div>
                    )}
                    {state.listMovie.length > 0 ? (
                        <Pagination currentPage={currentPage} pageCount={state.pageCount} callBack={callMovieList} searchEnale={""} />
                    ) : null}
                </div>
            ) : <Skeleton count={3} containerClassName="midList" width={"100%"} />}
        </div>
    )
}
export default List