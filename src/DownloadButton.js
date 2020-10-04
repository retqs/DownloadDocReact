import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import React from 'react';
import styled from 'styled-components';

function DownloadBtn({data, fileName}) {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const extension = '.xlsx';

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = {Sheets: {data: ws}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + extension);
  };

  return (
    <Button onClick={() => exportToCSV(data, fileName)} type='button'>
      Download data
    </Button>
  );
}

const Button = styled.button`
  outline: none;
  padding: 10px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
`;

export default DownloadBtn;
