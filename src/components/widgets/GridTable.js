import { Table } from 'react-bootstrap';
import ExcelInputCell from './ExcelInputCell'

const GridTable = ({gridCollection, RowHeaders, ColumnHeaders, handleGridCollectionChange, handleGridPaste, handleGridChangeCellMode } ) => {

  const alteredColumnHeaders = ["X"].concat(ColumnHeaders);

  const getHeadersFromArray = (columnHeaders) => (columnHeaders.map((i,idx) => {return(<th key={idx}>{i}</th>) }));

  const mapRowCells = (rowHeader, columnHeaders, rootIndex) => {
        const dictionaryRow = gridCollection.filter(x => x["row"]===rowHeader);
        return(
          <tr key={rootIndex} >
            <td key={`${rootIndex}-rowHeader`}>{rowHeader}</td>
              {
                columnHeaders.map((i, index) => 
                                            <ExcelInputCell key={dictionaryRow[index]["id"]}
                                                            cell={dictionaryRow[index]}
                                                            handleChange={handleGridCollectionChange}
                                                            handleSpecialPaste={handleGridPaste}
                                                            handleEditModeUpdate={handleGridChangeCellMode} />)
              }
          </tr>
         )
    };

  const getTableBodyFromRowColumnArray = (rowHeaders, columnHeaders) => (
                                              rowHeaders.map((i, rowIndex) => {
                                                return(
                                                        mapRowCells(i,columnHeaders,rowIndex)
                                                      )
                                              })
                                          )
  return (
      <Table bordered>
      <thead>
        <tr>
          {
            getHeadersFromArray(alteredColumnHeaders)
          }
        </tr>
      </thead>
      <tbody>
        {
            getTableBodyFromRowColumnArray(RowHeaders,ColumnHeaders)
        }
      </tbody>
          </Table>
        )
}

export default GridTable;