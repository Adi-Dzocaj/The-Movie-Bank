import { useEffect } from "react"
import TMDB_API from "../services/TMDB_API"
import { useQuery } from "react-query"

const GenrePage = () => {

	const { isLoading, isError, error, data } = useQuery(['GenreList'], TMDB_API.getGenres)

	useEffect(() => {
		console.log(data)
	}, [])
	return (
		<div>GenrePage</div>
	)
}

export default GenrePage