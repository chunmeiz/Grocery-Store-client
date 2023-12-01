import {React,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  Button,
  IconButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack, 
} from '@chakra-ui/react';
import {Sidebar} from './Sidebar.tsx'
import {ProductTable} from './ProductTable'
import { useAuth } from './AuthContext';
import { AddIcon } from '@chakra-ui/icons'
import { FaPlus } from 'react-icons/fa';

export function AddProduct() {
 
    const [isAddProductVisible, setAddProductVisible] = useState(false);

    const handlePlusClick = () => {
        // Toggle the visibility of the addProduct component
        setAddProductVisible(!isAddProductVisible);
      };
      const token = window.localStorage.getItem('token');
      let navigate = useNavigate();
      const[data, setData]=useState({
          ProductCode:"",
          ProductName:"",
          ProductQuantity:"",
          Product_price:""
      })
      const handleChange=(e)=>{
          setData({ ...data, [e.target.name]:e.target.value});
          //console.log(data);
      }
  
      const submitForm=(e)=>{
          e.preventDefault();
          addProduct();
          setData({       
            ProductCode:"",
            ProductName:"",
            ProductQuantity:"",
            Product_price:""
          });
      }
      const addProduct=() =>{
          const sendData={
              ProductCode:data.ProductCode,
              ProductName:data.ProductName,
              ProductQuantity:data.ProductQuantity,
              Product_price:data.Product_price
          }
          console.log(sendData);
          fetch('http://localhost:3000/productItems',{
              method:"POST",
              body:JSON.stringify(sendData),
              headers:{
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
          })
          .then((res)=>{
            if (!res.ok) {
              alert('Bad request!You can not add.');
              navigate("../login");
              throw new Error(`HTTP error! Status: ${res.status} - ${res.statusText}`);
             }
              return res.json();
          })
          .then ((data)=>{
                    alert(data.message);
                    window.location.reload();
             })
          .catch((error) => {
              console.error('Error:', error);
         })
        }
    
  return (

<Box>
  <IconButton
    icon={<FaPlus />}
    colorScheme="teal"
    aria-label="Plus icon"
    onClick={handlePlusClick}
  />
  <Text fontSize="lg" lineHeight="tall" textAlign="center">Add a product</Text>
  {isAddProductVisible?(
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
       <Stack>
         <FormControl id="ProductCode" display="flex" flexDirection="row" alignItems="center">
            <FormLabel >ProductCode</FormLabel>
            <Input type="text" name="ProductCode"  
                onChange={handleChange} value={data.ProductCode} />
         </FormControl>
          <FormControl id="ProductName" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>ProductName</FormLabel>
            <Input type="text" name="ProductName"  
                 onChange={handleChange} value={data.ProductName}/>
          </FormControl>
          <FormControl id="ProductQuantity" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>ProductQuantity</FormLabel>
            <Input type="number" name="ProductQuantity"  
                onChange={handleChange} value={data.ProductQuantity} />
         </FormControl>
          <FormControl id="Product_price" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>Product_price</FormLabel>
            <Input type="number" name="Product_price"
                 onChange={handleChange} value={data.Product_price}/>
          </FormControl>
         <Button colorScheme={'blue'} variant={'solid'}  onClick={submitForm}>
              Submit
         </Button>
       </Stack>
    </Flex>
  ):(null)}
</Box>
)}
