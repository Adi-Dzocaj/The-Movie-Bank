import TMDB_API from '../services/TMDB_API'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import './movieInformation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { useUrlPrefixerContext } from "../Contexts/UrlPrefixerContext";

const movieInformation = () => {

	const { UrlPrefixer } = useUrlPrefixerContext()
	
	const [ displayActors, setDisplayActors ] = useState(false)
	const [ displayProductionCompanies, setDisplayProductionCompanies ] = useState(false)

	const params = useParams()

	const id = Number(params.id) 

	const { isLoading, isError, error, data } = useQuery(['movieInfo', { id }], TMDB_API.movieInformation)

	if (isLoading) {
		return <p className="mt-3 mb-3" style={{textAlign: 'center'}}>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	console.log('dataTagline:', data.tagline)

	return (
		<div className='movieInformationContainer'>
			<div className='movieHero'>
				<img className='movieInformationImage' style={{maxHeight: '300px'}} src={UrlPrefixer.concat(data.poster_path)} alt="" />
				<div className='movieHeader'>
					<h2> <span style={{borderBottom: '1px solid lightgray', paddingBottom: '10px'}}>{data.original_title}</span> </h2>
					{/* Checking if the tagline is an empty string or not and rendering accordingly. */}
					{data.tagline.length === 0 ? <p style={{paddingTop: '10px'}}>No available tagline</p> : <p style={{paddingTop: '10px'}}>{data.tagline}</p>}
				</div>
			</div>
			<div className='movieBody'>
				<div>
					<p>{data.overview}</p>
				</div>

				<h2 style={{borderBottom: '1px solid lightgray', borderTop: '1px solid lightgray', padding: '10px', textAlign: 'center', marginBottom: '20px'}}>Explore</h2>
				
				<h2 className='exploreHeader'>Popularity: <p className='exploreData'>{data.popularity}</p> </h2>
				<h2 className='exploreHeader'>Release-date: <p className='exploreData'>{data.release_date}</p> </h2>
				<h2 className='exploreHeader'>Vote-average: <p className='exploreData'>{data.vote_average}</p> </h2>

				{/* If a collection exists, print out the collection */}
				{data.belongs_to_collection &&
					<h2 className='exploreHeader'>Collection: <p className='exploreData'>{data.belongs_to_collection.name}</p></h2>
				}

				<div>
					<h2 className='exploreHeader'>{data.genres.length > 1 ? 'Genres' : 'Genre'}: {data.genres.map((genre, i) => {
						return (
							// CLARIFICATION - if there are more than one genre, conditionally render a ',' divider on all elements but the last one.
							<Link style={{fontWeight: 'initial'}} className='genreLink' to='/' key={i}>{genre.name}{i + 1 === data.genres.length ? '' : ','} </Link>
						)
					})}</h2>
				</div>

				<div className='informationDropDownMenu' onClick={() => {
					setDisplayActors(!displayActors)
				}}>
					<h2 className='exploreHeader' style={{marginBottom: '0'}}> <span style={{borderBottom: displayActors ? '1px solid lightgray' : 'none'}}>Cast</span></h2>
					{displayActors ? <FontAwesomeIcon size='xs' className='arrowDown' style={{paddingLeft: '5px'}} icon={faAngleUp}/> : <FontAwesomeIcon size='xs' style={{paddingLeft: '5px'}} icon={faAngleDown}/>}
				</div>

				<div className={displayActors ? 'd-block ' : 'd-none'}>
					{data.credits.cast.map((actor, i) => {
						return (

							<div key={i}>
								<Link className='actorLink' to={`/person/${actor.id}`}>{actor.name}</Link>
								<p style={{color: 'red', display: 'inline'}}> as</p>
								<p style={{display: 'inline'}}> {actor.character}</p>
							</div>
						)
					})}
				</div>

				<div className='informationDropDownMenu' onClick={() => {
					setDisplayProductionCompanies(!displayProductionCompanies)
				}}>
					<h2 style={{marginBottom: '0'}} className='exploreHeader'><span style={{borderBottom: displayProductionCompanies ? '1px solid lightgray' : 'none'}}>Production</span></h2>
					{displayProductionCompanies ? <FontAwesomeIcon size='xs' style={{paddingLeft: '5px'}} icon={faAngleUp}/> : <FontAwesomeIcon size='xs' style={{paddingLeft: '5px'}} icon={faAngleDown}/>}
				</div>

				<div className={displayProductionCompanies ? 'd-block ' : 'd-none'}>
					{data.production_companies.map((PC, i) => {
						return (
							<div key={i}>
								<p>{PC.name}</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default movieInformation