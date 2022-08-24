import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import TMDB_API from '../services/TMDB_API'
import { useSearchParams } from "react-router-dom";
import { Button } from 'react-bootstrap'
import Pagination from '../components/Pagination'
import MovieCards from '../components/MovieCards';

const PopularMoviePage = () => {

	let [ popularity, setPopularity ] = useState(true)
	let [ popularityString, setPopularityString ] = useState('desc')

	const [searchParams, setSearchParams] = useSearchParams({
		page: 1,
	});

	const pageParam = searchParams.get('page')

	const { isLoading, isError, error, data } = useQuery(['popularMovies', { pageParam, popularityString }], TMDB_API.popularMovies)

	if (isLoading) {
		return <p className="mt-3 mb-3" style={{textAlign: 'center'}}>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	return (
		<div>
			<h1 className='pt-3 pb-3' style={{textAlign: "center", borderBottom: '1px solid lightgray'}}>Movies Based On Popularity</h1>
			<div style={{backgroundColor: 'white', position: 'sticky', top: '0', zIndex: '50'}}>
				<div className='d-flex justify-content-center' style={{padding: '10px', borderBottom: '1px solid lightgray'}}>
					<Button onClick={() => {
						setPopularityString('asc') 
						setPopularity(false)
						}} style={{textAlign: "center", backgroundColor: popularity ? 'white' : 'black', color: popularity ? 'black' : 'white', border: 'none'}} className='popularityButton me-3'>
						<h3>Least popular</h3>
					</Button>
					<Button onClick={() => {
						setPopularityString('desc')
						setPopularity(true)
						}} style={{textAlign: "center", backgroundColor: popularity ? 'black' : 'white', color: popularity ? 'white' : 'black', border: 'none'}} className='popularityButton ' >
						<h3>Most popular</h3>
					</Button>
				</div>

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

export default PopularMoviePage