import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap'
import heroImage from '../assets/images/movie-hero-img.jpg'


function Homepage() {
	return (
	<div>
		<div style={{height: '400px'}}>
			<img style={{height: '100%', width: '100%'}} src={heroImage} alt="Responsive img" />
		</div>
		<div style={{margin: '30px', borderBottom: '1px solid lightgray'}}>
			<p>The Movie Bank was made using the TMDB - API with the purpose of assisting you in your quest of finding out what movie you're going to watch next. </p>
			<p>Click on a movie that has caught your attention and get access additional information such as: the movie description, the fan-rating, the release-date, the actor involved; and much more! </p>
		</div>
		<div className="d-flex flex-column align-items-center">
			<h1 className="mt-3 mb-3">Sort by:</h1>
			<div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", margin: '20px'}}>
			<Link to='/popular_movies'>
				<Button style={{padding: '20px', width: '200px'}} variant="dark">Popularity</Button>
			</Link>
			<Link to='/latest_movies'>
				<Button style={{padding: '20px', width: '200px'}} variant="dark">Release date</Button>
			</Link>
			<Link to='/top_rated_movies'>
				<Button style={{padding: '20px', width: '200px'}} variant="dark">Rating</Button>
			</Link>
			<Link to='/movie/genres'>
				<Button style={{padding: '20px', width: '200px'}} variant="dark">Genre</Button>
			</Link>
			</div>
		</div>
	</div>
	)
}

export default Homepage