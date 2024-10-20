import { useReducer, useEffect } from 'react'
import './Information.css'
import LandingMovie from '../../component/landing-movie/LandingMovie';
import NoReview from '../../component/no-review/NoReview';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HaveReview from '../../component/have-review/HaveReview';
import SkeletonLayout from '../../component/skeleton/SkeletonLayout'

function Information() {
    const params = useParams()
    const [state, setState] = useReducer((prev, next) => ({
        ...prev, ...next
    }), {
        toolsBar: 1,
        movies: null,
        similarMovies: null,
        viewMoreCate: false,
    })

    const toolsBarClass = (e) => {
        return state.toolsBar === e ? "titleActive" : "toolsBarTitle"
    }

    const shuffle = (arr) => {
        return arr ? arr.sort(() => Math.random() - 0.5) : []
    }

    function getMoviesIn4() {
        const configuration = {
            method: "get",
            url: `${process.env.REACT_APP_backendAPI}/api/v1/getMoviesIn4`,
            params: {
                subtitle: params.Name
            }
        }
        axios(configuration).then((res) => {
            setState({ movies: res.data.movies, similarMovies: res.data.similarMovies })
        })
    }

    useEffect(() => {
        getMoviesIn4()
    }, [])

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        if (hours) {
            return `${hours}h ${minutes}p`;
        } else {
            return `${minutes}p`;
        }
    }

    function nFormatter(num, digits) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
        const item = lookup.findLast(item => num >= item.value);
        return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
    }
    return (
        <div className='information'>
            <div className='movieIn4'>
                <img loading='lazy' alt={state.movies?.title} src={window.innerWidth <= 991 ? state.movies?.banner.horizontal : state.movies?.banner.vertical} />
                <div className='coverTextIn4'>
                    <SkeletonLayout count={1} state={state.movies}>
                        <h1 className='movieName'>{state.movies?.movieSeason && state.movies?.movieSeason !== "" ? `${state.movies?.title} (Phần ${state.movies?.movieSeason})` : state.movies?.title}</h1>
                    </SkeletonLayout>
                    <div className='movieSideIn4'>
                        <div className='leftSideIn4'>
                            <SkeletonLayout state={state.movies} count={1}>
                                <div className='categoryIn4'>
                                    {state.movies?.category.slice(0, state.viewMoreCate ? state.movies?.category.length : 3).map((c) => {
                                        return (
                                            <a key={c} href='/' className='mainCategory'>{c}</a>
                                        )
                                    })}
                                    <div onClick={() => setState({ viewMoreCate: state.viewMoreCate ? false : true })} className='plusCateIn4'>{state.viewMoreCate ? "Thu gọn" : `+ ${state.movies?.category.length - 3}`}</div>
                                </div>
                            </SkeletonLayout>
                            <SkeletonLayout count={1} state={state.movies}>
                                <div className='ratingIn4'>
                                    <div className='ratingChild'>
                                        <div className='brandRate brandImdb'>IMDb</div>
                                        <div style={{ letterSpacing: 1 }} className='rateScore'>{state.movies?.imdbScore}<span style={{ color: "gray" }}>/10</span></div>
                                    </div>
                                    <div className='ratingChild'>
                                        <div className='brandRate brandAge'>{state.movies?.ageRate}</div>
                                        <div className='rateScore'>{state.movies?.ageRate === "G" ? "(Mọi lứa tuổi)" : state.movies?.ageRate === "PG" ? "(Cân nhắc cho trẻ nhỏ)" : state.movies?.ageRate === "PG-13" ? "(13+)" : state.movies?.ageRate === "R" ? "(18+)" : "(XXX)"}</div>
                                    </div>
                                    <div className='ratingChild'>
                                        <div className='brandRate brandTime'>⌛</div>
                                        <div className='rateScore'>{toHoursAndMinutes(state.movies?.time)}</div>
                                    </div>
                                </div>
                            </SkeletonLayout>
                            <div className='crewIn4Responsive'>
                                <SkeletonLayout count={1} state={state.movies}>
                                    <div className='crewIn4ResponsiveChild'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" /></svg>
                                        {state.movies?.crew.directors.map((s, indexS) => {
                                            return (
                                                <a key={indexS} href={`/ChillPhim/List/Directors/${s.name}/Đạo diễn/NF`}>{s.name}, </a>
                                            )
                                        })}
                                    </div>
                                </SkeletonLayout>
                                <SkeletonLayout count={1} state={state.movies}>
                                    <div className='crewIn4ResponsiveChild'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                                        {state.movies?.crew.stars.map((s, indexS) => {
                                            return (
                                                <a key={indexS} href={`/ChillPhim/List/Stars/${s.name}/Diễn viên/NF`}>{s.name}, </a>
                                            )
                                        })}
                                    </div>
                                </SkeletonLayout>
                                <SkeletonLayout count={1} state={state.movies}>
                                    <div className='crewIn4ResponsiveChild'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M368.4 18.3L312.7 74.1 437.9 199.3l55.7-55.7c21.9-21.9 21.9-57.3 0-79.2L447.6 18.3c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8L134.7 140.6c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4L164.7 324.7c-3-6.3-4.7-13.3-4.7-20.7c0-26.5 21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.7-9.2L288 94.6z" /></svg>
                                        {state.movies?.crew.screenWriters.map((s, indexS) => {
                                            return (
                                                <p key={indexS}>{s.name}, </p>
                                            )
                                        })}
                                    </div>
                                </SkeletonLayout>
                            </div>
                            <SkeletonLayout count={5} state={state.movies}>
                                <div className='contentIn4'>{state.movies?.content}</div>
                            </SkeletonLayout>
                            <div className='buttonIn4'>
                                <a href={`/ChillPhim/Streaming/${state.movies?.subtitle}/${state.movies?.filmSources[0].title}`} className='playButton'>Xem phim<span style={{ marginLeft: 10 }}>▶</span></a>
                            </div>
                        </div>
                        <div className='rightSideIn4'>
                            <div className='quiteIn4'>
                                <span className='quiteName'>Đạo diễn</span>
                                <SkeletonLayout count={1} state={state.movies}>
                                    <p className='quiteContent'>
                                        {state.movies?.crew.directors.map((s, indexS) => {
                                            return (
                                                <a key={indexS} href={`/ChillPhim/List/Directors/${s.name}/Đạo diễn/NF`}>{s.name}, </a>
                                            )
                                        })}
                                    </p>
                                </SkeletonLayout>
                            </div>
                            <div className='quiteIn4'>
                                <span className='quiteName'>Diễn viên</span>
                                <SkeletonLayout count={1} state={state.movies}>
                                    <p className='quiteContent'>
                                        {state.movies?.crew.stars.map((s, indexS) => {
                                            return (
                                                <a key={indexS} href={`/ChillPhim/List/Stars/${s.name}/Diễn viên/NF`}>{s.name}, </a>
                                            )
                                        })}
                                    </p>
                                </SkeletonLayout>
                            </div>
                            <div className='quiteIn4'>
                                <span className='quiteName'>Biên kịch</span>
                                <SkeletonLayout count={1} state={state.movies}>
                                    <div className='quiteContent'>
                                        {state.movies?.crew.screenWriters.map((s, indexS) => {
                                            return (
                                                <div key={indexS}>{s.name}, </div>
                                            )
                                        })}
                                    </div>
                                </SkeletonLayout>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='toolsBar'>
                <div className='coverToolsBar'>
                    <button onClick={() => setState({ toolsBar: 1 })} className={toolsBarClass(1)}>Danh sách tập</button>
                    <button onClick={() => setState({ toolsBar: 3 })} className={toolsBarClass(3)}>Đánh giá ({nFormatter(state.movies?.comments.length)})</button>
                    <button onClick={() => setState({ toolsBar: 2 })} className={toolsBarClass(2)}>Trailer</button>
                </div>
                {state.toolsBar === 1 ? (
                    <SkeletonLayout count={1} state={state.movies}>
                        <div className='epsCover'>
                            {state.movies?.filmSources.map((f, indexF) => {
                                return (
                                    <a key={indexF} href={`/ChillPhim/Streaming/${state.movies?.subtitle}/${f.title}`} className='epsTool'>{f.title}</a>
                                )
                            })}
                        </div>
                    </SkeletonLayout>
                ) : state.toolsBar === 2 ? (
                    <iframe allowFullScreen src={state.movies?.trailerSource}></iframe>
                ) : (
                    <div className='rateCover'>
                        {state.movies?.comments.length < 1 ? (
                            <NoReview movies={state.movies} axios={axios} callBack={getMoviesIn4} />
                        ) : (
                            <HaveReview movies={state.movies} axios={axios} callBack={getMoviesIn4} />
                        )}
                    </div>
                )}
            </div>
            {state.movies?.note ? (
                <div className='noteIn4'>
                    <h3>Ghi chú: </h3>
                    <p>{state.movies?.note || <Skeleton />}</p>
                </div>
            ) : null}
            <LandingMovie Title={"Phim tương tự"} MarginTop={window.innerWidth <= 991 ? 50 : 100} movie={shuffle(state?.similarMovies)} />
        </div>
    )
}

export default Information
