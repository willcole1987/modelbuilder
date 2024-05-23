import React, { useEffect } from 'react';
import Warper from './Warper';
import Popup from 'reactjs-popup';
import {Button,ButtonToolbar,Dropdown,Card, Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import {Form} from 'react-bootstrap';
import NodeInputScrollBox from './NodeInputScrollBox';
import axios from 'axios';
import { getSessionItem,setSessionItem } from '../helpers/sessionStorageHelpers';

const contentStyle = {
  maxWidth: '600px',
  width: '90%',
  height: '400p%',
};

const CustomModal = ({ defaultModel }) => {

    console.log("defaultModel in CustomModal")
    console.log(defaultModel)

  const RadioOptions = ["new node", "existing node"]
  const [nodeLevelText, setNodeLevelText] = useState("");
  const [parentNodeList, setParentNodeList] = useState([]);
  const [nodeList, setNodeList] = useState([]);
  const [radioOptionSelected, setRadioOptionSelected] = useState(0);
  const [selectedNode, setSelectedNode] = useState("");
  const [selectedParentNode, setSelectedParentNode] = useState("");

  const toggleRadioOptionSelected = () => {setRadioOptionSelected(radioOptionSelected === 0 ? 1 : 0)} 

  async function getNodesByLevel(level)
  {
                const url = 'https://localhost:7132/';
                //const requestHeader = {headers: {'Content-Type': 'application/json',},};
                //const requestBody = '{"level":"' + level + '"}'
               axios.get(`${url}nodes/${level}`) //,requestBody,requestHeader
                    .then(res => setNodeList(res.data))
                    .catch((err) => {return {status: err.response ? err.response.status : 0,data: {},error: err.message,}})
  }
  
  const getLocalModelParentNodes = (level) => {
    const SessionModel = getSessionItem("SESSIONMODEL") ?? defaultModel;
    const nodes = SessionModel.filter(x => x["Level"] === (level - 1))
                              .map(y => JSON.parse('{"id":"' + y["id"] + '","name":"' + y["name"] + '"}'))
    setParentNodeList(nodes)
  }

  useEffect(() => {
    const nodeLevels = {"":"1","Success Factor":"2","Signal":"3","Subsignal":"4"}
    const level = nodeLevels[nodeLevelText]
    getNodesByLevel(level);
    getLocalModelParentNodes(level);
  }, [nodeLevelText])

  return(
  <Popup
    trigger={
      <Button  variant="secondary" bssize="large" className="mr-10" style={{"marginLeft":"3px"}}>
          Add Node
      </Button>
    }
    modal
    contentStyle={contentStyle}
    nested
  >
    {<h2>Add Node</h2>}
    <Container>
    <Form.Label>Select Node Level</Form.Label>
    <Row>
        <Col>
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                select node level
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => {setNodeLevelText("Success Factor")}}>Success Factor</Dropdown.Item>
                <Dropdown.Item onClick={(e) => {setNodeLevelText("Signal")}}>Signal</Dropdown.Item>
                <Dropdown.Item onClick={(e) => {setNodeLevelText("Subsignal")}}>Subsignal</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </Col>
        <Col>
        <Form.Group className="mb-3">
            <Form.Control   placeholder="level" type="text" autoComplete="off" 
                            value={nodeLevelText} />
        </Form.Group>    
        </Col>
    </Row>
    <Row>
        <Col>
            <Card>
                {/*{*/}
                {/*    parentNodeList.length === 0 ?*/}
                {/*        <NodeInputScrollBox NodeSummary={["Select a node"]}*/}
                {/*                            ParentNodeSummary={["Select a parent node"]}*/}
                {/*                            selectedNode={selectedNode}*/}
                {/*                            selectedParentNode={selectedParentNode}*/}
                {/*                            radioButtons={RadioOptions} />*/}
                {/*    :*/}
                {/*    <NodeInputScrollBox NodeSummary={nodeList}*/}
                {/*                        ParentNodeSummary={parentNodeList}*/}
                {/*                        selectedNode={selectedNode}*/}
                {/*                        selectedParentNode={selectedParentNode}*/}
                {/*                        radioButtons={RadioOptions} />*/}

                {/*}*/}
                
            </Card>
        </Col>
    </Row>
    </Container>

  </Popup>);
};

export default CustomModal;