import Card from 'react-bootstrap/Card';

const Node = ({Key, Name, Height}) => {
    return (<Card key={Key} style={{ "height": (Height * 5).toString() + "rem"   }}>
              <Card.Body>
                <Card.Text>{Name}</Card.Text>
              </Card.Body>
          </Card>);
}

export default Node;