import "./LandingMovie.css"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import Skeleton from "react-loading-skeleton";
function LandingMovie({ Title, MarginTop, movie }) {
    return (
        <div style={{ marginTop: MarginTop }} className="landingMovieChild">
            <div className="landingMovieChildTop">
                <p className="landingMovieChildTitle">{Title}</p>
                {Title !== "Phim tương tự" ? (
                    <a href={`/List/All/All/${Title}/${Title === "Phim xem nhiều" ? "MV" : "NF"}`} className="landingMovieChildViewAll">Xem tất cả</a>
                ) : null}
            </div>
            {movie && movie.length > 0 ? (
                <Swiper
                    navigation={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 2
                        },
                        700: {
                            slidesPerView: 3
                        },
                        991: {
                            slidesPerView: 4
                        },
                        1550: {
                            slidesPerView: 5
                        }
                    }}
                    spaceBetween={15}
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
            ) : <Skeleton containerClassName="swiperLandingMovie" />}
        </div>
    )
}
export default LandingMovie