import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// import required modules
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { lazy, useReducer } from 'react';
import Skeleton from 'react-loading-skeleton';
const ModalProps = lazy(() => import('../modal/ModalProps'))

function HeroBanner({ movie }) {
    const [state, setState] = useReducer((prev, next) => ({
        ...prev, ...next
    }), {
        modalState: false,
        trailerData: null,
        viewMoreCate: false,
        viewMoreCateIndex: null
    })
    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        if (hours) {
            return `${hours}h ${minutes}p`;
        } else {
            return `${minutes}p`;
        }
    }
    return (
        <div className='heroBanner'>
            {movie && movie.length > 0 ? (
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true
                    }}
                    loop={true}
                    navigation={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 50,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    modules={[EffectCoverflow, Navigation, Autoplay]}
                    className="swiperHeroBanner">
                    {movie.map((i, indexI) => {
                        return (
                            <SwiperSlide key={i._id}>
                                <div className='imgSwiper'>
                                    <img loading='lazy' alt="Image" src={i.banner.horizontal} />
                                </div>
                                <div className='in4Swiper'>
                                    <h1>{i.movieSeason && i.movieSeason !== "" ? `${i.title} (Phần ${i.movieSeason})` : i.title}</h1>
                                    <div className='categoryIn4'>
                                        {i.category.slice(0, state.viewMoreCate && state.viewMoreCateIndex === indexI ? i.category.length : 5).map((c, indexC) => {
                                            return (
                                                <a key={indexC} href={`/List/Genres/${c}/${c}/NF`} className='mainCategory'>{c}</a>
                                            )
                                        })}
                                        {i.category.length > 5 ? (
                                            <span onClick={() => setState({ viewMoreCate: state.viewMoreCate ? false : true, viewMoreCateIndex: state.viewMoreCateIndex ? null : indexI })} className='plusCategoryIn4'>{state.viewMoreCate && state.viewMoreCateIndex === indexI ? "Thu gọn" : `+ ${i.category.length - 5}`}</span>
                                        ) : null}
                                    </div>
                                    <div className='ratingIn4'>
                                        <div className='ratingChild'>
                                            <div className='brandRate brandImdb'>IMDb</div>
                                            <div style={{ letterSpacing: 1 }} className='rateScore'>{i.imdbScore}<span style={{ color: "gray" }}>/10</span></div>
                                        </div>
                                        <div className='ratingChild'>
                                            <div className='brandRate brandAge'>{i.ageRate}</div>
                                            <div className='rateScore'>{i.ageRate === "G" ? "(Mọi lứa tuổi)" : i.ageRate === "PG" ? "(Cân nhắc cho trẻ nhỏ)" : i.ageRate === "PG-13" ? "(13+)" : i.ageRate === "R" ? "(18+)" : "(XXX)"}</div>
                                        </div>
                                        <div className='ratingChild'>
                                            <div className='brandRate brandTime'>⌛</div>
                                            <div className='rateScore'>{toHoursAndMinutes(i.time)}</div>
                                        </div>
                                    </div>
                                    <div className='contentIn4'>{i.content}</div>
                                    <div className='buttonIn4'>
                                        <a href={`/Streaming/${i.subtitle}/${i.filmSources[0].title}`} className='playButton'>Xem ngay
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -25 512 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                                        </a>
                                        <button type='button' onClick={() => setState({ modalState: true, trailerData: i.trailerSource })} className='trailerButton'>Xem trailer</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            ) : <Skeleton containerClassName='swiperHeroBanner' height={"100%"} />}
            <ModalProps state={state} setState={setState}>
                <iframe style={{ marginTop: 25 }} allowFullScreen src={state.trailerData}></iframe>
            </ModalProps>
        </div>
    )
}
export default HeroBanner