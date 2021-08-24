import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

export default function MyProfile() {
    return (
        <div>
        
            <Card className="center" style={{ width: '30rem',margin:'auto', marginTop:"8%" }}>
                <Card.Img variant="top" src="https://www.countrys.co.il/wp-content/uploads/2019/05/50036231_2783372865221277_3168270556759851008_o-1024x768.jpg" />
                <Card.Body>
                    <Card.Title>Yoni</Card.Title>
                    <Card.Text>
                        אני יוני ואני מתאמן כבר 3 שנים , נהנה מאוד ושמח להתאמן :)
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>מקצועי</ListGroupItem>
                    <ListGroupItem>בכושר -8 מתוך 10</ListGroupItem>
                </ListGroup>

            </Card>
        </div>
    )
}