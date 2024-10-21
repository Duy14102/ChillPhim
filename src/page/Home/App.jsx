import './App.css'
import HeroBanner from '../../component/hero-banner/HeroBanner'
import LandingMovie from '../../component/landing-movie/LandingMovie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SeenMovies from '../../component/seenMovies/SeenMovies';

function App() {
  document.title = "ChillPhim | Trang chủ"
  const [movie, setMovie] = useState()
  useEffect(() => {
    const configuration = {
      method: "get",
      url: `${process.env.REACT_APP_BACKENDAPI}/api/v1/getMoviesHomepage`
    }
    axios(configuration).then((res) => {
      setMovie(res.data)
    }).catch((err) => {
      console.log(err.response.data.message)
    })
  }, [])
  return (
    <>
      <HeroBanner movie={movie?.heroBanner} />
      <div className="landingMovie">
        {localStorage.getItem("MovieStorage") ? (
          <SeenMovies Title={"Phim vừa xem"} MarginTop={0} useEffect={useEffect} useState={useState} axios={axios} />
        ) : null}

        <LandingMovie Title={"Phim mới"} MarginTop={localStorage.getItem("MovieStorage") ? 100 : 0} movie={movie?.newFilm} />

        <LandingMovie Title={"Phim xem nhiều"} MarginTop={100} movie={movie?.mostViewFilm} />

        <LandingMovie Title={"Anime"} MarginTop={100} movie={movie?.animeFilm} />

        {/* <LandingMovie Title={"Phim sắp chiếu"} MarginTop={100} movie={movie?.upcomingFilm} /> */}
      </div>
    </>
  )
}

export default App
