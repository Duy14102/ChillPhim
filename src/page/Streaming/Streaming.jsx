import './Streaming.css'
import { useEffect, useRef, useReducer, lazy } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
const LandingMovie = lazy(() => import('../../component/landing-movie/LandingMovie'))
const ToastSuccess = lazy(() => import('../../component/Toastify/ToastSuccess'))
const NoReview = lazy(() => import('../../component/no-review/NoReview'))
const HaveReview = lazy(() => import('../../component/have-review/HaveReview'))

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
        wantChangeServer: true
    })

    useEffect(() => {
        videoDiv.current.scrollIntoView({ behavior: "smooth" })
        getMoviesIn4()
    }, [])

    const shuffle = (arr) => {
        return arr ? arr.sort(() => Math.random() - 0.5) : []
    }

    function countView() {
        const configuration = {
            method: "post",
            url: `${process.env.REACT_APP_BACKENDAPI}/api/v1/countMoviesView`,
            data: {
                subtitle: params.Name
            }
        }
        axios(configuration).then((res) => {
            console.log(res.data.message)
        }).catch((err) => console.log(err.response.data.message))
    }

    function getMoviesIn4() {
        const configuration = {
            method: "get",
            url: `${process.env.REACT_APP_BACKENDAPI}/api/v1/getMoviesIn4`,
            params: {
                subtitle: params.Name,
                eps: params.Ep
            }
        }
        axios(configuration).then((res) => {
            setState({ movies: res.data.movies, similarMovies: res.data.similarMovies })
            const checkMoviesPass = JSON.parse(localStorage.getItem("MovieStorage"))
            if (!checkMoviesPass) {
                var movies = [];
                var moviesChild = { title: params.Name, eps: params.Ep, time: Date.now() };
                movies.push(moviesChild);
                localStorage.setItem("MovieStorage", JSON.stringify(movies));
                countView()
            } else {
                if (checkMoviesPass.filter((item) => item.title === params.Name).length === 0) {
                    var moviesChild = { title: params.Name, eps: params.Ep, time: Date.now() };
                    checkMoviesPass.push(moviesChild);
                    localStorage.setItem("MovieStorage", JSON.stringify(checkMoviesPass));
                    countView()
                } else {
                    checkMoviesPass.filter((item) => item.title === params.Name).map((m) => {
                        if (new Date(m.time).getFullYear() < new Date(Date.now()).getFullYear()) {
                            countView()
                        }
                        if (m.eps !== params.Ep) {
                            m.eps = params.Ep
                        }
                        m.time = Date.now()
                        localStorage.setItem("MovieStorage", JSON.stringify(checkMoviesPass));
                        return null
                    })
                }
            }
        }).catch((err) => console.log(err.response.data.message))
    }

    function nextEps() {
        if (params.Ep.includes("Full")) {
            return params.Ep
        } else {
            if (parseInt(params.Ep.match(/\d/g).join("")) >= state.movies?.filmSources.length) {
                return params.Ep
            } else {
                return `Tập ${parseInt(params.Ep.match(/\d/g).join("")) + 1}`
            }
        }
    }

    function changeServer(index) {
        setState({ servers: index })
        videoDiv.current.scrollIntoView({ behavior: "smooth" })
        ToastSuccess({ message: "Đổi server thành công!" })
    }
    return (
        <div style={{ background: state.light ? "black" : null }} className='streaming'>
            <Helmet>
                <title>{`ChillPhim | ${state.movies?.title} - ${params.Ep}`}</title>
                <meta name="description" content={`ChillPhim | ${state.movies?.title} - ${params.Ep} | ${state.movies?.content}`} />
                <meta property="og:url" content={`https://chill-phim.netlify.app/Streaming/${params.Name}/${params.Ep}`} />
                <meta property="og:site_name" content="ChillPhim" />
                <meta property="og:locale" content="vi_VN" />
                <meta property="og:type" content="website" />
            </Helmet>
            <div className='titleStreaming'>
                <a href={`/Information/${state.movies?.subtitle}`} className='titleLinkStreaming'>{state.movies?.title}</a>
                <div className='botStreaming'>
                    <p>{params.Ep}</p>
                    <a href={`/Information/${state.movies?.subtitle}`} className='in4LinkStreaming'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                    </a>
                </div>
            </div>
            <div ref={videoDiv} className='videoStreaming'>
                <iframe id='myFrame' allowFullScreen src={state.movies?.filmSources.filter((item) => item.title === params.Ep)[0].servers[state.servers]}></iframe>
                <button onClick={() => setState({ wantChangeServer: state.wantChangeServer ? false : true })} type='button' className='chooseServers'>
                    <svg style={state.wantChangeServer ? { rotate: "90deg" } : null} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
                    {state.wantChangeServer ? (
                        <div className='serverDropdown'>
                            {state.movies?.filmSources.filter((item) => item.title === params.Ep)[0].servers.map((s, indexS) => {
                                return (
                                    <div style={state.servers === indexS ? { background: "#94b1f2" } : null} key={indexS} onClick={() => changeServer(indexS)} type='button' className='serverButton'>Server {indexS + 1}</div>
                                )
                            })}
                        </div>
                    ) : null}
                </button>
            </div>
            <div style={{ background: state.light ? "black" : null }} className='buttonStreaming'>
                <button className='buttonDefault buttonIn4' href={`/Information/${params.Name}`}>⚠️</button>
                <button onClick={() => setState({ light: state.light ? false : true })} className='buttonDefault buttonLight' type='button'>{state.light ? "Bật đèn" : "Tắt đèn"}</button>
                <a style={{ pointerEvents: nextEps() === params.Ep ? "none" : null }} href={`/Streaming/${params.Name}/${nextEps()}`} className='buttonDefault buttonPrevNext' type='button'>Tập tiếp ►</a>
            </div>
            <div style={{ opacity: state.light ? 0 : null }} className='episodeStreaming'>
                <h2>Danh sách tập</h2>
                <div className='episodeCover'>
                    {state.movies?.filmSources.map((e) => {
                        return (
                            <a style={e.title === params.Ep ? { color: "#fff", background: "#94b1f2" } : null} key={e.title} href={`/Streaming/${params.Name}/${e.title}`} className='buttonEp'>{e.title}</a>
                        )
                    })}
                </div>
            </div>
            <div style={{ opacity: state.light ? 0 : null }} className='rateStreaming'>
                <h2>💬 Bình luận <span style={{ color: "#fff" }}>({state.movies?.comments.length})</span></h2>
                <div className='rateCover'>
                    {state.movies?.comments.length < 1 ? (
                        <NoReview movies={state.movies} axios={axios} callBack={getMoviesIn4} />
                    ) : (
                        <HaveReview movies={state.movies} axios={axios} callBack={getMoviesIn4} />
                    )}
                </div>
            </div>
            <div style={{ opacity: state.light ? 0 : null }}>
                <LandingMovie Title={"Phim tương tự"} MarginTop={window.innerWidth <= 991 ? 50 : 100} movie={shuffle(state?.similarMovies)} />
            </div>
        </div>
    )
}

export default Streaming
