import { useState } from 'react';
import {  Row, Col } from 'react-bootstrap';  
import  ScrollBox  from './ScrollBox';

const GridWordingSelectionBox = ({nodeList, handleNodeSelection}) => {
  
  const [baseList, setBaseList] = useState(nodeList);
  const [filtered, setFiltered] = useState(nodeList);
  const handleSelectionClick = (id) => { 
      handleNodeSelection(id)
    };

  const filterOptions = (text) => 
  { 
      setFiltered(baseList.filter(x => x["Name"].toLowerCase().includes((text).toLowerCase())))
  }

  return (
    <>
      <Col>
        <input type="text" onChange={ (e) => filterOptions(e.target.value)} />
      </Col>
      <Col>
        <ScrollBox optionsList={filtered} selectItem={handleSelectionClick} />
      </Col>
    </>
  );
}

export default GridWordingSelectionBox;