import { useState } from "react";
import { form } from "react-bootstrap";
const InputCell = ({ label, name, value, handleChange}) => 
{
    // const [height, setHeight] = useState("inherit");
    // const [width, setWidth] = useState("inherit");

    // const setDimensions = () => {
    //     setHeight("h-100");
    //     setWidth("100%");
    // }

    return (
        <div contentEditable={true} 
             type="text" 
             value={value} 
             onChange={(e) => { handleChange(label,  name, e.target.value) }}></div>
    )
}

export default InputCell;