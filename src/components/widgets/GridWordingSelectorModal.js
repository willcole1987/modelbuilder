// import { useState, useReducer } from 'react';
import { useState, useReducer } from 'react';
import FilterListReducer from '../reducers/FilterListReducer';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import  ScrollBox  from './ScrollBox';

const GridWordingSelectorModal = ({title, nodelist, handleClose }) => {

  const defaultNodes = [{Id: null, Level: null, Name: null},
                        {Id: null, Level: null, Name: null},
                        {Id: null, Level: null, Name: null}];
  
  const defaultNodeTexts = ["","",""];
  const [nodeTextArray, setNodeTextArray] = useState(defaultNodeTexts);
  const [disabledInputs, setDisabledInputs] = useState(true);
  const [activeOrder, setActiveOrder] = useState(0);
  const baseNodesList = nodelist;
  
  const [nodes, setNodes] = useState(defaultNodes);
  const [filterList, dispatch] =  useReducer(FilterListReducer, nodelist);

  const updateNodes = (index, newNode) => { const updatedNodes = nodes.map((i, idx) => (idx === index ? newNode : i ));  
                                            setNodes(updatedNodes);
                                          };
  const updateNodeTextArray  = (index, newInput)  => { setNodeTextArray(nodeTextArray.map((i, idx) => (idx === index ? newInput : i )))};
  const resolveExcludedNode = (node) => (node === 1 ? nodes[2] : (node === 2  ? nodes[1] : {}));
  
  const selectGridNode = (nodeId)  => 
  {
    if(activeOrder === 0) { setDisabledInputs(false); } 
    const selectedNode =  baseNodesList.filter(i =>  i["Id"] === nodeId)[0];
    updateNodes(activeOrder,selectedNode);
  }

  const updateInput = (nodeOrder, text) => 
  {
    const excludedNode = resolveExcludedNode(nodeOrder);
    updateNodeTextArray(nodeOrder,text)
    dispatch({type:'update',list:baseNodesList,node: nodeOrder,text: text, excludedNode: excludedNode});
  }

  const resetNodeInput = (nodeOrder) => 
  {
    setActiveOrder(nodeOrder);
    updateNodes(nodeOrder,{Id: null, Level: null, Name: null});
    updateNodeTextArray(nodeOrder,"");
    const excludedNode = resolveExcludedNode(nodeOrder);
    dispatch({type:'reset', node:nodeOrder, list: baseNodesList, excludedNode: excludedNode});
    if(nodeOrder === 0) { 
      setNodes(defaultNodes); 
      setNodeTextArray(defaultNodeTexts);
      setDisabledInputs(true);
    }
  }

  return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Col>
          <Row>
                1. Select signal parent from the options below:
                <input type="text" 
                       value={nodes[0]["Name"] ?? nodeTextArray[0]}
                       onClick={() => {resetNodeInput(0);}} 
                       onChange={ (e) => {updateInput(0, e.target.value);}} />
                <p>Status: {nodes[0]["Name"] === null  ? "none selected" : "signal selected" }</p>
                       <hr/>
          </Row>
          <Row>
                2. Select subignal 1 from the options below:
                <input disabled={disabledInputs} 
                       type="text" 
                       value={nodes[1]["Name"] ?? nodeTextArray[1]}
                       onClick={() => {resetNodeInput(1)}} 
                       onChange={ (e) => {updateInput(1, e.target.value);}} />
                <p>Status: {nodes[1]["Name"] === null  ? "none selected" : "subsignal selected" }</p>
                       <hr/>
          </Row>
          <Row>
                3. Select subignal 2 from the options below:
                <input disabled={disabledInputs}
                       type="text" 
                       value={nodes[2]["Name"] ?? nodeTextArray[2]}
                       onClick={() => {resetNodeInput(2);}} 
                       onChange={ (e) => {updateInput(2, e.target.value);}} />
                <p>Status: {nodes[2]["Name"] === null  ? "none selected" : "subsignal selected" }</p>
            <hr/>
          </Row>
        </Col>
        <Col>
            <ScrollBox optionsList={filterList} selectItem={selectGridNode} />
        </Col>
        </Modal.Body>
        <Button onClick={() => handleClose(nodes[0], nodes[1], nodes[2])}>
          Ok
        </Button>
      </Modal.Dialog>
  );
}

export default GridWordingSelectorModal;