import axios from 'axios'    

const BASE_API_URL = 'https://api.themoviedb.org/3'
const API_key = `?api_key=${import.meta.env.VITE_REACT_APP_TMDB_API_KEY}`

const get = async (endpoint) => {
	const { data } = await axios.get(endpoint)
	console.log(data)
	return data;
}

// Get popular movies
const popularMovies = ({ queryKey }) => {
	const [_key, { pageParam, popularityString}] = queryKey
	return get(`${BASE_API_URL}/discover/movie${API_key}&page=${pageParam}&sort_by=popularity.${popularityString}`)
}

// Get top rated movies
const topRatedMovies = ({ queryKey }) => {
	const [_key, { pageParam }] = queryKey
	return get(`${BASE_API_URL}/movie/top_rated${API_key}&page=${pageParam}`)
}

// Get latest movies
const latestMovies = ({ queryKey }) => {
	const [_key, { pageParam }] = queryKey
	return get(`${BASE_API_URL}/movie/now_playing${API_key}&page=${pageParam}&sort_by=release_date.desc`)
}

const movieInformation = ({ queryKey }) => {
		const [_key, { id }] = queryKey
		return get(`${BASE_API_URL}/movie/${id}${API_key}&append_to_response=credits`)
}

export default{
	popularMovies,
	topRatedMovies,
	latestMovies,
	movieInformation
}