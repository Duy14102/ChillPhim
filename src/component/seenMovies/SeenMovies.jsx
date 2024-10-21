import "../landing-movie/LandingMovie.css"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

function SeenMovies({ Title, MarginTop, useState, useEffect, axios }) {
    const [movie, setMovie] = useState()
    const movieStorage = JSON.parse(localStorage.getItem("MovieStorage"))
    useEffect(() => {
        const configuration = {
            method: "get",
            url: `${process.env.REACT_APP_BACKENDAPI}/api/v1/getMoviesSeen`,
            params: {
                movies: movieStorage
            }
        }
        axios(configuration).then((res) => {
            setMovie(res.data)
        }).catch((err) => console.log(err.response.data.message))
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
                                        <LazyLoadImage alt="Image" src={compareEqual?.banner.horizontal} />
                                    </div>
                                    <p className="titleSwiper"><span>{compareEqual?.movieSeason && compareEqual?.movieSeason !== "" ? `${compareEqual?.title} (Phần ${compareEqual?.movieSeason})` : compareEqual?.title}</span></p>
                                    <div className="playButtonSwiper">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -25 512 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                                    </div>
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