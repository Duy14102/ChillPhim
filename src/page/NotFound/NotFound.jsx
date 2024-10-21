import './NotFound.css'

function NotFound() {
    document.title = "ChillPhim | 404 - Không tìm thấy trang"
    return (
        <div className="notFound">
            <div className="rail">
                <div className="stamp four">4</div>
                <div className="stamp zero">0</div>
                <div className="stamp four">4</div>
                <div className="stamp zero">0</div>
                <div className="stamp four">4</div>
                <div className="stamp zero">0</div>
                <div className="stamp four">4</div>
                <div className="stamp zero">0</div>
                <div className="stamp four">4</div>
                <div className="stamp zero">0</div>
                <div className="stamp four">4</div>
                <div className="stamp zero">0</div>
                <div className="stamp four">4</div>
                <div className="stamp zero">0</div>
                <div className="stamp four">4</div>
                <div className="stamp zero">0</div>
                <div className="stamp four">4</div>
                <div className="stamp zero">0</div>
                <div className="stamp four">4</div>
                <div className="stamp zero">0</div>
            </div>
            <div className="world">
                <div className="forward">
                    <div className="box">
                        <div className="wall"></div>
                        <div className="wall"></div>
                        <div className="wall"></div>
                        <div className="wall"></div>
                        <div className="wall"></div>
                        <div className="wall"></div>
                    </div>
                </div>
            </div>
            <div className='backHome'>
                <p className='backHomeText'>Trang này không tồn tại !</p>
                <a href="/" className="backHomeLink">Về trang chủ</a>
            </div>
        </div>
    )
}
export default NotFound