import {  Container, Col, Row, Button , ButtonToolbar, Card} from 'react-bootstrap';
import InputScrollBox from  '../widgets/InputScrollBox';
import BootstrapTreeGrid from '../widgets/BootstrapTreeGrid';
import { AuthData } from "../../contexts/AuthWrapper";
import { useModel } from "../../contexts/ModelProvider"
import {exportToExcel} from '../helpers/excelDownloadHelpers';
import InformationSidePanel from '../widgets/InformationSidePanel';
import Sticky from 'react-stickynode';
import { useState } from 'react';
import axios from 'axios';
import Box from '../widgets/Box';

export const Home = () => {
  const { user } = AuthData();
  const modelLogic = useModel();
  
  const [nodeInformation, setNodeInformation] = useState();

  function getModelTreeRepresentation () {
      const url = 'http://localhost:4000/';
      const requestHeader = {headers: {'Content-Type': 'application/json',},};
      const requestBody = '{"UserToken":' + (user.token === "" ? "null" :  '"' + user.token + '"') + ', "ModelId":"' + modelLogic.model["ModelId"] + '","ModelCategory":"' + modelLogic.model["Category"] + '"}'
      const fetchData = () => { axios.post(`${url}modelrepresentationjson`, requestBody, requestHeader)
                                     .then(res => modelLogic.setPersistedSessionModeTree(res.data, modelLogic.model["ModelName"])) // 
                              }
      fetchData();
   }

   const getNodeInformation = (modelid, nodeid) => {
      const url = 'http://localhost:4000/';
      const requestHeader = {headers: {'Content-Type': 'application/json',},};
      const requestBody = '{"ModelId":' + {modelid} + '", "NodeId":"' + {nodeid} + '"}';
      const fetchData = () => { axios.post(`${url}modelnodeinformation`, requestBody, requestHeader)
                                    .then(res => setNodeInformation(res.data)) // 
                              }
      fetchData();
   }

   const defaultDataExample = [{"Name":"Joe","Likes":"chocolate",},{"Name":"Jane","Likes":"studying",}];
    const exportModelToExcel = () => {
      exportToExcel(defaultDataExample,"likes");
   }

    return (
      <div>{ <div>
              <Container fluid>
                        <Row>
                              <Card>
                                  <InputScrollBox importedModel     = {modelLogic.model}  setImportModel = {modelLogic.setPersistedSessionModel}/> 
                                  <hr></hr>
                                  <ButtonToolbar>
                                  <Button  onClick={getModelTreeRepresentation} variant="secondary" bssize="large" className="mr-10" style={{"marginLeft":"3px"}}>
                                    Import Model
                                  </Button>
                                  <Button  variant="secondary" bssize="large" className="mr-10" style={{"marginLeft":"3px"}}>
                                    New Model
                                  </Button>
                                  <Button  variant="secondary" bssize="large" className="mr-10" style={{"marginLeft":"3px"}}>
                                    Save
                                  </Button>
                                  <Button  onClick={exportModelToExcel} variant="secondary" bssize="large" className="mr-10" style={{"marginLeft":"3px"}}>
                                    Export to Excel
                                  </Button>
                                </ButtonToolbar>
                                <br/>
                              </Card>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                            {/* <CustomModal defaultModel={importedSessionModel} /> */}
                            </Col>
                        </Row>
                        </Container>
                    <br/>
                      <Row>
                        <Col sm md lg xl xxl = "9">
                        </Col>
                        <Col sm md lg xl xxl = "3">
                        </Col>
                      </Row>
                </div>
                }
                <div>
                  { modelLogic.model["ModelRepresentation"] !== null ?
                      <Row>
                        <Col xs sm md lg xl xxl="9">
                            <BootstrapTreeGrid NodeTree={modelLogic.model["ModelRepresentation"].ModelTree}
                                               handleNodeInformationGet={getNodeInformation}
                            />
                        </Col>
                        <Col xs sm md lg xl xxl="3">
                            <Sticky>
                              <Box/>
                              {/* <InformationSidePanel NodeInformation={nodeInformation}/> */}
                            </Sticky>
                        </Col>
                      </Row>
                      :
                      <Row>
                        <Col xs sm md lg xl xxl="9">
                        </Col>
                        <Col>
                            {/* TODO: Description panel on the clickable node */}
                        </Col>
                      </Row>
                  }
                </div>
        </div>
    );
 }
