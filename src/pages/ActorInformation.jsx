import TMDB_API from '../services/TMDB_API'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import './movieInformation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

const actorInformation = () => {

	let UrlPrefixer = 'https://image.tmdb.org/t/p/w500'

	let { id } = useParams()

	console.log('id', id)
	
	const [ displayActors, setDisplayActors ] = useState(false)
	const [ displayProductionCompanies, setDisplayProductionCompanies ] = useState(false)

	const { isLoading, isError, error, data } = useQuery(['actorInfo', { id }], TMDB_API.getActor)

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	console.log('person:', data)

	return (
		<div className='movieInformationContainer'>
            <div className='movieHero'>
                <img className='movieInformationImage' style={{maxHeight: '300px'}} src={UrlPrefixer.concat(data.profile_path)} alt="" />
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
            </div>
		</div>
	)
}

export default actorInformation