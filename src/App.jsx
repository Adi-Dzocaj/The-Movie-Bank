import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Homepage';
import PopularMoviePage from './pages/PopularMoviePage';
import Navigation from './components/Navigation'

function App() {

	return (
	<>
	<Navigation/>
	<Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/popularmovies" element={<PopularMoviePage />} />
	</Routes>
	</>
	)
}

export default App
