import "./NoReview.css"

function NoReview({ comments, name }) {
    return (
        <div className='rateAndReview'>
            {comments?.length === 0 ? (
                <>
                    <p className='noReviewTitle'>Chưa có ai bình luận cả.</p>
                    <h1 className='noReviewSubtitle'>Hãy là người đầu tiên bình luận <span style={{ color: "#fff" }}>"{name}"</span></h1>
                    <form>
                        <div className='noReviewFlexChild'>
                            <label className='labelContent' htmlFor='noReviewNewContent'>Nội dung *</label>
                            <textarea style={{ height: 200 }} className='textareaContent' id='noReviewNewContent'></textarea>
                        </div>
                        <div className='noReviewFlex'>
                            <div style={{ width: "49%" }} className='noReviewFlexChild'>
                                <label className='labelContent' htmlFor='noReviewNewIn4'>Tên *</label>
                                <input className='textareaContent' id='noReviewNewIn4'></input>
                            </div>
                            <div style={{ width: "49%" }} className='noReviewFlexChild'>
                                <label className='labelContent' htmlFor='noReviewNewIn4'>Email *</label>
                                <input className='textareaContent' id='noReviewNewIn4'></input>
                            </div>
                        </div>
                        <button type='submit' className='noReviewButton'>Gửi</button>
                    </form>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
export default NoReview