import './App.css'
import HeroBanner from '../../component/hero-banner/HeroBanner'
import LandingMovie from '../../component/landing-movie/LandingMovie';
function App() {
  return (
    <>
      <HeroBanner />
      <div className="landingMovie">
        <LandingMovie Title={"Phim mới"} MarginTop={0} />

        <LandingMovie Title={"Phim xem nhiều"} MarginTop={100} />

        <LandingMovie Title={"Anime"} MarginTop={100} />

        <LandingMovie Title={"TV Show"} MarginTop={100} />

        <LandingMovie Title={"Phim sắp chiếu"} MarginTop={100} />
      </div>
    </>
  )
}

export default App
