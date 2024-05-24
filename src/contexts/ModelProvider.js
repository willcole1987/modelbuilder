import { createContext, useContext, useState } from "react"
import { getSessionItem, setSessionItem } from "../components/helpers/sessionStorageHelpers";

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