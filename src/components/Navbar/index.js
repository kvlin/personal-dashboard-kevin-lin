import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function CollapsibleExample() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">MyDashboardX</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="https://www.accuweather.com/en/world-weather">AccuWeather</Nav.Link>
                    <Nav.Link href="https://www.news.com.au/">Australian News</Nav.Link>
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    );
}

export default CollapsibleExample;