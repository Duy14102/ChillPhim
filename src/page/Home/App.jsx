import './App.css'
import HeroBanner from '../../component/hero-banner/HeroBanner'
import LandingMovie from '../../component/landing-movie/LandingMovie';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [movie, setMovie] = useState()
  useEffect(() => {
    const configuration = {
      method: "get",
      url: "http://localhost:3000/api/v1/getMoviesHomepage"
    }
    axios(configuration).then((res) => {
      setMovie(res.data)
    })
  }, [])
  return (
    <>
      <HeroBanner movie={movie?.heroBanner} />
      <div className="landingMovie">
        <LandingMovie Title={"Phim mới"} MarginTop={0} movie={movie?.newFilm} />

        <LandingMovie Title={"Phim xem nhiều"} MarginTop={100} movie={movie?.mostViewFilm} />

        <LandingMovie Title={"Anime"} MarginTop={100} movie={movie?.animeFilm} />

        <LandingMovie Title={"TV Show"} MarginTop={100} movie={movie?.tvShowFilm} />

        <LandingMovie Title={"Phim sắp chiếu"} MarginTop={100} movie={movie?.upcomingFilm} />
      </div>
    </>
  )
}

export default App
