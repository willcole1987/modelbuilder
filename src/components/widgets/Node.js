import Card from 'react-bootstrap/Card';

const Node = ({Key, NodeStructureId, NodeId, Name, Height, handleGetNodeInformation}) => 
{
  // TODO -  Node to be passed down as packet of information for flexible setup
    return (<Card key={Key} style={{ "height": (Height * 5).toString() + "rem"   }}>
              <Card.Body onClick={() => handleGetNodeInformation(NodeStructureId, NodeId)}>
                <Card.Text>{Name}</Card.Text>
              </Card.Body>
          </Card>);
}

export default Node;