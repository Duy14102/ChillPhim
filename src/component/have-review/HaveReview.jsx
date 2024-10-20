import "../no-review/NoReview.css"
import { useReducer, useRef } from "react"
import { toast } from "react-toastify"
import ToastUpdate from "../../component/Toastify/ToastUpdate"
import Skeleton from "react-loading-skeleton"

function HaveReview({ movies, axios, callBack }) {
    const toastNow = useRef(null)
    const [state, setState] = useReducer((prev, next) => ({ ...prev, ...next }), {
        wantReview: false,
        name: "",
        stars: "",
        content: "",
        countComments: 1
    })
    const checkComments = localStorage.getItem("commentStorage")
    const rating = stars => '★★★★★☆☆☆☆☆'.slice(5 - stars, 10 - stars);

    function newComments(e) {
        e.preventDefault()
        toastNow.current = toast.loading("Chờ một chút...")
        const configuration = {
            method: "post",
            url: `${process.env.REACT_APP_BACKENDAPI}/api/v1newComments`,
            data: {
                id: movies._id,
                data: {
                    name: state.name,
                    stars: state.stars,
                    content: state.content,
                    time: Date.now()
                }
            }
        }
        axios(configuration).then((res) => {
            if (checkComments && !JSON.parse(checkComments).includes(movies._id)) {
                const dataFind = JSON.parse(localStorage.getItem("commentStorage"))
                dataFind.push(movies._id)
                localStorage.setItem("commentStorage", JSON.stringify(dataFind))
            } else {
                const dataFind = []
                dataFind.push(movies._id)
                localStorage.setItem("commentStorage", JSON.stringify(dataFind))
            }
            setState({ wantReview: false, name: "", stars: "", content: "" })
            callBack()
            ToastUpdate({ type: 1, message: res.data.message, refCur: toastNow.current })
        }).catch((err) => {
            ToastUpdate({ type: 2, message: err.response.data.message, refCur: toastNow.current })
        })
    }

    return (
        <div className='rateAndReview'>
            {!state.wantReview && (!checkComments || !JSON.parse(checkComments).includes(movies?._id)) ? (
                <button className="writeReviewButton" onClick={() => setState({ wantReview: true })} type="button">✏️ Đánh giá</button>
            ) : checkComments && JSON.parse(checkComments).includes(movies?._id) ? (
                <h3 style={{ color: "rgba(211,211,211,0.8)" }}>Bạn đã bình luận phim này rồi!</h3>
            ) : null}
            {state.wantReview ? (
                <form onSubmit={(e) => newComments(e)}>
                    <div className='noReviewFlex'>
                        <div style={{ width: "49%" }} className='noReviewFlexChild'>
                            <label className='labelContent' htmlFor='noReviewNewIn4'>Tên *</label>
                            <input value={state.name} onChange={(e) => setState({ name: e.target.value })} className='textareaContent' id='noReviewNewIn4' required></input>
                        </div>
                        <div style={{ width: "49%" }} className='noReviewFlexChild'>
                            <div className="rate">
                                <input type='radio' style={{ display: "none" }} required />
                                <input type="radio" onChange={(e) => setState({ stars: e.target.value })} id="star5" name="rate" value="5" />
                                <label title="text" htmlFor='star5'></label>
                                <input type="radio" onChange={(e) => setState({ stars: e.target.value })} id="star4" name="rate" value="4" />
                                <label title="text" htmlFor='star4'></label>
                                <input type="radio" onChange={(e) => setState({ stars: e.target.value })} id="star3" name="rate" value="3" />
                                <label title="text" htmlFor='star3'></label>
                                <input type="radio" onChange={(e) => setState({ stars: e.target.value })} id="star2" name="rate" value="2" />
                                <label title="text" htmlFor='star2'></label>
                                <input type="radio" onChange={(e) => setState({ stars: e.target.value })} id="star1" name="rate" value="1" />
                                <label title="text" htmlFor='star1'></label>
                            </div>
                        </div>
                    </div>
                    <div className='noReviewFlexChild'>
                        <label className='labelContent' htmlFor='noReviewNewContent'>Nội dung *</label>
                        <textarea value={state.content} onChange={(e) => setState({ content: e.target.value })} style={{ height: 200 }} className='textareaContent' id='noReviewNewContent' required></textarea>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                        <button type='submit' className='noReviewButton'>Gửi</button>
                        <button onClick={() => setState({ wantReview: false })} type='button' className='noReviewButton2'>Hủy</button>
                    </div>
                </form>
            ) : null}
            <div className="listReviewCover">
                {movies?.comments ? movies?.comments.slice(0, 6 * state.countComments).map((c, indexC) => {
                    return (
                        <div key={indexC} className="listReview">
                            <div className="nameReview">{c.name}</div>
                            <div className="sideIn4Review"><span>{`${c.stars ? rating(c.stars) : rating(5)}`}</span> • {`${new Date(c.time).toLocaleString()}`}</div>
                            <div className="contentReview">{c.content}</div>
                        </div>
                    )
                }) : (
                    window.innerWidth <= 991 ? (
                        <Skeleton containerClassName="listReview" count={3} />
                    ) : (
                        <>
                            <Skeleton containerClassName="listReview" count={3} />
                            <Skeleton containerClassName="listReview" count={3} />
                        </>
                    )
                )}
                {movies?.comments.length > 6 ? (
                    <button onClick={() => setState({ countComments: state.countComments + 6 })} type="button" className="plusMoreComment">Xem thêm đánh giá</button>
                ) : null}
            </div>
        </div>
    )
}
export default HaveReview