import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DoubleOptionCheckbox from  "./DoubleOptionCheckbox";

const WordingSelectorModal = ({name, defaultColors,  defaultCalculatedValues, initialLabel, handleClose}) => { // "red, blue ,..."
  
  const modalColors = defaultColors;
  const modalCalculatedValues = defaultCalculatedValues;
  const [tableCategories, setTableCategories] = useState(defaultColors);

  const [label, setLabel] = useState(initialLabel);
  const handleLabelUpdate  = (labelText) => { setLabel(labelText);
    (labelText === "Color")?
    setTableCategories(modalColors): 
    setTableCategories(modalCalculatedValues);
  }

  const handleModalColorsChange = (categoriesText) => {setTableCategories(categoriesText)}
  
  return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
            <DoubleOptionCheckbox SelectOption1="Color" SelectOption2="CalculatedValue" handleSelectionChange={handleLabelUpdate}/>
            <input value={tableCategories} type="text" onChange={(e) => {handleModalColorsChange(e.target.value)}}/>
        </Modal.Body>
        <Button onClick={() => {
                                handleClose(tableCategories, label)
                                }}>Ok</Button>
      </Modal.Dialog>
  );
}

export default WordingSelectorModal;