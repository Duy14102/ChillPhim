import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// import required modules
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';

function HeroBanner({ movie }) {
    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}p`;
    }
    return (
        <div className='heroBanner'>
            {movie && movie.length > 0 ? (
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: true
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
                    {movie.map((i) => {
                        return (
                            <SwiperSlide key={i._id}>
                                <div className='imgSwiper'>
                                    <img alt={i.title} src={i.banner.horizontal} />
                                </div>
                                <div className='in4Swiper'>
                                    <h1>{i.title}</h1>
                                    <div className='categoryIn4'>
                                        {i.category.map((c, indexC) => {
                                            return (
                                                <a key={indexC} href='/' className='mainCategory'>{c}</a>
                                            )
                                        })}
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
                                        <a href={`/Streaming/${i.subtitle}/${i.filmSources[0].title}`} className='playButton'>Xem ngay <span style={{ marginLeft: 10 }}>▶</span></a>
                                        <button className='trailerButton'>Xem trailer</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            ) : null}
        </div>
    )
}
export default HeroBanner