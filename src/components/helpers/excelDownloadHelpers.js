import XLSX from 'sheetjs-style';

export const exportToExcel = (fileData, fileName) => {
      
    const exportExcelDoc = async (excelData, excelName) => { 
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Model");
        XLSX.writeFile(workbook, excelName + ".xlsx", { compression: true });
    }
    
    exportExcelDoc(fileData, fileName);
}

    