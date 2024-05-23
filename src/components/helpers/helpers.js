export const parseStringToArray = (stringValue, delimiter) => (stringValue.split(delimiter));

export const splitStringToDictionary = (dictionaryString) =>  
        {var result = {};  
         dictionaryString.split(",").forEach((i) => {result[i] = ""}); 
         return result;}

export const getWordingObjectArray = (categoryList, label) => {
        const d = [];
        const categories = [...new Set(categoryList.split(","))];
        categories.forEach((c)  => d.push({[label]:c,  "Wording":""}));
        return d;
}

export const getNextGridCellEditMode = (currentCellInputMode) => (currentCellInputMode + 1) % 3; 
export const specialGridEdit = (GridCollection, textValue, initRow, initColumn) =>
{
     var maxRowIndex = Math.max(...GridCollection.map( i => i.rowIndex)) - initRow;
     var maxColIndex = Math.max(...GridCollection.map( i => i.columnIndex)) - initColumn;
     var d = [...GridCollection]; var gridItem = {};
     
     const getGridItem = (rowIndex, colIndex) => GridCollection.filter(i => (i["rowIndex"] === rowIndex 
                                                                       && i["columnIndex"] === colIndex))[0];
     const updateGridItemValue = (collection, index, value) => collection[index]["value"] = value;

     textValue.split(/\r?\n/).forEach((rowItem, rowIndex) =>
                         (rowItem.split('\t').forEach((colItem, colIndex) => 
                         {
                              gridItem = getGridItem(rowIndex + initRow, colIndex + initColumn);
                              if(rowIndex <= maxRowIndex && colIndex <= maxColIndex )  
                                   updateGridItemValue(d, gridItem["id"], colItem);
                         }
                    )))
     return d;
}

export const createGridObject = (rowHeaders, columnHeaders) =>
{
     const rowHeaderLength = rowHeaders.length; 
     var d = [];var x = {};
     rowHeaders.forEach((rh, rhIndex) => {
               columnHeaders.forEach((ch, chIndex) => {  x = {};
                         x["id"]=((rhIndex  * rowHeaderLength) + chIndex );
                         x["rowIndex"]=rhIndex;
                         x["columnIndex"]=chIndex;
                         x["row"]=rh;
                         x["col"]=ch;
                         x["value"]="";
                         x["editMode"]=0;
                    d.push(x);
               }
          )
     });
     return(d);
}

// Helpers for node selection
export const  filterListByNameSearchTextAndLevel = (list, text, level, firstOnly = true) => {
     if(firstOnly === true)
     {
          return(list.filter(i => i["Level"] === level && i["Name"].toLowerCase().includes(text.toLowerCase())));
     } 
     else
     {
          return(list.filter(i => i["Level"] === level && i["Name"].toLowerCase().includes(text.toLowerCase())));
     }
}

export const  filterListByLevel = (list, level) => {
     return list.filter(i => i["Level"] === level)
}

export const  filterListByNameSearchText = (list, text) => {
     return list.filter(i => i["Name"].toLowerCase().includes(text))
}

export const  getListWithExcludedNode = (list, node) => {
     return list.filter(i => JSON.stringify(i) !== JSON.stringify(node))
}

// copy+paste 
export const copyObjectToClipboard = (obj) => (sessionStorage.setItem("clipboard",JSON.stringify(obj)))
export const pasteObjectFromClipboard = () => (JSON.parse(sessionStorage.getItem("clipboard")))
export const copyToClipboard = async (text) => {
     try {
         const permissions = await navigator.permissions.query({name: "clipboard-write"})
         if (permissions.state === "granted" || permissions.state === "prompt") {
             await navigator.clipboard.writeText(text);
         } else {
             throw new Error("Can't access the clipboard. Check your browser permissions.")
         }
     } catch (error) {
     }
 };

export const copyForExcelGrid = (gridWordingCollection) => {
     var ExcelGridString = "";
     var maxIndex = Math.max(...gridWordingCollection.map( i => i.id));
     
     gridWordingCollection.forEach((x, index) =>
          {
             if(     x["rowIndex"] > 0    
                  && x["id"] < maxIndex
                  && x["rowIndex"] < gridWordingCollection[(index + 1)]["rowIndex"])
               {
                    ExcelGridString = ExcelGridString.concat(x["value"]).concat('\n');
               }
             else if (x["id"] < (maxIndex + 1))
               {
                    ExcelGridString = ExcelGridString.concat(x["value"]).concat('\t');
               }
          }
     )
     return ExcelGridString;
}

export const copyForExcel = (gridWordingCollection) => {
     const excelGridValues = copyForExcelGrid(gridWordingCollection);
     copyToClipboard(excelGridValues);
}
