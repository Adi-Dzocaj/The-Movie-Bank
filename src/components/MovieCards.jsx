import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useUrlPrefixerContext } from "../Contexts/UrlPrefixerContext";

const MovieCards = ({ data }) => {

	const { UrlPrefixer } = useUrlPrefixerContext()
	
	return (
		<div>
			<div className='d-flex mb-3'>
				<div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px"}}>
					{data.results.map((film, i) => {
						return (
						<Link style={{color: "white", textDecoration: "none", flex: '1 1 20%'}} className='popularMovieCard' key={i} to={`/movie/${film.id}`}>
							<Card style={{height: '100%', backgroundColor: "black"}}>
								<Card.Img variant='top' style={{ height: '70%', objectFit: 'cover'}} src={UrlPrefixer.concat(film.poster_path)} alt=""/>
								<Card.Body>
									<Card.Title style={{height: "70px", textAlign: "center"}}>{film.title}</Card.Title>
									<Card.Footer>Score: {film.vote_average}</Card.Footer>
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

export default MovieCards