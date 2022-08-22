import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import TMDB_API from '../services/TMDB_API'
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap'
import Pagination from '../components/Pagination'

const Films = () => {

	let [ page, setPage ] = useState(1)
	let [ popularity, setPopularity ] = useState(true)
	let [ popularityString, setPopularityString ] = useState('desc')

	const { isLoading, isError, error, data } = useQuery(['popularMovies', { page, popularityString }], TMDB_API.popularMovies)

	let UrlPrefixer = 'https://image.tmdb.org/t/p/w500'

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	return (
		<div>
			<div className='pt-3' style={{backgroundColor: 'white', position: 'sticky', top: '0', zIndex: '50'}}>
				<h1 className='mb-3' style={{textAlign: "center"}}>Movies Based On Popularity</h1>
				<hr />
				<div className='d-flex justify-content-center' style={{padding: '10px'}}>
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
				currentPage={page}
				numPages={data.total_pages}
				goPrevPage={() => {page - 1 > 0 ? setPage(page - 1) : setPage(page)}}
				goNextPage={() => {page + 1 > data.total_pages ? setPage(page) : setPage(page + 1)}}
				/>

			</div>
			<div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px"}}>
				{data.results.map((film, i) => {
					return (
					<Link style={{color: "white", textDecoration: "none"}} key={i} to="/">
						<Card style={{width: 200, height: 250, backgroundColor: "black"}}>
						<Card.Img variant='top' style={{width: 200, height: 100}} src={UrlPrefixer.concat(film.poster_path)} alt=""/>
						<Card.Body>
							<Card.Title style={{height: "70px", textAlign: "center"}}>{film.title}</Card.Title>
						</Card.Body>
						</Card>
					</Link>
					)
				})}
			</div>
		</div>
	)
}

export default Films