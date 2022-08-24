import TMDB_API from "../services/TMDB_API"
import { useQuery } from "react-query"
import { Link, useSearchParams, useParams } from "react-router-dom";
import { Card } from 'react-bootstrap'
import Pagination from "../components/Pagination";

const GenreMoviesPage = () => {

	let UrlPrefixer = 'https://image.tmdb.org/t/p/w500'

	const [searchParams, setSearchParams] = useSearchParams({
		page: 1,
	});

	let { id, genre } = useParams()

	const pageParam = searchParams.get('page')

	const { isLoading, isError, error, data } = useQuery(['genreMovieList', { pageParam, id }], TMDB_API.getMoviesFromGenre)

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	console.log('data', data)

	return (
		<div>
			<h1 className='mt-3 mb-3' style={{textAlign: "center", position: 'sticky', top: '0'}}>{genre}</h1>
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
			<div className='d-flex'>
				<div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px"}}>
					{data.results.map((film, i) => {
						return (
						<Link style={{color: "white", textDecoration: "none"}} className='popularMovieCard' key={i} to={`/movie/${film.id}`}>
							<Card style={{width: 200, height: 250, backgroundColor: "black"}}>
								<Card.Img variant='top' style={{width: 200, height: 100}} src={UrlPrefixer.concat(film.poster_path)} alt=""/>
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

export default GenreMoviesPage