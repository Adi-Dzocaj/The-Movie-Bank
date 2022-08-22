import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Homepage';
import LatestMovies from './pages/LatestMovies';
import TopRatedMovies from './pages/TopRatedMovies';
import PopularMoviePage from './pages/PopularMoviePage';
import Navigation from './components/Navigation'
import MovieInformation from './pages/MovieInformation';

function App() {

	return (
	<>
	<Navigation/>
	<Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/latest_movies" element={<LatestMovies />} />
        <Route path="/popular_movies" element={<PopularMoviePage />} />
        <Route path="/top_rated_movies" element={<TopRatedMovies />} />
		<Route path="/movie/:id" element={<MovieInformation/>}/>
	</Routes>
	</>
	)
}

export default App
