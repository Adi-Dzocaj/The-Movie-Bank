import Button from 'react-bootstrap/Button'

const Pagination = ( {currentPage, numPages, goPrevPage, goNextPage }) => {
	return (
		<div className='d-flex justify-content-center align-items-center mt-3 mb-2' style={{gap: '10px', position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '50', paddingBottom: '10px'}}>
			<Button variant='dark' 
			onClick={goPrevPage}
			>
				Back
			</Button>

			<div> 
				{currentPage} / {numPages}
				</div>
			<Button variant='dark' 
			onClick={goNextPage}
			>
				Forward
			</Button>
		</div>
	)
}

export default Pagination