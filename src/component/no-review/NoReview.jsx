import "./NoReview.css"
import { toast } from "react-toastify"
import { useReducer, useRef } from "react"
import ToastUpdate from "../../component/Toastify/ToastUpdate"

function NoReview({ movies, axios, callBack }) {
    const toastNow = useRef(null)
    const [state, setState] = useReducer((prev, next) => ({
        ...prev, ...next
    }), {
        name: "",
        stars: "",
        content: ""
    })

    function newComments(e) {
        e.preventDefault()
        toastNow.current = toast.loading("Chờ một chút...")
        const configuration = {
            method: "post",
            url: `${process.env.REACT_APP_backendAPI}/api/v1newComments`,
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
            if (localStorage.getItem("commentStorage") && !JSON.parse(localStorage.getItem("commentStorage")).includes(movies._id)) {
                const dataFind = JSON.parse(localStorage.getItem("commentStorage"))
                dataFind.push(movies._id)
                localStorage.setItem("commentStorage", JSON.stringify(dataFind))
            } else {
                const dataFind = []
                dataFind.push(movies._id)
                localStorage.setItem("commentStorage", JSON.stringify(dataFind))
            }
            setState({ name: "", stars: null, content: "" })
            callBack()
            ToastUpdate({ type: 1, message: res.data.message, refCur: toastNow.current })
        }).catch((err) => {
            ToastUpdate({ type: 2, message: err.response.data.message, refCur: toastNow.current })
        })
    }
    return (
        <div className='rateAndReview'>
            <p className='noReviewTitle'>Chưa có ai đánh giá cả.</p>
            <h1 className='noReviewSubtitle'>Hãy là người đầu tiên đánh giá <span style={{ color: "#fff" }}>"{movies?.movieSeason && movies?.movieSeason !== "" ? `${movies?.title} (Phần ${movies?.movieSeason})` : movies?.title}"</span></h1>
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
                <button type='submit' className='noReviewButton'>Gửi</button>
            </form>
        </div>
    )
}
export default NoReview