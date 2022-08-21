import { useState } from 'react'
import { useQuery } from 'react-query'
import TMDB_API from '../services/TMDB_API'
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const TopRatedMovies = () => {

	const [ page, setPage ] = useState(1)

	const { isLoading, isError, error, data } = useQuery(['TopRatedMovies', { page }], TMDB_API.TopRatedMovies)

	let UrlPrefixer = 'https://image.tmdb.org/t/p/w500'

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	return (
		<div>
			<h1 className='mt-3 mb-3' style={{textAlign: "center"}}>Top Rated Movies</h1>
			<div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px"}}>
				{data.map((film, i) => {
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

export default TopRatedMovies