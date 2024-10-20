import "../landing-movie/LandingMovie.css"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import Skeleton from "react-loading-skeleton";
function SeenMovies({ Title, MarginTop, useState, useEffect, axios }) {
    const [movie, setMovie] = useState()
    const movieStorage = JSON.parse(localStorage.getItem("MovieStorage"))
    useEffect(() => {
        const configuration = {
            method: "get",
            url: `${process.env.REACT_APP_backendAPI}/api/v1/getMoviesSeen`,
            params: {
                movies: movieStorage
            }
        }
        axios(configuration).then((res) => {
            setMovie(res.data)
        })
    }, [])
    return (
        <div style={{ marginTop: MarginTop }} className="landingMovieChild">
            <div className="landingMovieChildTop">
                <p className="landingMovieChildTitle">{Title}</p>
            </div>
            {movieStorage && movieStorage.length > 0 && movie ? (
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
                    {movieStorage.sort((a, b) => b.time - a.time).map((i) => {
                        const compareEqual = movie?.filter((item) => item.subtitle === i.title)[0]
                        return (
                            <SwiperSlide key={i.title}>
                                <a href={`/Streaming/${i.title}/${i.eps}`}>
                                    <div style={{ height: 200 }} className='imgSwiper'>
                                        <img loading="lazy" alt={i.title} src={compareEqual?.banner.horizontal} />
                                    </div>
                                    <p className="titleSwiper"><span>{compareEqual?.movieSeason && compareEqual?.movieSeason !== "" ? `${compareEqual?.title} (Phần ${compareEqual?.movieSeason})` : compareEqual?.title}</span></p>
                                    <span className="playButtonSwiper">▶</span>
                                </a>
                                <div className="filmTotal">{i.eps}</div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            ) : <Skeleton containerClassName="swiperLandingMovie" />}
        </div>
    )
}
export default SeenMovies