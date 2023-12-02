import { TableContainer , Table, Thead, Tbody, Tr, Th, Td, TableCaption,Button,Input} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
// import { jwt } from 'jsonwebtoken';
// import { Buffer } from 'buffer';

export const ProductTable = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [deletingRow, setDeletingRow] = useState(null);
  const token = window.localStorage.getItem('token');

  
  const fetchData = async () => {
    try {
      const response = await fetch("https://grocery-store-server-u9gz.onrender.com/productItems"); 
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
   
    fetch(`https://grocery-store-server-u9gz.onrender.com/productItems/${deletedProduct._id}`,{
      method:"Delete",
      headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
  })
  .then((res) => {
     if (!res.ok) {
      alert('bad request');
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
  if (token) {
    fetch(`https://grocery-store-server-u9gz.onrender.com/productItems/${editedProduct._id}`,{
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
        alert('Bad token.');
        navigate("../login");
        throw new Error(`HTTP error! Status: ${res.status} - ${res.statusText}`);
       }
        return res.json();
    })
    .then ((data)=>{
          alert( data.message);
          tableData[index]=data.updatedProductItem;
         })   
       .catch((error) => {
        console.error('Error:', error);
       })
      }else{
        alert('Token is null or undefined.');
        navigate("../");
      }
       
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

  const handleInputChange = (index,field, value) => {
    // Update the corresponding field in the editedValues state
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    // Create a new array with the updated values for the specific row
    const updatedTableData = [...tableData];
    updatedTableData[index] = {
      ...updatedTableData[index],
      [field]: value,
    };
   // Update the state with the new array
    setTableData(updatedTableData);
    
  };


  useEffect(() => {
    // checkTokenisValid();
    if (tableData.length === 0) {
      fetchData()
      .then((response) => {
        console.log(response);
        setTableData(response.data); 
      })
    }
  }, [tableData]); 


  useEffect(() => {
    console.log("tableData has been updated:", tableData);
    // Additional logic or side effects you want to perform after tableData is updated
  }, [tableData]);

  return (
  <TableContainer>
  <Table variant='striped' colorScheme='teal' size='lg'>
    <TableCaption>Products Table</TableCaption>
        <Thead>
          <Tr>
            <Th>ProductCode</Th>
            <Th>ProductName</Th>
            <Th>ProductQuantity</Th>
            <Th>Product_price</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
        {tableData.length > 0 ? (
          tableData.map((row, index) => (
            <Tr key={index}>
              <Td>
                 {editingRow === index ? (
                    <Input
                      variant="filled"
                      focusBorderColor="blue.500"
                      value={row.ProductCode}
                      onChange={(e) => handleInputChange(index, "ProductCode", e.target.value)}
                    />
                  ) : (
                    <span>{row.ProductCode}</span>
                  )}
              </Td>
              <Td>
                 {editingRow === index ? (
                    <Input
                      variant="filled"
                      focusBorderColor="blue.500"
                      value={row.ProductName}
                      onChange={(e) => handleInputChange(index, "ProductName", e.target.value)}
                    />
                  ) : (
                    <span>{row.ProductName}</span>
                  )}
              </Td>
              <Td>
                 {editingRow === index ? (
                    <Input
                      variant="filled"
                      focusBorderColor="blue.500"
                      value={row.ProductQuantity}
                      onChange={(e) => handleInputChange(index, "ProductQuantity", e.target.value)}
                    />
                  ) : (
                    <span>{row.ProductQuantity}</span>
                  )}
              </Td>
              <Td>
                 {editingRow === index ? (
                    <Input
                      variant="filled"
                      focusBorderColor="blue.500"
                      value={row.Product_price}
                      onChange={(e) => handleInputChange(index, "Product_price", e.target.value)}
                    />
                  ) : (
                    <span>{row.Product_price}</span>
                  )}
              </Td>
              <Td>
              {isLoggedIn?(
                  editingRow === index ? (
                    <>
                      <Button variant="solid" colorScheme="blue" onClick={() => handleSaveClick(index)}>
                        Save
                      </Button>
                      <Button variant="solid" colorScheme="red" onClick={handleCancelEditClick}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="solid" colorScheme="blue" onClick={() => handleEditClick(index)}>
                      Edit
                    </Button>
                  )
               ):(null)}
              </Td>
              <Td>
              {isLoggedIn?(
                deletingRow === index ? (
                    <>
                      <Button variant="solid" colorScheme="blue" onClick={() => handleConfirmClick(index)}>
                        Confirm
                      </Button>
                      <Button variant="solid" colorScheme="red" onClick={handleCancelDeleteClick}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="solid" colorScheme="blue" onClick={() => handleDeleteClick(index)}>
                      Delete
                    </Button>
                  )
                  ):(null)}
                </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan="6">Loading...</Td>
          </Tr>
        )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};


