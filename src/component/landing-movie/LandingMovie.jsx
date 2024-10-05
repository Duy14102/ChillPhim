import "./LandingMovie.css"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
function LandingMovie({ Title, MarginTop }) {
    return (
        <div style={{ marginTop: MarginTop }} className="landingMovieChild">
            <div className="landingMovieChildTop">
                <p className="landingMovieChildTitle">{Title}</p>
                <a href="/" className="landingMovieChildViewAll">Xem tất cả</a>
            </div>
            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="swiperLandingMovie">
                <SwiperSlide>
                    <a href={`/Information/Avatar-The-Way-Of-Water`}>
                        <div className='imgSwiper'>
                            <img src="https://i.ebayimg.com/00/s/MTYwMFgxMTE5/z/8H8AAOSwUH5jya0l/$_57.JPG?set_id=8800005007" />
                        </div>
                        <p className="titleSwiper"><span>Avatar: The Way Of Water</span></p>
                        <span className="playButtonSwiper">▶</span>
                    </a>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='imgSwiper'>
                        <img src="https://i.ebayimg.com/00/s/MTYwMFgxMTE5/z/8H8AAOSwUH5jya0l/$_57.JPG?set_id=8800005007" />
                    </div>
                    <p className="titleSwiper"><span>Avatar: The Way Of Water</span></p>
                    <span className="playButtonSwiper">▶</span>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='imgSwiper'>
                        <img src="https://i.ebayimg.com/00/s/MTYwMFgxMTE5/z/8H8AAOSwUH5jya0l/$_57.JPG?set_id=8800005007" />
                    </div>
                    <p className="titleSwiper"><span>Avatar: The Way Of Water</span></p>
                    <span className="playButtonSwiper">▶</span>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='imgSwiper'>
                        <img src="https://i.ebayimg.com/00/s/MTYwMFgxMTE5/z/8H8AAOSwUH5jya0l/$_57.JPG?set_id=8800005007" />
                    </div>
                    <p className="titleSwiper"><span>Avatar: The Way Of Water</span></p>
                    <span className="playButtonSwiper">▶</span>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='imgSwiper'>
                        <img src="https://i.ebayimg.com/00/s/MTYwMFgxMTE5/z/8H8AAOSwUH5jya0l/$_57.JPG?set_id=8800005007" />
                    </div>
                    <p className="titleSwiper"><span>Avatar: The Way Of Water</span></p>
                    <span className="playButtonSwiper">▶</span>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='imgSwiper'>
                        <img src="https://i.ebayimg.com/00/s/MTYwMFgxMTE5/z/8H8AAOSwUH5jya0l/$_57.JPG?set_id=8800005007" />
                    </div>
                    <p className="titleSwiper"><span>Avatar: The Way Of Water</span></p>
                    <span className="playButtonSwiper">▶</span>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
export default LandingMovie