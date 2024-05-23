import { HotTable } from '@handsontable/react';
// import '../../../node_modules/handsontable/dist/handsontable.full.css'

const HandsonDataGrid = ({data}) => {
  return (<HotTable data={data} 
                    width="auto"  
                    height="auto"
                    licenseKey="non-commercial-and-evaluation" />);
}

export default HandsonDataGrid;