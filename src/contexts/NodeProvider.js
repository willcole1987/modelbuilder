import { createContext, useContext, useState } from "react"
import { getSessionItem, setSessionItem } from "../components/helpers/sessionStorageHelpers";
const NodeContext = createContext();

const NodeProvider = ({ children }) => {

     const defaultNode = {"NodeStructureId":0,
                          "ParentNodeStructureId":0,
                          "NodeId": 0,
                          "NodeName":"",
                          "ParentNodeName":"",
                          "ParentNodeId":0,
                          "NodeWeight":0,
                          "NodeWording":{}}

     // const [ node, setNode ] = useState({"NodeStructureId":(      getSessionItem("NODESTRUCTUREID") ??       defaultNode.NodeStructureId),
     //                                     "ParentNodeStructureId":(getSessionItem("PARENTNODESTRUCTUREID") ?? defaultNode.ParentNodeStructureId),
     //                                     "NodeId": (              getSessionItem("NODEID") ??                defaultNode.NodeId),
     //                                     "NodeName": (            getSessionItem("NODENAME") ??              defaultNode.NodeName),
     //                                     "ParentNodeName": (      getSessionItem("PARENTNODENAME") ??        defaultNode.ParentNodeName),
     //                                     "ParentNodeId": (        getSessionItem("PARENTNODEID") ??          defaultNode.ParentNodeId),
     //                                     "NodeWeight": (          getSessionItem("NODEWEIGHT") ??            defaultNode.NodeWeight),
     //                                     "NodeWording": (         getSessionItem("NODEWORDING") ??           defaultNode.NodeWording)})
     
     const [ node, setNode ] = useState({"NodeStructureId":(       defaultNode.NodeStructureId),
                                         "ParentNodeStructureId":( defaultNode.ParentNodeStructureId),
                                         "NodeId": (               defaultNode.NodeId),
                                         "NodeName": (             defaultNode.NodeName),
                                         "ParentNodeName": (       defaultNode.ParentNodeName),
                                         "ParentNodeId": (         defaultNode.ParentNodeId),
                                         "NodeWeight": (           defaultNode.NodeWeight),
                                         "NodeWording": (          defaultNode.NodeWording)})

     const setPersistedSessionNodeModelTreeData = (ModelTreeNodeData=defaultNode) => 
     {
          setSessionItem("NODESTRUCTUREID",      ModelTreeNodeData.Id);
          setSessionItem("PARENTNODESTRUCTUREID",ModelTreeNodeData.ParentId);
          setSessionItem("NODEID",               ModelTreeNodeData.NodeId);
          setSessionItem("NODENAME",             ModelTreeNodeData.Name);
          setNode({...node, "NodeStructureId": ModelTreeNodeData.Id,
                            "ParentNodeStructureId": ModelTreeNodeData.ParentId,
                            "NodeId": ModelTreeNodeData.NodeId,
                            "NodeName": ModelTreeNodeData.Name})
     }

     const setPersistedSessionNodeAttributeData = (NodeAttributeData=defaultNode) => 
     {
          setSessionItem("PARENTNODENAME",       NodeAttributeData.ParentNodeName);
          setSessionItem("PARENTNODEID",         NodeAttributeData.ParentNodeId);
          setSessionItem("NODEWEIGHT",           NodeAttributeData.NodeWeight);
          setSessionItem("NODEWORDING",          NodeAttributeData.NodeWording);
          setNode({...node, "ParentNodeName":NodeAttributeData.ParentNodeName,
                            "ParentNodeId":NodeAttributeData.ParentNodeId,
                            "NodewWeight":NodeAttributeData.NodeWeight,
                            "NodeWording":NodeAttributeData.NodeWording})
     }

  const setAllPersistedSessionNodeAttributeData = (ModelTreeNodeData, NodeAttributeData=defaultNode) =>
  {
     setSessionItem("NODESTRUCTUREID",      ModelTreeNodeData.Id);
     setSessionItem("PARENTNODESTRUCTUREID",ModelTreeNodeData.ParentId);
     setSessionItem("NODEID",               ModelTreeNodeData.NodeId);
     setSessionItem("NODENAME",             ModelTreeNodeData.Name);
     setSessionItem("PARENTNODENAME",       NodeAttributeData.ParentNodeName);
     setSessionItem("PARENTNODEID",         NodeAttributeData.ParentNodeId);
     setSessionItem("NODEWEIGHT",           NodeAttributeData.NodeWeight);
     setSessionItem("NODEWORDING",          NodeAttributeData.NodeWording);
     
     setNode({"NodeStructureId": ModelTreeNodeData.Id,
              "ParentNodeStructureId": ModelTreeNodeData.ParentId,
              "NodeId": ModelTreeNodeData.NodeId,
              "NodeName": ModelTreeNodeData.Name, 
              "ParentNodeName":NodeAttributeData.ParentNodeName,
              "ParentNodeId":NodeAttributeData.ParentNodeId,
              "NodewWeight":NodeAttributeData.NodeWeight,
              "NodeWording":NodeAttributeData.NodeWording})
}

  return (
          <NodeContext.Provider  value={{node,
                                         setAllPersistedSessionNodeAttributeData, 
                                         setPersistedSessionNodeModelTreeData, 
                                         setPersistedSessionNodeAttributeData
                                         }}>
               {children}
          </NodeContext.Provider>)
};

export default NodeProvider;

export const useNode = () => {
  return useContext(NodeContext);
};