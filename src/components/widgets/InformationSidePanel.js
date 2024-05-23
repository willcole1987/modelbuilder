import { Card, Button } from 'react-bootstrap';
// NodeTitle, Parent, Weight, Wording
const InformationSidePanel = ({ NodeInformation }) =>
{
    return(
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{NodeInformation.NodeTitle}</Card.Title>
          <Card.Text>

          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
}

export default InformationSidePanel;