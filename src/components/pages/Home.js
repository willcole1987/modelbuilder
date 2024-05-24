import {  Container, Col, Row, Button , ButtonToolbar, Card} from 'react-bootstrap';
import InputScrollBox from  '../widgets/InputScrollBox';
import BootstrapTreeGrid from '../widgets/BootstrapTreeGrid';
import { AuthData } from "../../contexts/AuthWrapper";
import { useModel } from "../../contexts/ModelProvider"
import { useNode } from "../../contexts/NodeProvider"
import {exportToExcel} from '../helpers/excelDownloadHelpers';
import InformationSidePanel from '../widgets/InformationSidePanel';
import Sticky from 'react-stickynode';
import axios from 'axios';
// import Box from '../widgets/Box';

export const Home = () => {

  const { user } = AuthData();
  const modelLogic = useModel();
  const nodeLogic = useNode();

  const getModelTreeRepresentation = () => {
      const url = 'http://localhost:4000/';
      const requestHeader = {headers: {'Content-Type': 'application/json',},};
      const requestBody = '{"UserToken":' + (user.token === "" ? "null" :  '"' + user.token + '"') + ', "ModelId":"' + modelLogic.model["ModelId"] + '","ModelCategory":"' + modelLogic.model["Category"] + '"}'
      const fetchData = () => { axios.post(`${url}modelrepresentationjson`, requestBody, requestHeader)
                                     .then(res => modelLogic.setPersistedSessionModeTree(res.data, modelLogic.model["ModelName"])) // 
                              }
      fetchData();
   }

  // TODO: the api calls to be placed in their respective contexts rather than in the 'Home' component
  const getNodeInformation = (NodeStructureId, NodeId) => {
      const ModelId = modelLogic.model["ModelId"];
      if (NodeStructureId < 1)
      { 
          nodeLogic.setPersistedSessionNodeModelTreeData();
          nodeLogic.setPersistedSessionNodeAttributeData(); 
      } 
      else
      {
          var selectedNode = modelLogic.model["ModelRepresentation"].ModelTree.filter(i => (i.Id === NodeStructureId && i.NodeId === NodeId))[0];
          nodeLogic.setPersistedSessionNodeModelTreeData(selectedNode);
          const url = 'http://localhost:4000/';
          const requestHeader = {headers: {'Content-Type': 'application/json',},};
          const requestBody = '{"ModelId":"' + ModelId + '", "NodeId":"' + NodeId + '"}';
          const fetchData = () => { axios.post(`${url}modelnodeinformation`, requestBody, requestHeader)
                                        .then(res => 
                                              nodeLogic.setAllPersistedSessionNodeAttributeData(selectedNode, res.data))
                                  }
          fetchData();
      }
    }

    const exportModelToExcel = () => {
      if(modelLogic.model["ModelRepresentation"].ModelTree === null || modelLogic.model["ModelName"]  === "default")
        return 0;
      var modelTree = modelLogic.model["ModelRepresentation"].ModelTree;
      const getParentName = (node) => {
            var parent =  modelTree.filter(i => i.Id === node.ParentId)[0];
             return (parent !== undefined ? parent.Name : "SAM");
        }
      const ExcelData = modelTree.map(i => ({...i,"ParentNode":getParentName(i)}))

      exportToExcel(ExcelData, modelLogic.model["ModelName"]);
   }

    return (
      <div>{ <div>
              <Container fluid>
                        <Row>
                              <Card>
                                  <InputScrollBox importedModel = {modelLogic.model}
                                                  setImportModel = {modelLogic.setPersistedSessionModel}/> 
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
                                <InformationSidePanel NodeInformation={nodeLogic.node}/>
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