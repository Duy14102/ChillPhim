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
                                    <div className="playButtonSwiper">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -25 512 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                                    </div>
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