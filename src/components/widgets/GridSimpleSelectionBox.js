import  ScrollBox  from './ScrollBox';

const GridSimpleSelectionBox = ({filteredList, handleNodeSelection}) => {
  const handleSelectionClick = (id) => {  handleNodeSelection(id) };
  return (
    <>
        <ScrollBox optionsList={filteredList} selectItem={handleSelectionClick} />
    </>
  );
}

export default GridSimpleSelectionBox;