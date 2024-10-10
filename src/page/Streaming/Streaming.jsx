import { useEffect, useRef, useReducer } from 'react'
import './Streaming.css'
import NoReview from '../../component/no-review/NoReview';
import LandingMovie from '../../component/landing-movie/LandingMovie';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Streaming() {
    const videoDiv = useRef();
    const params = useParams()
    const [state, setState] = useReducer((prev, next) => ({
        ...prev, ...next
    }), {
        movies: null,
        similarMovies: null,
        light: false,
        servers: 0,
        wantChangeServer: false
    })

    useEffect(() => {
        videoDiv.current.scrollIntoView({ behavior: "smooth" })
        const configuration = {
            method: "get",
            url: "http://localhost:3000/api/v1/getMoviesIn4",
            params: {
                subtitle: params.Name,
                eps: params.Ep
            }
        }
        axios(configuration).then((res) => {
            setState({ movies: res.data.movies, similarMovies: res.data.similarMovies })
        })
    }, [])

    function prevEps() {
        if (params.Ep.includes("Full")) {
            return params.Ep
        } else {
            if (parseInt(params.Ep.match(/\d/g).join("")) === 1) {
                return params.Ep
            } else {
                return parseInt(params.Ep.match(/\d/g).join("")) - 1
            }
        }
    }

    function nextEps() {
        if (params.Ep.includes("Full")) {
            return params.Ep
        } else {
            if (parseInt(params.Ep.match(/\d/g).join("")) >= state.movies?.filmSources.length) {
                return params.Ep
            } else {
                return parseInt(params.Ep.match(/\d/g).join("")) + 1
            }
        }
    }
    return (
        <div style={{ background: state.light ? "black" : null }} className='streaming'>
            <div ref={videoDiv} className='videoStreaming'>
                {state.movies?.filmSources.filter((item) => item.title === params.Ep)[0].servers[state.servers].includes("m3u8") ? (
                    <video controls>
                        <source src={state.movies?.filmSources.filter((item) => item.title === params.Ep)[0].servers[state.servers]} type="application/x-mpegURL"></source>
                    </video>
                ) : (
                    <iframe id='myFrame' allowFullScreen src={state.movies?.filmSources.filter((item) => item.title === params.Ep)[0].servers[state.servers]}></iframe>
                )}
            </div>
            <div style={{ background: state.light ? "black" : null }} className='buttonStreaming'>
                <a className='buttonDefault buttonPrevNext buttonIn4' href={`/Information/${params.Name}`}>ℹ️</a>
                <a href={`/Streaming/${params.Name}/${prevEps()}`} className='buttonDefault buttonPrevNext' type='button'>◄ Tập trước</a>
                <a href={`/Streaming/${params.Name}/${nextEps()}`} className='buttonDefault buttonPrevNext' type='button'>Tập tiếp ►</a>
                <button onClick={() => setState({ wantChangeServer: state.wantChangeServer ? false : true })} style={{ position: "relative", borderRadius: state.wantChangeServer ? "99px 99px 0 0" : 99 }} className='buttonDefault buttonPrevNext' type='button'>Đổi server
                    {state.wantChangeServer ? (
                        <div className='serverDropdown'>
                            {state.movies?.filmSources.filter((item) => item.title === params.Ep)[0].servers.map((s, indexS) => {
                                return (
                                    <button key={indexS} onClick={() => setState({ servers: indexS })} type='button' className='serverButton'>Server {indexS + 1}</button>
                                )
                            })}
                        </div>
                    ) : null}
                </button>
                <button onClick={() => setState({ light: state.light ? false : true })} className='buttonDefault buttonLight' type='button'>{state.light ? "Bật đèn" : "Tắt đèn"}</button>
            </div>
            <div style={{ opacity: state.light ? 0 : null }} className='episodeStreaming'>
                <h2>Danh sách tập</h2>
                <div className='episodeCover'>
                    {state.movies?.filmSources.map((e) => {
                        return (
                            <a key={e.title} href={`/Streaming/${params.Name}/${e.title}`} className='buttonEp'>{e.title}</a>
                        )
                    })}
                </div>
            </div>
            <div style={{ opacity: state.light ? 0 : null }} className='rateStreaming'>
                <h2>💬 Bình luận <span style={{ color: "#fff" }}>({state.movies?.comments.length})</span></h2>
                <div className='rateCover'>
                    <NoReview comments={state.movies?.comments} name={state.movies?.title} />
                </div>
            </div>
            <div style={{ opacity: state.light ? 0 : null }}>
                <LandingMovie Title={"Phim tương tự"} MarginTop={100} movie={state?.similarMovies} />
            </div>
        </div>
    )
}

export default Streaming
