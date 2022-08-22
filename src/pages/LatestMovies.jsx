import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import TMDB_API from '../services/TMDB_API'
import Card from 'react-bootstrap/Card';
import { Link, useSearchParams } from "react-router-dom";
import Pagination from '../components/Pagination'
import './TopRatedMoviesStyling.css'

const latestMovies = () => {

	const [searchParams, setSearchParams] = useSearchParams({
		page: 1,
	});

	const pageParam = searchParams.get('page')

	const { isLoading, isError, error, data } = useQuery(['latestMovies', { pageParam }], TMDB_API.latestMovies)

	let UrlPrefixer = 'https://image.tmdb.org/t/p/w500'

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	return (
		<div>
			<div style={{position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '50'}}>
				<h1 className='mt-3 mb-3' style={{textAlign: "center", position: 'sticky', top: '0'}}>Latest Movies</h1>
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
			<div className='d-flex'>
				<div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px"}}>
					{data.results.map((film, i) => {
						return (
						<Link style={{color: "white", textDecoration: "none"}} className='popularMovieCard' key={i} to={`/movie/${film.id}`}>
							<Card style={{width: 200, height: 250, backgroundColor: "black"}}>
							<Card.Img variant='top' style={{width: 200, height: 100}} src={UrlPrefixer.concat(film.poster_path)} alt=""/>
							<Card.Body>
								<Card.Title style={{height: "70px", textAlign: "center"}}>{film.title}</Card.Title>
								<Card.Text style={{fontSize: '12px'}}>Release date: {film.release_date}</Card.Text>
							</Card.Body>
							</Card>
						</Link>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default latestMovies