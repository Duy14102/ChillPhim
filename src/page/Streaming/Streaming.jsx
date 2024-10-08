import { useEffect, useRef } from 'react'
import './Streaming.css'
import NoReview from '../../component/no-review/NoReview';
import LandingMovie from '../../component/landing-movie/LandingMovie';
function Streaming() {
    const videoDiv = useRef();
    useEffect(() => {
        videoDiv.current.scrollIntoView({ behavior: "smooth" })
    }, [])
    return (
        <div className='streaming'>
            <div ref={videoDiv} className='videoStreaming'>
                <iframe id='myFrame' allowFullScreen src='https://vip.opstream14.com/share/86ff09548a5c6eff1ec764a28b6c8112'></iframe>
            </div>
            <div className='buttonStreaming'>
                <button className='buttonDefault buttonPrevNext' type='button'>◄ Tập trước</button>
                <button className='buttonDefault buttonPrevNext' type='button'>Tập tiếp ►</button>
                <button className='buttonDefault buttonLight' type='button'>Tắt đèn</button>
                <a className='buttonDefault buttonPrevNext buttonIn4' href='/'>ℹ️</a>
            </div>
            <div className='episodeStreaming'>
                <h2>Danh sách tập</h2>
                <div className='episodeCover'>
                    <a href='/' className='buttonEp'>Tập Full</a>
                    <a href='/' className='buttonEp'>Tập Full</a>
                    <a href='/' className='buttonEp'>Tập Full</a>
                    <a href='/' className='buttonEp'>Tập Full</a>
                    <a href='/' className='buttonEp'>Tập Full</a>
                </div>
            </div>
            <div className='rateStreaming'>
                <h2>💬 Bình luận <span style={{ color: "#fff" }}>(321)</span></h2>
                <div className='rateCover'>
                    <NoReview />
                </div>
            </div>
            <LandingMovie Title={"Phim tương tự"} MarginTop={100} />
        </div>
    )
}

export default Streaming
