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
                    {Title !== "Phim tương tự" ? (
                        <a href={`/List/All/All/${Title}/${Title === "Phim xem nhiều" ? "MV" : "NF"}`} className="landingMovieChildViewAll">Xem tất cả</a>
                    ) : null}
                </div>
                <Swiper
                    navigation={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 2
                        },
                        991: {
                            slidesPerView: 3
                        },
                        1300: {
                            slidesPerView: 4
                        },
                        1600: {
                            slidesPerView: 5
                        }
                    }}
                    spaceBetween={30}
                    modules={[Navigation]}
                    className="swiperLandingMovie">
                    {movie.map((i) => {
                        return (
                            <SwiperSlide key={i._id}>
                                <a href={`/Information/${i.subtitle}`}>
                                    <div className='imgSwiper'>
                                        <img loading="lazy" alt={i.title} src={i.banner.vertical} />
                                    </div>
                                    <p className="titleSwiper"><span>{i.movieSeason && i.movieSeason !== "" ? `${i.title} (Phần ${i.movieSeason})` : i.title}</span></p>
                                    <span className="playButtonSwiper">▶</span>
                                </a>
                                <div className="filmTotal">{!i.totalEps ? `${i.filmSources.length}/??` : i.totalEps === 1 ? "Tập Full" : `Tập ${i.filmSources.length}/${i.totalEps}`}</div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        ) : null
    )
}
export default LandingMovie