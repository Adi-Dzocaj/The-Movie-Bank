import axios from 'axios'    

const BASE_API_URL = 'https://api.themoviedb.org/3'
const API_key = `?api_key=${import.meta.env.VITE_REACT_APP_TMDB_API_KEY}`

const get = async (endpoint) => {
	const { data } = await axios.get(endpoint)
	console.log(data)
	return data.results;
}

// Get popular movies
const popularMovies = ({ queryKey }) => {
	const [_key, { page, popularityString}] = queryKey
	return get(`${BASE_API_URL}/discover/movie${API_key}&page=${page}&sort_by=popularity.${popularityString}`)
}

// Get latest movies
const TopRatedMovies = ({ queryKey }) => {
	const [_key, { page }] = queryKey
	return get(`${BASE_API_URL}/movie/top_rated${API_key}&page=${page}&sort_by=popularity`)
}

export default{
	popularMovies,
	TopRatedMovies,

}