import React, { useState, useEffect } from 'react';
import { Row, Col, Dropdown, ListGroup, Spinner, Alert } from 'react-bootstrap';
import './index.css';

const _ = require('lodash');

const NewsCard = () => {
    // API key for the external API
    const apiKey = process.env.REACT_APP_NEWS_API_KEY

    // Variable states
    const categories = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"]
    const [category, setCategory] = useState('General')
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Function to fetch API
    async function fetchNewsAPI() {
        setLoading(true);
        setError(null);
        try {
            let response = await fetch("https://newsapi.org/v2/top-headlines?country=au&category=" + category + "&apiKey=" + apiKey)
            const data = await response.json()
            // select random 5 headlines to display
            setArticles(_.shuffle(data.articles).slice(0, 5))
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    // Updates the dropdown text to the filtered category
    function handleCategoryChange(evt, evtKey) {
        setCategory(evtKey.target.innerHTML)
    }

    useEffect(() => {
        fetchNewsAPI()
    }, [category]);

    // Opens the news page in a new browser tab
    const handleRedirect = (url) => {
        window.open(url, "_blank")
    }
    return (
        <div id='newsCard' className="widgetCard" >

            {/* Header row with the category filter dropdown */}
            <Row>
                <Col className="widgetHeader">News</Col>
            </Row>
            <Row>
                <Col style={{ textAlign: "right" }}>
                    <Dropdown align="end" onSelect={(evt, evtKey) => handleCategoryChange(evt, evtKey)}>
                        <Dropdown.Toggle id="dropdown-basic">
                            {category}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            {categories.map(category =>
                                <Dropdown.Item key={category} className="dropdown-item" >{category}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            {/* Error message */}
            {error && <Alert variant="danger">{error}</Alert>}
            {/* Loading indicator */}
            {loading && <Spinner animation="border" />}
            {/* List of news */}
            {!loading && !error &&
                <ListGroup >
                    {articles.map((article, index) =>
                        <ListGroup.Item className="newsItem" key={index} onClick={() => handleRedirect(article.url)} >
                            <Row>
                                <Col>
                                    <strong>{article.author}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {article.title}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            }

        </div>
    );
};

export default NewsCard;
