import TMDB_API from '../services/TMDB_API'
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from 'react-query'
import './PageStyling/movieInformation.css'
import { useUrlPrefixerContext } from '../Contexts/UrlPrefixerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

const actorInformation = () => {

	const { UrlPrefixer } = useUrlPrefixerContext()

	let { id } = useParams()

	const [ displayMovies, setDisplayMovies ] = useState(false)

	const { isLoading, isError, error, data } = useQuery(['actorInfo', { id }], TMDB_API.getActor)

	if (isLoading) {
		return <p className="mt-3 mb-3" style={{textAlign: 'center'}}>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	return (
		<div className='movieInformationContainer'>
            <div className='movieHero'>
                <img className='movieInformationImage' src={UrlPrefixer.concat(data.profile_path)} alt="" />
                <div className='movieHeader'>
                    <h2> <span style={{borderBottom: '1px solid lightgray', paddingBottom: '10px'}}>{data.name}</span> </h2>
                    <p style={{paddingTop: '10px'}}>{data.place_of_birth}</p>
                </div>
            </div>
            <div className='movieBody'>
				<h2 style={{borderBottom: '1px solid lightgray', borderTop: '1px solid lightgray', padding: '10px', textAlign: 'center', marginBottom: '20px'}}>Biography</h2>
                <div>
					{data.biography === '' ? <p>No available biography.</p> : <p>{data.biography}</p>}
                </div>

				<div className='informationDropDownMenu' onClick={() => {
					setDisplayMovies(!displayMovies)
				}}>
					<h2 className='exploreHeader' style={{marginBottom: '0'}}> <span style={{borderBottom: displayMovies ? '1px solid lightgray' : 'none'}}>Movie presence</span></h2>
					{displayMovies ? <FontAwesomeIcon size='xs' className='arrowDown' style={{paddingLeft: '5px'}} icon={faAngleUp}/> : <FontAwesomeIcon size='xs' style={{paddingLeft: '5px'}} icon={faAngleDown}/>}
				</div>

				<div className={displayMovies ? 'd-block ' : 'd-none'}>
					{data.combined_credits.cast.map((movie, i) => {
						return (
							<div key={i}>
							<Link className='blackLink' to={`/movie/${movie.id}`}>{movie.original_title} </Link>
							</div>
						)
					})}
				</div>
            </div>
		</div>
	)
}

export default actorInformation