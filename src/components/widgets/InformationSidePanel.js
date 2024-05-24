import { Card, Button } from 'react-bootstrap';
// NodeTitle, Parent, Weight, Wording
const InformationSidePanel = ({ NodeInformation }) =>
{
    return (
      <Card style={{ width: '18rem', height: '40rem', borderWidth:'2px', borderColor:'Black'}}>
        <Card.Body>
        {NodeInformation.NodeStructureId === 0 ?
          <>
          {/* <Card.Title>{"NODE DATA"}</Card.Title> */}
            <Card.Text>{"Select a node from the imported model to view information"}</Card.Text>
          </>
          :
          <>
            <Card.Title>{NodeInformation.NodeName}</Card.Title>
            <Card.Text>
              <br></br>
              <p>Parent: {NodeInformation.ParentNodeName}</p>
              <br></br>
              <p>Wording: {JSON.stringify(NodeInformation.NodeWording).substring(1, 20)}
                <a href="#wording"> [...wording]</a></p>
              <p>Weight Multiplier: {NodeInformation.NodeWeight}</p>
            </Card.Text>
            </>
        }
          </Card.Body>
      </Card>
    );
}

export default InformationSidePanel;