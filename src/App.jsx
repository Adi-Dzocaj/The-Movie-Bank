import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Homepage';
import LatestMovies from './pages/LatestMovies';
import TopRatedMovies from './pages/TopRatedMovies';
import PopularMoviePage from './pages/PopularMoviePage';
import Navigation from './components/Navigation'
import MovieInformation from './pages/MovieInformation';
import GenrePage from './pages/GenrePage';
import GenreMoviesPage from './pages/GenreMoviesPage';
import ActorInformation from './pages/ActorInformation'
import Footer from './components/Footer';

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
			<Route path="/movie/genres" element={<GenrePage/>}/>
			<Route path="/movies/:genre/:id" element={<GenreMoviesPage/>}/>
			<Route path="/person/:id" element={<ActorInformation/>}/>
		</Routes>
		<Footer/>
	</>
	)
}

export default App
