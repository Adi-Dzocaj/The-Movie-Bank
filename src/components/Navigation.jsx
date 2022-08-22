import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import './ComponentStyling/Navigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navigation = () => {
	return (
		<Navbar className='d-flex justify-content-center' bg="dark" variant="dark" expand="md">
			<div className='d-flex justify-content-between navbarContainer'>
				<Navbar.Brand as={Link} to="/">The Movie Bank</Navbar.Brand>

				<Dropdown>
					<Dropdown.Toggle variant="dark" id="dropdown-basic">
						<FontAwesomeIcon icon={faBars} />
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item as={Link} to='/latest_movies'>Senaste</Dropdown.Item>
						<Dropdown.Item as={Link} to='/popular_movies'>Populära</Dropdown.Item>
						<Dropdown.Item as={Link} to='/top_rated_movies'>Topplistade</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item as={Link} to='/'>Genre</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</Navbar>
	)
}

export default Navigation