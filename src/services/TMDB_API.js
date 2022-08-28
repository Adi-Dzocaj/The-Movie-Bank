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
	return get(`${BASE_API_URL}/discover/movie${API_key}&page=${pageParam}&sort_by=popularity.${popularityString}&include_adult=false`)
}

// Get top rated movies
const topRatedMovies = ({ queryKey }) => {
	const [_key, { pageParam }] = queryKey
	return get(`${BASE_API_URL}/movie/top_rated${API_key}&page=${pageParam}&include_adult=false`)
}

// Get latest movies
const latestMovies = ({ queryKey }) => {
	const [_key, { pageParam }] = queryKey
	return get(`${BASE_API_URL}/movie/now_playing${API_key}&page=${pageParam}&sort_by=release_date.desc&include_adult=false`)
}

// Get the specific movie information
const movieInformation = ({ queryKey }) => {
		const [_key, { id }] = queryKey
		return get(`${BASE_API_URL}/movie/${id}${API_key}&append_to_response=credits&include_adult=false`)
}

// Get all genres
const getGenres = ({ queryKey }) => {
	const [_key ] = queryKey
	return get(`${BASE_API_URL}/genre/movie/list${API_key}`)
}

// Get all genre specific movies
const getMoviesFromGenre = ({ queryKey }) => {
	const [_key, { pageParam, id}] = queryKey
	return get(`${BASE_API_URL}/discover/movie${API_key}&with_genres=${id}&page=${pageParam}&include_adult=false`)
}

// Get actor information
const getActor = ({ queryKey }) => {
	const [_key, { id }] = queryKey
	return get(`${BASE_API_URL}/person/${id}${API_key}&append_to_response=combined_credits`)
}

export default{
	popularMovies,
	topRatedMovies,
	latestMovies,
	movieInformation,
	getGenres,
	getMoviesFromGenre,
	getActor
}