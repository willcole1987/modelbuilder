import {Container, Row, Col } from 'react-bootstrap';
import Node from './Node';

const BootstrapTreeGrid = ({NodeTree}) =>
{
    const getNodeTreeElementsByLevel = (NodeTree, Level) => (NodeTree.filter(x => x["Level"] === Level))
    const getSubsignalGrandParentId = (Subsignal, NodeTree) => (NodeTree.filter( SuccessFactor => SuccessFactor["Level"] === 2 
                                                                                               && SuccessFactor["Id"] === NodeTree.filter(Node => Node["Id"] === Subsignal["ParentId"]).shift()["ParentId"]).shift())
  
    const SuccessFactors = getNodeTreeElementsByLevel(NodeTree, 2);
    const Signals = getNodeTreeElementsByLevel(NodeTree, 3);
    const Subsignals = getNodeTreeElementsByLevel(NodeTree, 4)
                      .map(Subsignal => ({...Subsignal, "GrandParentId":getSubsignalGrandParentId(Subsignal,NodeTree)["Id"]}))
  
    const SubsignalHeight = 1;

    const getSignalHeightDictionary = (Signals, NodeTree, SubsignalHeight) => 
    {
        const newObject = {};
        Signals.forEach(
          (Signal) => (newObject[Signal["Id"]] = NodeTree.filter((x) => (x["ParentId"] === Signal["Id"])).length * SubsignalHeight )
        )
        return newObject;
    }
  
    const getSuccessFactorHeightDictionary = (SuccessFactors, NodeTree, SignalHeightDictionary) => 
      {
          const newObject = {};
          SuccessFactors.forEach(
            (SuccessFactor) => (newObject[SuccessFactor["Id"]]  =  NodeTree.filter((x) => (x["ParentId"] === SuccessFactor["Id"]))
                                                                           .map(w => SignalHeightDictionary[w["Id"]])
                                                                           .reduce((z,y) => (z + y),0)
                                                                           ))
          return newObject;
    }
  
    const SignalHeights = getSignalHeightDictionary(Signals, NodeTree, SubsignalHeight)
    const SuccessFactorHeights = getSuccessFactorHeightDictionary(SuccessFactors, NodeTree,SignalHeights)
  
      return (
        <Container>
          <Row >
            <Col >
                {<ul style={{ listStyleType: "none" }}>
                {SuccessFactors
                  .sort((a,b) => a["Id"] - b["Id"])
                  .map((sf, idx) => (
                      
                        <Row >
                            <li key={idx}>
                                <Node  Key={idx} Name={sf["Name"]} Height={SuccessFactorHeights[sf["Id"]]} />
                            </li>
                        </Row>
                ))}
                </ul>}
              </Col>
              <Col >
                  { <ul style={{ listStyleType: "none" }}>{
                  Signals
                    .sort((a,b) => { if( a["ParentId"] > b["ParentId"] ) return 1; if(a["ParentId"] < b["ParentId"] ) return -1; 
                                          if( a["Id"] > b["Id"] ) return 1; if(a["Id"] < b["Id"] ) return -1; }
                          )
                    .map((sig, idx) => (
                            <Row >
                              <li key={idx}>
                                  <Node Key={idx} Name={sig["Name"]} Height={SignalHeights[sig["Id"]]}/>
                              </li>
                            </Row>
                      
                    ))
                  }</ul>}
              </Col>
              <Col >
                  {<ul style={{ listStyleType: "none" }}>{
                   Subsignals
                    .sort((a,b) => { if( a["GrandParentId"] > b["GrandParentId"] ) return 1; if(a["GrandParentId"] < b["GrandParentId"] ) return -1; 
                                          if( a["ParentId"] > b["ParentId"] ) return 1; if(a["ParentId"] < b["ParentId"] ) return -1; })
                    .map((subs,idx) => (
                            <Row >
                              <li key={idx}>
                                  <Node Key={idx} Name={subs["Name"]} Height={SubsignalHeight}/>
                              </li>
                            </Row>
                    ))
                  }</ul>}
              </Col>
            </Row>
          </Container>
          ) 
}

export default BootstrapTreeGrid;