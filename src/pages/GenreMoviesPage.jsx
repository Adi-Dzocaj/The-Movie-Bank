import TMDB_API from "../services/TMDB_API"
import { useQuery } from "react-query"
import { useSearchParams, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import MovieCards from "../components/MovieCards";

const GenreMoviesPage = () => {

	const [searchParams, setSearchParams] = useSearchParams({
		page: 1,
	});

	let { id, genre } = useParams()

	const pageParam = searchParams.get('page')

	const { isLoading, isError, error, data } = useQuery(['genreMovieList', { pageParam, id }], TMDB_API.getMoviesFromGenre)

	if (isLoading) {
		return <p className="mt-3 mb-3" style={{textAlign: 'center'}}>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	return (
		<div>
			<div style={{position: 'sticky', top: '0', zIndex: '50', backgroundColor: 'white'}}>
				<h1 className='mt-3 mb-3' style={{textAlign: "center"}}>{genre}</h1>
				<hr />
				<Pagination
				currentPage={pageParam}
				numPages={data.total_pages}
				goPrevPage={() => {
					setSearchParams({page: Number(pageParam) - 1 })
				}}
				goNextPage={() => {
					setSearchParams({page: Number(pageParam) + 1 })
				}}
				disabledBack={Number(pageParam) === 1}
				disabledFront={Number(pageParam) === data.total_pages}
				/>
			</div>
			<MovieCards data={data}/>
		</div>
	)
}

export default GenreMoviesPage