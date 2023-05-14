import './MoreNews.css'
import { Card, Button } from 'react-bootstrap';


const MoreNews = ({title, urlToImage, url}) => {
    return (
        <Card className="bg-dark cardMore dark"style={{ width: '18rem' }}>
            <Card.Img variant="top" src={urlToImage} />
            <Card.Body className="cardMoreBody ">
                <Card.Title>{title}</Card.Title>
                <Button className="cardMoreButton" variant="light" onClick={() => { window.open(url, "_blank"); }}>Read More...</Button>
            </Card.Body>
        </Card> 
    );
}

export default MoreNews;