import {Row, Col, Container, Table,ButtonGroup, Button, Modal} from "react-bootstrap"
import GridWordingSelectorModal from "../widgets/GridWordingSelectorModal";
import {createGridObject, specialGridEdit, copyForExcel} from '../helpers/helpers';
import { useModel } from "../../contexts/ModelProvider"
import {useEffect, useState } from "react";
import GridTable from "../widgets/GridTable";

export const NodeWordingDouble = () => {

     const modelLogic = useModel();

     const [selectedSignal,     setSelectedSignal] = useState({});
     const [selectedChildNode1, setSelectedChildNode1] = useState({});
     const [selectedChildNode2, setSelectedChildNode2] = useState({});
     const [isShowModal,        setIsShowModal] = useState(false);

     // create the array of objects from lists
     const headers = ["VeryRed","Red","Gray","Green","VeryGreen","[no data]","[not applicable]"];
     const [gridWordingCollection, setGridWordingCollection]  = useState(createGridObject(headers,headers));

     const gridWordingCollectionUpdate =  (cellIndex, value) => {
          const newGrid  = gridWordingCollection.map(i => (i["id"] === cellIndex) ? 
                                                          {...i, 'value':value}:
                                                          i
                                                       );
          setGridWordingCollection(newGrid);
     }

     const gridWordingPasteSpecial = (textValue, rowIndex, columnIndex) =>
     {
          const newGrid = specialGridEdit(gridWordingCollection, textValue, rowIndex, columnIndex);
          setGridWordingCollection(Object.freeze(newGrid));
     }

     const gridWordingCollectionUpdateCellMode =  (cellIndex, nextEditMode) => {
           const newGrid = gridWordingCollection.map((i) => (i["id"] === cellIndex) ? 
                                                            {...i, "editMode":nextEditMode} : 
                                                            {...i, "editMode":0});
          setGridWordingCollection(newGrid);
     }

     // Selectors
     const [nodes, setNodes] = useState([]);
     const [isNodesSelected, setIsNodesSelected] = useState(false);

     // modal functions
     const showModal = () => {setIsShowModal(true)}
     const updateOnModalClose = (signal, childNode1, childNode2) => 
     {
          setSelectedSignal(signal);
          setSelectedChildNode1(childNode1);
          setSelectedChildNode2(childNode2);
          setIsNodesSelected(true);
          setIsShowModal(false);

     }

     // TODO: set this up so that signal and subsignals are returned from the model under construction -  note dependency
     const getData = () => {
          var requestOptions = { method: "GET", redirect: "follow",};

          fetch("http://localhost:3030/Nodes", requestOptions)
          .then((response) => response.json())
          .then((result) => ( result.filter(i => [4,5].includes(i["Level"]))))
          .then((res) => setNodes(res))
          .catch((error) => console.log("error", error));
     };
     useEffect(() => {getData()}, []);


     // TODO = create the grid html table
     return (
          <>
          <Container>
               <Col>
                    <Row>
                         <div className="page">
                              <h2>Grid Wording</h2>
                              <h5>Model: {modelLogic.model["ModelName"]}</h5>
                         </div>
                    </Row>
                    <Row>
                         <Col>
                              <ButtonGroup>
                                   <Button variant="dark" onClick={showModal}>select node group</Button>
                              </ButtonGroup>
                              <hr style={{color: "white"}}/>
                         </Col>
                    </Row>
                    <Row>
                         <Modal show={isShowModal}>
                              <GridWordingSelectorModal title={"Grid Wording"} 
                                                        nodelist={nodes} 
                                                        handleClose={updateOnModalClose}  />
                         </Modal>
                    </Row>
                    <Row>
                         <Col>
                              <Table striped bordered hover>
                                   <thead>
                                   <tr>
                                        <th>Node</th>
                                        <th>Selection</th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   <tr>
                                        <td>Signal</td>
                                        <td>{selectedSignal["Name"] ?? ""}</td>
                                   </tr>
                                   <tr>
                                        <td>Child Node 1 (rows)</td>
                                        <td>{selectedChildNode1["Name"] ?? ""}</td>
                                   </tr>
                                   <tr>
                                        <td>Child Node 2  (columns)</td>
                                        <td>{selectedChildNode2["Name"] ?? ""}</td>
                                   </tr>
                                   </tbody>
                              </Table>
                         </Col>
                         <Col>
                         </Col>
                    </Row>
                         {isNodesSelected &&  
                              <>
                         <Row>
                              <Col>
                                   <ButtonGroup>
                                             <Button variant="dark" onClick={() => copyForExcel(gridWordingCollection)}>Excel copy</Button> 
                                             <Button variant="dark">export to model</Button>
                                   </ButtonGroup>
                                   <hr style={{color: "white"}}/>
                              </Col>
                         </Row>
                         <Row>
                              <Col>
                                   <GridTable gridCollection={gridWordingCollection} 
                                              RowHeaders={headers}    
                                              ColumnHeaders={headers} 
                                              handleGridCollectionChange={gridWordingCollectionUpdate}
                                              handleGridPaste={gridWordingPasteSpecial}
                                              handleGridChangeCellMode={gridWordingCollectionUpdateCellMode}/>
                              </Col>
                         </Row>
                         </>
                    }
               </Col>
     </Container>
 
     </>
    )

}