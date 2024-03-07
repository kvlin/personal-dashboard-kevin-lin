import './App.css';
import Navbar from './components/Navbar'
import WeatherCard from './components/WeatherCard';
import NewsCard from './components/NewsCard';
import TasksCard from './components/TasksCard';
import { Container, Row, Col } from 'react-bootstrap';
import greetingTime from 'greeting-time'


function App() {

  return (
    <div className="App">
      <Navbar />
      <Container gy-5>
        <Row>
          <Col style={{ margin: "2rem" }}><h1>{greetingTime(new Date())}!</h1></Col>
        </Row>
        <Row>
          <Col lg={6} >
            <WeatherCard />
            <NewsCard />
          </Col>
          <Col lg={6} >
            <TasksCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
