import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// import required modules
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';

function HeroBanner() {
    return (
        <div className='heroBanner'>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
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
                <SwiperSlide>
                    <div className='imgSwiper'>
                        <img src="https://thecollision.org/wp-content/uploads/2022/12/2-1.png" />
                    </div>
                    <div className='in4Swiper'>
                        <h1>Avatar: The Way Of Water</h1>
                        <div className='categoryIn4'>
                            <a href='/' className='mainCategory'>Huyền bí</a>
                            <a href='/' className='mainCategory'>Hành động</a>
                            <a href='/' className='mainCategory'>Phiêu lưu</a>
                            <a href='/' className='mainCategory'>Viễn tưởng</a>
                        </div>
                        <div className='ratingIn4'>
                            <div className='ratingChild'>
                                <div className='brandRate brandImdb'>IMDb</div>
                                <div style={{ letterSpacing: 1 }} className='rateScore'>7.6<span style={{ color: "gray" }}>/10</span></div>
                            </div>
                            <div className='ratingChild'>
                                <div className='brandRate brandAge'>PG</div>
                                <div className='rateScore'>13 (18+)</div>
                            </div>
                            <div className='ratingChild'>
                                <div className='brandRate brandTime'>⌛</div>
                                <div className='rateScore'>3h 12m</div>
                            </div>
                        </div>
                        <div className='contentIn4'>
                            Avatar 2 là bữa tiệc về kỹ xảo hình ảnh 3D. Đầu phim, James Cameron gợi ký ức người xem khi tái hiện hành tinh Pandora. Những sinh vật kỳ bí tiếp tục được khắc họa, như cảnh loài rồng núi Banshee bay lượn giữa dãy Hallelujah hùng vĩ, báo Thanator rình rập rừng sâu... Người Navi - các sinh vật với làn da xanh biếc, đôi mắt màu hổ phách - có tạo hình sắc nét, lối biểu cảm, trò chuyện sinh động hơn phần một.
                        </div>
                        <div className='buttonIn4'>
                            <a href={`/Streaming/Avatar-The-Way-Of-Water/Full`} className='playButton'>Xem ngay <span style={{ marginLeft: 10 }}>▶</span></a>
                            <button className='trailerButton'>Xem trailer</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='imgSwiper'>
                        <img src="https://templates.iqonic.design/streamit-dist/frontend/html/assets/images/movies/movie-banner-2.webp" />
                    </div>
                </SwiperSlide><SwiperSlide>
                    <div className='imgSwiper'>
                        <img src="https://templates.iqonic.design/streamit-dist/frontend/html/assets/images/movies/movie-banner-2.webp" />
                    </div>
                </SwiperSlide><SwiperSlide>
                    <div className='imgSwiper'>
                        <img src="https://templates.iqonic.design/streamit-dist/frontend/html/assets/images/movies/movie-banner-2.webp" />
                    </div>
                </SwiperSlide><SwiperSlide>
                    <div className='imgSwiper'>
                        <img src="https://templates.iqonic.design/streamit-dist/frontend/html/assets/images/movies/movie-banner-2.webp" />
                    </div>
                </SwiperSlide><SwiperSlide>
                    <div className='imgSwiper'>
                        <img src="https://templates.iqonic.design/streamit-dist/frontend/html/assets/images/movies/movie-banner-2.webp" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
export default HeroBanner