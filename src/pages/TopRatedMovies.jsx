import { useQuery } from 'react-query'
import TMDB_API from '../services/TMDB_API'
import { useSearchParams } from "react-router-dom";
import Pagination from '../components/Pagination'
import './PageStyling/TopRatedMoviesStyling.css'
import MovieCards from '../components/MovieCards';

const TopRatedMovies = () => {

	const [searchParams, setSearchParams] = useSearchParams({
		page: 1,
	});

	const pageParam = searchParams.get('page')

	const { isLoading, isError, error, data } = useQuery(['TopRatedMovies', { pageParam }], TMDB_API.topRatedMovies)

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	return (
		<div>
			<div style={{position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '50'}}>
				<h1 className='mt-3 mb-3' style={{textAlign: "center", position: 'sticky', top: '0'}}>Top Rated Movies</h1>
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

export default TopRatedMovies