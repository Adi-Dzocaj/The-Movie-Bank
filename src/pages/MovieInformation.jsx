import TMDB_API from '../services/TMDB_API'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

const movieInformation = () => {

	let UrlPrefixer = 'https://image.tmdb.org/t/p/w500'
	
	const params = useParams()

	const id = Number(params.id) 

	const { isLoading, isError, error, data } = useQuery(['movieInfo', { id }], TMDB_API.movieInformation)

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return alert(error.message)
	}

	return (
		<div>
			<div style={{height: '400px'}}>
				<img style={{height: '100%', width: '100%'}} src={UrlPrefixer.concat(data.poster_path)} alt="Responsive img" />
			</div>
			<div style={{margin: '30px', gap: '25px'}} className='d-flex flex-column'>
				<div>
					<h2> <span style={{borderBottom: '1px solid lightgray', padding: '10px'}}>{data.original_title}</span> </h2>
				</div>
				<div>
					{/* Don't know why but this paragraph had a default margin-bottom for some reason, so i removed it */}
					<p style={{marginBottom: 0}}>"{data.tagline}"</p>
				</div>
				<div>
					<p>{data.overview}</p>
				</div>
			</div>
		</div>
	)
}

export default movieInformation