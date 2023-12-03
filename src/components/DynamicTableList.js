import React from 'react';
import { Table, TableCaption, Thead, Tbody, Tr, Th, Td, Input , Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function  DynamicTableList  ({ 
  tableCaption,
  tableData,
  columnTitles,
  editingRow,
  deletingRow,
  onInputChange,
  handleEditClick,
  handleSaveClick,
  handleCancelEditClick,
  handleDeleteClick,
  handleConfirmClick,
  handleCancelDeleteClick,
  isLoggedIn,
  token
 }) {

  // Assuming tableData is not empty
  const columns = tableData &&tableData.length > 0 ? Object.keys(tableData[0]) : [];
// Now 'columns' contains all the keys of the first object in tableData
  console.log(token);
  const navigate = useNavigate();
  return (
    <div style={{ overflow: 'auto', maxWidth: '100%', maxHeight: '600px' }}>
    <Table variant='striped' colorScheme='teal' size='md'>
      <TableCaption>{tableCaption}</TableCaption>
      <Thead>
        <Tr>
          {columnTitles.map((columnTitle, columnIndex) => (
            <Th key={columnIndex}>{columnTitle}</Th>
          ))}
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {tableData.length > 0 ? (
          tableData.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                // Skip rendering the first column
                colIndex !== 0 && (
                <Td key={colIndex}>
                  {editingRow === rowIndex ? (
                    <Input
                      variant="filled"
                      focusBorderColor="blue.500"
                      value={row[column]}
                      onChange={(e) => onInputChange(rowIndex, column, e.target.value)}
                    />
                  ) : (
                    <span>{row[column]}</span>
                  )}
                </Td>
                )
              ))}
              <Td>
              {(isLoggedIn)?(
                  editingRow === rowIndex ? (
                    <>
                      <Button variant="solid" colorScheme="blue" onClick={() => handleSaveClick(rowIndex)}>
                        Save
                      </Button>
                      <Button variant="solid" colorScheme="red" onClick={handleCancelEditClick}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="solid" colorScheme="blue" onClick={() => handleEditClick(rowIndex)}>
                      Edit
                    </Button>
                  )
               ):(navigate("../login"))}
              </Td>
              <Td>
              {(isLoggedIn)?(
                deletingRow === rowIndex ? (
                    <>
                      <Button variant="solid" colorScheme="blue" onClick={() => handleConfirmClick(rowIndex)}>
                        Confirm
                      </Button>
                      <Button variant="solid" colorScheme="red" onClick={handleCancelDeleteClick}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="solid" colorScheme="blue" onClick={() => handleDeleteClick(rowIndex)}>
                      Delete
                    </Button>
                  )
                  ):(navigate("../login"))}
                </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={columns.length + 2}>Loading...</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
    </div>
  );
};


