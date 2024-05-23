import { useRef } from "react";
import {getNextGridCellEditMode} from '../helpers/helpers';

const ExcelInputCell = ({ cell, handleChange, handleSpecialPaste, handleEditModeUpdate}) => 
{

    const inputRef = useRef();
    const cellStyles = { 0:{ outline: "solid", outlineColor:"transparent"},
                         1:{ outline: "solid", outlineColor:"Green"},
                         2:{ outline: "solid", outlineColor:"Blue"}};

    const handleCellModeUpdate = (nextCellInputMode) =>
    {
        handleEditModeUpdate(cell["id"], nextCellInputMode);
        (nextCellInputMode === 2) && inputRef.current.select();
    }
    
    const handleSpecialKeys = (e) =>
    {
        if (e.key === "Tab")
            e.preventDefault();
        if (e.key === "Enter")
            handleCellModeUpdate(0);
    }

    const handleCellChange = (value) =>
    {
        if(cell["editMode"] === 2)
            handleChange(cell["id"], value);
    }
    
    const handleCellPaste = (value) =>
    {
        switch(cell["editMode"])
        {
            case 2:
                handleCellChange(cell["id"], value);
                break;
            case 1: // special case to paste across multiple cells
                handleSpecialPaste(value, cell["rowIndex"], cell["columnIndex"]);
                break;
            default:
                break;
        }
    }

    // {id: 0, rowIndex: 0, columnIndex: 0, row: "VeryRed", col: "VeryRed", value: "", editMode: 0,}
    // console.log(`cell id: ${cell.id}, cellInputMode: ${cellInputMode}`)
    return (<td style={cellStyles[cell["editMode"]]}>
                <input style={ (cell["editMode"] < 2 ) ? {outlineWidth:"0",borderWidth:"0", caretColor:"transparent"} : 
                                                         {outlineWidth:"0",borderWidth:"0", caretColor:"Black"}}
                        type="text"
                        ref={inputRef}
                        value={cell["value"]}
                        onClick={()=> handleCellModeUpdate(getNextGridCellEditMode(cell["editMode"]))}
                        onKeyDown   ={(e) => { handleSpecialKeys(e);}}
                        onChange    = {(e) =>  { handleCellChange(e.target.value); e.stopPropagation();}}
                        onPaste     = {(e) =>  {handleCellPaste(e.clipboardData.getData('Text'));}}>
                </input>
           </td>)
}

export default ExcelInputCell;