import { createContext, useContext, useState } from "react"
import { getSessionItem, setSessionItem } from "../components/helpers/sessionStorageHelpers";

// const ModelContext = createContext();
// export const ModelData = () => useContext(ModelContext);

// export const ModelWrapper = () => {
     
//      // contexts: SESSIONMODELREPRESENTATION, SESSIONMODELSTATUS
//      // model status: inactive, in-edit,  queued, live
//      // const defaultModel = [{"Id":-1,"Level":1,"Name":"PLACEHOLDERMODELNODE","NodeId":-1,"ParentId":1},
//      //                       {"Id":-2,"Level":2,"Name":"Success Factor","NodeId":-2,"ParentId":-1},
//      //                       {"Id":-3,"Level":3,"Name":"Signal","NodeId":-3,"ParentId":-2},
//      //                       {"Id":-4,"Level":4,"Name":"Subsignal","NodeId":-4,"ParentId":-3}];

//      const [ model, _ ] = useState({ModelRepresentation: (getSessionItem("SESSIONMODELREPRESENTATION") ?? null),
//                                     ModelStatus: (getSessionItem("SESSIONMODELSTATUS") ?? 'inactive'),
//                                     ModelId: (getSessionItem("SESSIONMODELID") ?? -1),
//                                     ModelName: (getSessionItem("SESSIONMODELNAME") ?? "default"),
//                                     Category: (getSessionItem("SESSIONMODELCATEGORY") ?? "none")})
     
//      const setPersistedSessionModel = (ModelRepresentation, ModelStatus, ModelName, ModelId, Category) => {
//           setSessionItem("SESSIONMODELREPRESENTATION",ModelRepresentation);
//           setSessionItem("SESSIONMODELSTATUS",ModelStatus);
//           setSessionItem("SESSIONMODELID",ModelId);
//           setSessionItem("SESSIONMODELNAME",ModelName);
//           setSessionItem("SESSIONMODELCATEGORY",Category);
//      }
     
//      return (<ModelContext.Provider value={{model, setPersistedSessionModel}} />)
// }


const ModelContext = createContext();

const ModelProvider = ({ children }) => {
const [ model, setModel ] = useState({"ModelId": (getSessionItem("SESSIONMODELID") ?? -1),
                                           "ModelName": (getSessionItem("SESSIONMODELNAME") ?? "default"),
                                           "ModelStatus": (getSessionItem("SESSIONMODELSTATUS") ?? 'inactive'),
                                           "Category": (getSessionItem("SESSIONMODELCATEGORY") ?? "none"),
                                           "ModelRepresentation": (getSessionItem("SESSIONMODELREPRESENTATION") ?? null),
                                           "ImportedModelName":(getSessionItem("SESSIONIMPORTEDMODELNAME") ?? "")})

const setPersistedSessionModel = (ModelId, ModelName, ModelStatus, Category) => {
     setSessionItem("SESSIONMODELID",ModelId);
     setSessionItem("SESSIONMODELNAME",ModelName);
     setSessionItem("SESSIONMODELSTATUS",ModelStatus);
     setSessionItem("SESSIONMODELCATEGORY",Category);

     setModel({...model,"ModelId":ModelId, "ModelName":ModelName,
          "ModelStatus":ModelStatus,"Category":Category})
}

const setPersistedSessionModeTree = (ModelRepresentation, ImportedModelName) => {
     setSessionItem("SESSIONMODELREPRESENTATION",ModelRepresentation);
     setSessionItem("SESSIONIMPORTEDMODELNAME",ImportedModelName);
     setModel({...model,"ModelRepresentation":ModelRepresentation, "ImportedModelName":ImportedModelName})
}
     
  return (
          <ModelContext.Provider  value={{model, setPersistedSessionModel, setPersistedSessionModeTree}}>
               {children}
          </ModelContext.Provider>)
};

export default ModelProvider;

export const useModel = () => {
  return useContext(ModelContext);
};