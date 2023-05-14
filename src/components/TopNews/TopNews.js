import "./TopNews.css";
import { useEffect, useState } from "react";
import MoreNews from '../MoreNews/MoreNews.js';
import { Carousel, Card, Button } from 'react-bootstrap';

const TopNews = () => {

    const [length, setLength] = useState(0);
    const [news, setNews] = useState([0, 0, 0]);
    const [moreNews, setMoreNews] = useState([0]);

    const getNews = async () => {
        const response = await fetch ('https://gnews.io/api/v4/top-headlines?&lan=en&country=us&token=' + process.env.REACT_APP_API_KEY_NEWS);
        const result = await response.json();

        for (let i = 0; i < result.articles.length; i++) {
            if (result.articles[i].urlToImage === null)
                result.articles.splice(i, 1);
        }

        result.articles.splice(result.articles.length - 1, 1);

        let moreNews = result.articles.splice(3, result.articles.length);
        let news = result.articles

        setLength(result.articles.length);
        setNews(news);
        setMoreNews(moreNews);
    }

    useEffect(() => getNews, []);

    return (
        <div className="news">
            <Card.Header className="text-center">Trending News</Card.Header>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="news-img d-block w-100"
                        src={news[0].image}
                        alt="First slide"
                    />
                    <Carousel.Caption className="background">
                        <h3>{news[0].title}</h3>
                        <p>{news[0].description}</p>
                        <Button className="button" variant="light" onClick={() => { window.open(news[0].url, "_blank"); }}>Read more...</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="news-img d-block w-100"
                        src={news[1].image}
                        alt="Second slide"
                    />

                    <Carousel.Caption className="background">
                        <h3>{news[1].title}</h3>
                        <p>{news[1].description}</p>
                        <Button className="button" variant="light" onClick={() => { window.open(news[1].url, "_blank"); }}>Read more...</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="news-img d-block w-100"
                        src={news[2].image}
                        alt="Third slide"
                    />

                    <Carousel.Caption className="background">
                        <h3>{news[2].title}</h3>
                        <p>{news[2].description}</p>
                        <Button className="button" variant="light" onClick={() => { window.open(news[2].url, "_blank"); }}>Read more...</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Card.Header className=" moreNewsBar text-center">More News</Card.Header>
            <div className="cardsContainer">
                {
                    moreNews.map((story, index) => {
                        return (
                            <MoreNews key={index} title={story.title} urlToImage={story.image} url={story.url} />
                        );
                    })
                }
            </div>
        </div>

    );

}

export default TopNews;