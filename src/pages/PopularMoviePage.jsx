import { useQuery } from 'react-query'
import TMDB_API from '../services/TMDB_API'
import { useSearchParams } from "react-router-dom";
import Pagination from '../components/Pagination'
import MovieCards from '../components/MovieCards';

const PopularMoviePage = () => {

	const [searchParams, setSearchParams] = useSearchParams({
		page: 1,
	});

	const pageParam = searchParams.get('page')

	const { isLoading, isError, error, data } = useQuery(['popularMovies', { pageParam }], TMDB_API.popularMovies, {keepPreviousData: true})

	if (isLoading) {
		return <p className="mt-3 mb-3" style={{textAlign: 'center'}}>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	return (
		<div>
			<h1 className='pt-3 pb-3' style={{textAlign: "center", borderBottom: '1px solid lightgray'}}>Movies Based On Popularity</h1>
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
			<MovieCards data={data}/>
		</div>
	)
}

export default PopularMoviePage