import "./LandingMovie.css"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
function LandingMovie({ Title, MarginTop, movie }) {
    return (
        movie && movie.length > 0 ? (
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
                    {movie.map((i) => {
                        return (
                            <SwiperSlide key={i._id}>
                                <a href={`/Information/${i.subtitle}`}>
                                    <div className='imgSwiper'>
                                        <img alt={i.title} src={i.banner.vertical} />
                                    </div>
                                    <p className="titleSwiper"><span>{i.title}</span></p>
                                    <span className="playButtonSwiper">▶</span>
                                </a>
                                <div className="filmTotal">{i.totalEps === 1 ? "Tập Full" : `${i.filmSources.length + 1}/${i.totalEps}`}</div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        ) : null
    )
}
export default LandingMovie