import React, { useEffect, useState } from 'react';
import { TableContainer } from "@chakra-ui/react";
import DynamicTableList from './DynamicTableList';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function MainTable  (props)  {
  const { columnTitles, tableCaption, url } = props;

  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  const [editedValues, setEditedValues] = useState({});
  const [deletingRow, setDeletingRow] = useState(null);
  const token = window.localStorage.getItem('token');
  

  const fetchData = async () => {
    try {
      const response = await fetch(url); 
      const data = await response.json();
      console.log(data);
      
      return { data };
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  const deleteProduct=(index) =>{
    const deletedTableData = [...tableData];
    const deletedProduct = deletedTableData[index];
    console.log(deletedProduct._id);
    console.log(token);
   
    fetch(`${url}/${deletedProduct._id}`,{
      method:"Delete",
      headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
  })
  .then((res) => {
     if (!res.ok) {
      alert('Bad request!You can not delete.');
      navigate("../login");
      throw new Error(`HTTP error! Status: ${res.status} - ${res.statusText}`);
     }
      return res.json();
  })
  .then ((data)=>{
       alert( data.message);
        //update TableData and refresh the page
       deletedTableData.splice(index, 1);
       setTableData(deletedTableData);
      })
     .catch((error) => {
      console.error('Error:', error);
     })

  }

  const editProduct=(index) =>{
   
     const editedProduct = tableData[index];
     console.log(editedProduct._id);
     console.log(editedProduct); 
     console.log(token); 
     console.log(editedValues);
     // Check if any field is edited
     if (Object.keys(editedValues).length === 0) {
       alert("You didn't change anything");
       return;
     }

    fetch(`${url}/${editedProduct._id}`,{
        method:"PUT",
        body:JSON.stringify(
          editedProduct
        ),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    .then((res) => {
       if (!res.ok) {
        alert('Bad request!You can not edit.');
        navigate("../login");
        throw new Error(`HTTP error! Status: ${res.status} - ${res.statusText}`);
       }
        return res.json();
    })
    .then ((data)=>{
          alert( data.message);
          tableData[index]=data.updatedProductItem;
          console.log(tableData);
          setTableData(tableData);
         })   
       .catch((error) => {
        console.error('Error:', error);
       })
       
   }
//----------------------------------------------------------------------
  const handleEditClick = (index) => {
    setEditingRow(index);
  };

  const handleSaveClick = (index) => {
    
    // Handle saving the edited values, e.g., send them to the server
    editProduct(index);
    // After saving, you can update the state or perform any other necessary actions
    setEditingRow(null);
    setEditedValues({});
  };

  const handleCancelEditClick = () => {
    // Handle canceling the edit mode
    setEditingRow(null);
    console.log(`editingRow:${editingRow}`);
    setEditedValues({});

    // const updatedTableData = [...tableData];
    // updatedTableData[editingRow] = originalDataForEditingRow; // Replace with the actual original data
    // setTableData(updatedTableData);

  };
//---------------------------------------------------------------------

const handleDeleteClick = (index) => {
  setDeletingRow(index);
};

const handleConfirmClick = (index) => {
  // Handle saving the edited values, e.g., send them to the server
  deleteProduct(index);
  // After saving, you can update the state or perform any other necessary actions
  setDeletingRow(null);
};

const handleCancelDeleteClick = () => {
  // Handle canceling the edit mode
  setDeletingRow(null);
};
//--------------------------------------------------------------------
// var originalDataForEditingRow = 0;

  const handleInputChange = (rowIndex, columnName, value) => {
    // Update the corresponding field in the editedValues state
    setEditedValues((prevValues) => ({
      ...prevValues,
      [columnName]: value,
    }));
    // Create a new array with the updated values for the specific row
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex] = {
      ...updatedTableData[rowIndex],
      [columnName]: value,
    };
    //  originalDataForEditingRow= value;
   // Update the state with the new array
    setTableData(updatedTableData);
    
  };


  useEffect(() => {
    // checkTokenisValid();
    console.log(`editingRow:${editingRow}`);
    // if (tableData.length === 0) {
      fetchData()
      .then((response) => {
        console.log(response);
        setTableData(response.data); 
      })
    //  }
  }, [editingRow]); 


  useEffect(() => {
    console.log("tableData has been updated:", tableData);
    // Additional logic or side effects you want to perform after tableData is updated
  }, [editingRow]);

 console.log(token);
// ------------------------------------------------------------
 
  return (
    <TableContainer>
      <DynamicTableList
        tableCaption={tableCaption}
        tableData={tableData}
        columnTitles={columnTitles}
        editingRow={editingRow}
        deletingRow={deletingRow}
        onInputChange={handleInputChange}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
        handleCancelEditClick={handleCancelEditClick}
        handleDeleteClick={handleDeleteClick}
        handleConfirmClick={handleConfirmClick}
        handleCancelDeleteClick={handleCancelDeleteClick}
        isLoggedIn={isLoggedIn}
        token={token} 
      />
    </TableContainer>
  );
};


