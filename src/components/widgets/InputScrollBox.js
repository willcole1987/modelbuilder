import ScrollBox from "./ScrollBox";
import RadioButton from "./RadioButton";
import { useEffect, useState } from "react";
import {Row, Col,Card,CardBody} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import { setSessionItem, getSessionItem } from "../helpers/sessionStorageHelpers";
import axios from "axios";
import { AuthData } from "../../contexts/AuthWrapper";
import { useModel } from "../../contexts/ModelProvider";

const InputScrollBox = ({importedModel,  setImportModel}) =>
{
    // for auth checking
    const { user } = AuthData();
    const modelLogic = useModel();


    // logic for managing radio buttons
    const [isCheckedOne, setIsCheckedOne] = useState(true)
    const [isCheckedTwo, setIsCheckedTwo] = useState(false)
    const toggleRadioButttons = (text) => {
          if(text === "SnapshotModels"){setIsCheckedOne(true); setIsCheckedTwo(false); } else {setIsCheckedOne(false); setIsCheckedTwo(true); }
    }
    const checkFirstOnly = ()  => {setIsCheckedOne(true); setIsCheckedTwo(false)}
    // const checkSecondOnly = ()  => {setIsCheckedOne(false); setIsCheckedTwo(true)}

    const selectModelGroup = (categoryName) => { setModelCategory(categoryName);
                                                    if(user["isAuthenticated"] === false && categoryName === "MyModels")
                                                    {
                                                        setFiltered([{"Category": "MyModels", "ModelId": 0, "Name": "Please log in to see user models"}]);
                                                    }
                                                    else
                                                    {
                                                        setFiltered((modelJsonSummary).filter(x => x["Category"] === categoryName));
                                                    };
                                                 }
    
    //logic for managing models summary / filtering
    const [modelJsonSummary , setModelJsonSummary] = useState(getSessionItem("SESSIONMODELSUMMARIES") ?? null)
    const [inputText, setInputText] = useState("")
    const [modelCategory, setModelCategory] = useState("SnapshotModels")
    const [filtered, setFiltered] = useState();

    const setPersistedModelJsonSummary = (modelJsonSummaryArg) => {
       setSessionItem("SESSIONMODELSUMMARIES",modelJsonSummaryArg)
       setModelJsonSummary(modelJsonSummaryArg)
       const initialModelsFromCategory = modelJsonSummaryArg.filter(x => x["Category"] === "SnapshotModels")
       setFiltered(initialModelsFromCategory);
    }
    
    useEffect(() => {const url = 'http://localhost:4000/';
                     const requestHeader = {headers: {'Content-Type': 'application/json',},};
                     const requestBody = '{"token":' + (user.token === 'undefined' ? '' :  '"' + user.token + '"') + '}'
                    axios.post(`${url}allmodels`, requestBody, requestHeader)
                            .then(res => {setPersistedModelJsonSummary(res.data); console.log(res.data)})
                            .catch((err) => {return {status: err.response ? err.response.status : 0,data: {},error: err.message,}})
                            checkFirstOnly();
                        }, [user]);
  
   //Managing filtering models within categories
   const filterOptions = (text) => { setFiltered(modelJsonSummary.filter(x => x["Category"] === modelCategory)
                                                      .filter(x => x["Name"].toLowerCase().includes((text).toLowerCase())))}

   const handleInputTextChange = (text) => {setInputText(text); 
                                            filterOptions(text);}

   const handleCheckBoxTick = (CategoryName) => 
    {
        toggleRadioButttons(CategoryName);
        setInputText("");
        selectModelGroup(CategoryName);
   }
   
   const setBackToAllModels = () => { setInputText(""); filterOptions("");}
   
   const handleModelSelectionClick = (ModelId,  Category) => {
        const selectedModel = modelJsonSummary.filter(x => x["Category"] === Category).filter(x => x["ModelId"] === ModelId);
        setImportModel(selectedModel[0]["ModelId"], 
                       selectedModel[0]["Name"],
                       selectedModel[0]["Status"],
                       selectedModel[0]["Category"]
                      );
        setBackToAllModels();
    }
    
    return(
        <div>
            {filtered &&
                <Row>
                    <Col>
                        <Row>
                            <Form.Group key={1} className="mb-3" controlId="formBasicText" >
                                <Form.Label style={{"fontWeight":"bold"}}>Model Category</Form.Label>
                                    <RadioButton    Name={"SnapshotModels"} 
                                                    categoryValue={"SnapshotModels"} 
                                                    isChecked={isCheckedOne} 
                                                    handleClick={handleCheckBoxTick}/>

                                    <RadioButton    Name={"MyModels"} 
                                                    categoryValue={"MyModels"} 
                                                    isChecked={isCheckedTwo} 
                                                    handleClick={handleCheckBoxTick}/>

                                    <br/>
                                    <br/>
                                <Form.Label style={{"fontWeight":"bold"}}>Search Models</Form.Label>
                                    <Card style={{"border":"2px", "borderColor":"black"}}>
                                        <CardBody>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Filter models:</Form.Label>
                                                    <Form.Control   placeholder="model" type="text" autoComplete="off" 
                                                                    value={inputText} 
                                                                    onChange={(e) => handleInputTextChange(e.target.value)}/>
                                                </Form.Group>
                                        </CardBody>
                                    </Card>
                            </Form.Group>
                            <p style={{"fontWeight":"bold"}}>Model:  
                                    <span style={{"fontWeight":"normal"}}>
                                                {modelLogic.model["ModelName"] == "default" ? 
                                                " select a model to get started" : 
                                                " " + modelLogic.model["ModelName"]}
                                    </span>
                            </p>
                        </Row>
                    </Col>
                    <Col>
                    <p style={{"fontWeight":"bold"}}>Select a model</p>
                            <ScrollBox optionsList={filtered} selectModel={handleModelSelectionClick} />
                    </Col>
                </Row>}
            </div>)
}

export default InputScrollBox;