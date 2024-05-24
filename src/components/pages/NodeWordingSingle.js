import {Row, Col, Container, Table, ButtonGroup, Button, Modal} from "react-bootstrap"
import {useState} from 'react';
import {copyObjectToClipboard, getWordingObjectArray} from "../helpers/helpers";
import InputCell from '../widgets/InputCell';
import WordingSelectorModal from '../widgets/WordingSelectorModal';

export const NodeWordingSingle = () => {

     // wording category lists
     const colorstring  = "VeryRed,Red,Gray,Green,VeryGreen";
     const calculatedValueString  = "[no data],[not applicable]";

     const [colorWordingDictionary, setColorWordingDictionary] = useState(getWordingObjectArray(colorstring,"Color"));
     const [tableHeader, setTableHeader] = useState("Colors")
     const [isShowModal, setIsShowModal] = useState(false);

     // modal functions
     const showModal = () => {setIsShowModal(true)}
     const toggleShowModal = () => {setIsShowModal(!isShowModal)}
     
     // closing modal => creates the table and the underlying object array
     const onModalClose = (colors, tableHeader) => {
          setTableHeader(tableHeader);
          setColorWordingDictionary(getWordingObjectArray(colors, tableHeader));
          toggleShowModal();
     }
     
     // handling table and underlying array
     const updateTableFromDictionary = (label, color, newText)  => {
          const dict = colorWordingDictionary.map(element => element[label] == color ? {...element, Wording : newText} : element);
          setColorWordingDictionary(dict);
     }

     const CreateTableRows = (colorsDictionary) => (colorsDictionary.map((c,  i) => 
                                                            ( <tr key={i}>
                                                                 <td>{Object.values(c)[0]}</td>
                                                                 <td>
                                                                      <InputCell key={i} 
                                                                                 label={tableHeader}
                                                                                 name={Object.values(c)[0]}
                                                                                 value={Object.values(c)[1]}
                                                                                 handleChange={updateTableFromDictionary} />
                                                                 </td>
                                                            </tr>)))

     
     
      return (
          <Container>
          <Col>
               <Row>
                    <div className="page">
                         <h2>Wording page</h2>
                    </div>
               </Row>
               <Row>
                    
                    <Col>
                         <ButtonGroup>
                              <Button variant="dark" onClick={showModal}>Select Categories</Button><br/>
                              <Button variant="dark" onClick={() => {copyObjectToClipboard(colorWordingDictionary)} }>Export to model</Button>
                         </ButtonGroup>
                         <hr style={{color: "white"}}/>
                    </Col>
               </Row>
               <Row>
                    <Modal show={isShowModal}>
                         <WordingSelectorModal name={"Wording categories"} 
                                               defaultColors={colorstring} 
                                               defaultCalculatedValues={calculatedValueString}
                                               initialLabel={tableHeader}
                                               handleClose={onModalClose}/>
                    </Modal>
               </Row>
               <Row>
                    <Col>
                    <Table striped responsive="xl" bordered>
                                   <thead>
                                   <tr>
                                        <th>{tableHeader}</th>
                                        <th>Wording</th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                        {
                                             CreateTableRows(colorWordingDictionary)
                                        }
                                   </tbody>
                              </Table>
                    </Col>
               </Row>
          </Col>
          </Container>
     )
}


