import { useReducer } from 'react'
import './Information.css'
import LandingMovie from '../../component/landing-movie/LandingMovie';
import NoReview from '../../component/no-review/NoReview';
function Information() {
    const [state, setState] = useReducer((prev, next) => ({
        ...prev, ...next
    }), {
        toolsBar: 1
    })
    const toolsArray = [{ content: "Danh sách tập", stateClass: 1 }, { content: "Bình luận", stateClass: 3 }, { content: "Trailer", stateClass: 2 }]

    const toolsBarClass = (e) => {
        return state.toolsBar === e ? "titleActive" : "toolsBarTitle"
    }
    return (
        <div className='information'>
            <div className='movieIn4'>
                <img src="https://i.ebayimg.com/00/s/MTYwMFgxMTE5/z/8H8AAOSwUH5jya0l/$_57.JPG?set_id=8800005007" />
                <div className='coverTextIn4'>
                    <h1 className='movieName'>Avatar: The Way Of Water</h1>
                    <div className='movieSideIn4'>
                        <div className='leftSideIn4'>
                            <div className='categoryIn4'>
                                <a href='/' className='mainCategory'>Huyền bí</a>
                                <a href='/' className='mainCategory'>Hành động</a>
                                <a href='/' className='mainCategory'>Phiêu lưu</a>
                                <a href='/' className='mainCategory'>Viễn tưởng</a>
                            </div>
                            <div className='ratingIn4'>
                                <div className='ratingChild'>
                                    <div className='brandRate brandImdb'>IMDb</div>
                                    <div style={{ letterSpacing: 1 }} className='rateScore'>7.6<span style={{ color: "gray" }}>/10</span></div>
                                </div>
                                <div className='ratingChild'>
                                    <div className='brandRate brandAge'>PG</div>
                                    <div className='rateScore'>13 (18+)</div>
                                </div>
                                <div className='ratingChild'>
                                    <div className='brandRate brandTime'>⌛</div>
                                    <div className='rateScore'>3h 12m</div>
                                </div>
                            </div>
                            <div className='contentIn4'>
                                Avatar 2 là bữa tiệc về kỹ xảo hình ảnh 3D. Đầu phim, James Cameron gợi ký ức người xem khi tái hiện hành tinh Pandora. Những sinh vật kỳ bí tiếp tục được khắc họa, như cảnh loài rồng núi Banshee bay lượn giữa dãy Hallelujah hùng vĩ, báo Thanator rình rập rừng sâu... Người Navi - các sinh vật với làn da xanh biếc, đôi mắt màu hổ phách - có tạo hình sắc nét, lối biểu cảm, trò chuyện sinh động hơn phần một.
                            </div>
                            <div className='buttonIn4'>
                                <a href={`/Streaming/Avatar-The-Way-Of-Water/Full`} className='playButton'>Xem phim<span style={{ marginLeft: 10 }}>▶</span></a>
                            </div>
                        </div>
                        <div className='rightSideIn4'>
                            <div className='quiteIn4'>
                                <span className='quiteName'>Đạo diễn</span>
                                <p className='quiteContent'><a href='/'>James Cameron</a></p>
                            </div>
                            <div className='quiteIn4'>
                                <span className='quiteName'>Diễn viên</span>
                                <p className='quiteContent'><a href='/'>Rick Jaffa</a>, <a href='/'>Amanda Silver</a></p>
                            </div>
                            <div className='quiteIn4'>
                                <span className='quiteName'>Biên kịch</span>
                                <p className='quiteContent'>Rick Jaffa, Amanada Silver</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='toolsBar'>
                <div className='coverToolsBar'>
                    {toolsArray.map((i) => {
                        return (
                            <button key={i.stateClass} onClick={() => setState({ toolsBar: i.stateClass })} className={toolsBarClass(i.stateClass)}>{i.content}</button>
                        )
                    })}
                </div>
                {state.toolsBar === 1 ? (
                    <div className='epsCover'>
                        <a href='/' className='epsTool'>Tập Full</a>
                        <a href='/' className='epsTool'>Tập Full</a>
                        <a href='/' className='epsTool'>Tập Full</a>
                        <a href='/' className='epsTool'>Tập Full</a>
                    </div>
                ) : state.toolsBar === 2 ? (
                    <iframe allowFullScreen src='https://www.youtube.com/embed/d9MyW72ELq0'></iframe>
                ) : (
                    <div className='rateCover'>
                        <NoReview />
                    </div>
                )}
            </div>
            <LandingMovie Title={"Phim tương tự"} MarginTop={100} />
        </div>
    )
}

export default Information
