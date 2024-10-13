import { useReducer, useEffect } from 'react'
import './Information.css'
import LandingMovie from '../../component/landing-movie/LandingMovie';
import NoReview from '../../component/no-review/NoReview';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    const toolsArray = [{ content: "Danh sách tập", stateClass: 1 }, { content: "Bình luận", stateClass: 3 }, { content: "Trailer", stateClass: 2 }]

    const toolsBarClass = (e) => {
        return state.toolsBar === e ? "titleActive" : "toolsBarTitle"
    }

    const shuffle = (arr) => {
        return arr ? arr.sort(() => Math.random() - 0.5) : []
    }

    useEffect(() => {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/api/v1/getMoviesIn4",
            params: {
                subtitle: params.Name
            }
        }
        axios(configuration).then((res) => {
            setState({ movies: res.data.movies, similarMovies: res.data.similarMovies })
        })
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
    return (
        <div className='information'>
            <div className='movieIn4'>
                <img loading='lazy' alt={state.movies?.title} src={state.movies?.banner.vertical} />
                <div className='coverTextIn4'>
                    <h1 className='movieName'>{state.movies?.movieSeason && state.movies?.movieSeason !== "" ? `${state.movies?.title} (Phần ${state.movies?.movieSeason})` : state.movies?.title}</h1>
                    <div className='movieSideIn4'>
                        <div className='leftSideIn4'>
                            <div className='categoryIn4'>
                                {state.movies?.category.slice(0, state.viewMoreCate ? state.movies?.category.length : 3).map((c) => {
                                    return (
                                        <a key={c} href='/' className='mainCategory'>{c}</a>
                                    )
                                })}
                                <div onClick={() => setState({ viewMoreCate: state.viewMoreCate ? false : true })} className='plusCateIn4'>{state.viewMoreCate ? "Thu gọn" : `+ ${state.movies?.category.length - 3}`}</div>
                            </div>
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
                            <div className='contentIn4'>{state.movies?.content}</div>
                            <div className='buttonIn4'>
                                <a href={`/Streaming/${state.movies?.subtitle}/${state.movies?.filmSources[0].title}`} className='playButton'>Xem phim<span style={{ marginLeft: 10 }}>▶</span></a>
                            </div>
                        </div>
                        <div className='rightSideIn4'>
                            <div className='quiteIn4'>
                                <span className='quiteName'>Đạo diễn</span>
                                <p className='quiteContent'><a href={`/List/Directors/${state.movies?.crew.directors}/Đạo diễn/NF`}>{state.movies?.crew.directors}</a></p>
                            </div>
                            <div className='quiteIn4'>
                                <span className='quiteName'>Diễn viên</span>
                                <p className='quiteContent'>
                                    {state.movies?.crew.stars.map((s, indexS) => {
                                        return (
                                            <a key={indexS} href={`/List/Stars/${s.name}/Diễn viên/NF`}>{s.name}, </a>
                                        )
                                    })}
                                </p>
                            </div>
                            <div className='quiteIn4'>
                                <span className='quiteName'>Biên kịch</span>
                                <div className='quiteContent'>
                                    {state.movies?.crew.screenWriters.map((s, indexS) => {
                                        return (
                                            <div key={indexS}>{s.name}, </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='toolsBar'>
                <div className='coverToolsBar'>
                    {toolsArray.map((i) => {
                        return (
                            <button key={i.stateClass} onClick={() => setState({ toolsBar: i.stateClass })} className={toolsBarClass(i.stateClass)}>{i.content}</button>
                        )
                    })}
                </div>
                {state.toolsBar === 1 ? (
                    <div className='epsCover'>
                        {state.movies?.filmSources.map((f, indexF) => {
                            return (
                                <a key={indexF} href={`/Streaming/${state.movies?.subtitle}/${f.title}`} className='epsTool'>{f.title}</a>
                            )
                        })}
                    </div>
                ) : state.toolsBar === 2 ? (
                    <iframe allowFullScreen src={state.movies?.trailerSource}></iframe>
                ) : (
                    <div className='rateCover'>
                        <NoReview comments={state.movies?.comments} name={state.movies?.title} />
                    </div>
                )}
            </div>
            {state.movies?.note ? (
                <div className='noteIn4'>
                    <h3>Ghi chú: </h3>
                    <p>{state.movies?.note}</p>
                </div>
            ) : null}
            <LandingMovie Title={"Phim tương tự"} MarginTop={100} movie={shuffle(state?.similarMovies)} />
        </div>
    )
}

export default Information
