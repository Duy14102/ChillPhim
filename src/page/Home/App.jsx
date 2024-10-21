import './App.css'
import { lazy, useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
const HeroBanner = lazy(() => import('../../component/hero-banner/HeroBanner'))
const LandingMovie = lazy(() => import('../../component/landing-movie/LandingMovie'))
const SeenMovies = lazy(() => import('../../component/seenMovies/SeenMovies'))

function App() {
  const [movie, setMovie] = useState()
  useEffect(() => {
    const configuration = {
      method: "get",
      url: `${process.env.REACT_APP_BACKENDAPI}/api/v1/getMoviesHomepage`
    }
    axios(configuration).then((res) => {
      setMovie(res.data)
    }).catch((err) => console.log(err.response.data.message))
  }, [])
  return (
    <>
      <Helmet>
        <title>ChillPhim | Trang chủ</title>
        <meta name="description" content="ChillPhim | Phim hay | Phim mới | Xem phim online | Luôn sẵn có tựa phim nóng nhất, hay nhất trên màn ảnh." /> 
        <meta property="og:url" content="https://chill-phim.netlify.app" />
        <meta property="og:site_name" content="ChillPhim" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
      </Helmet>
      <HeroBanner movie={movie?.heroBanner} />
      <div className="landingMovie">
        {localStorage.getItem("MovieStorage") ? (
          <SeenMovies Title={"Phim vừa xem"} MarginTop={50} useEffect={useEffect} useState={useState} axios={axios} />
        ) : null}

        <LandingMovie Title={"Phim mới"} MarginTop={localStorage.getItem("MovieStorage") ? 100 : 50} movie={movie?.newFilm} />

        <LandingMovie Title={"Phim xem nhiều"} MarginTop={100} movie={movie?.mostViewFilm} />

        <LandingMovie Title={"Anime"} MarginTop={100} movie={movie?.animeFilm} />

        {/* <LandingMovie Title={"Phim sắp chiếu"} MarginTop={100} movie={movie?.upcomingFilm} /> */}
      </div>
    </>
  )
}

export default App
