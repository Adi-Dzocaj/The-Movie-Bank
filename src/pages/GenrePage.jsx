import TMDB_API from "../services/TMDB_API"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { Card } from 'react-bootstrap'
import './PageStyling/GenrePageStyling.css'

const GenrePage = () => {

	const { isLoading, isError, error, data } = useQuery(['GenreList'], TMDB_API.getGenres)

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	console.log(data)

	return (
		<div>
			<h1 style={{textAlign: 'center', borderBottom: '1px solid lightgray', margin: '20px', paddingBottom: '10px'}}>Genres</h1>
			<div className="genresContainer">
				{data.genres.map((genre, i) => {
					return (
					<Link className='genreCard' key={i} to={`/movies/${genre.name}/${genre.id}`}>
						<Card style={{width: '100%', height: 150, backgroundColor: "black"}}>
							<Card.Body className="d-flex justify-content-center align-items-center">
								<Card.Title >{genre.name}</Card.Title>
							</Card.Body>
						</Card>
					</Link>
					)
				})}
			</div>
		</div>
	)
}

export default GenrePage