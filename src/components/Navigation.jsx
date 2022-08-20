import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import './ComponentStyling/Navigation.css'

const Navigation = () => {
	return (
		<Navbar className='d-flex justify-content-center' bg="dark" variant="dark" expand="md">
			<div className='d-flex justify-content-between' style={{width: "60%"}}>
				<Navbar.Brand as={Link} to="/">Home</Navbar.Brand>

				<Dropdown>
					<Dropdown.Toggle variant="dark" id="dropdown-basic">
						Menu
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item as={Link} to='/'>Senaste</Dropdown.Item>
						<Dropdown.Item as={Link} to='/popularmovies'>Populära</Dropdown.Item>
						<Dropdown.Item as={Link} to='/'>Topplistade</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item as={Link} to='/'>Genre</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</Navbar>
	)
}

export default Navigation