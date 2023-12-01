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
import { FaPlus } from 'react-icons/fa';

export function AddCart() {
 
    const [isAddProductVisible, setAddProductVisible] = useState(false);

    const handlePlusClick = () => {
        // Toggle the visibility of the addProduct component
        setAddProductVisible(!isAddProductVisible);
      };
      const token = window.localStorage.getItem('token');
      let navigate = useNavigate();
      const[data, setData]=useState({
        customerName: "",
        products:"" ,
        createdAt: ""
          
      })
      const handleChange=(e)=>{
          setData({ ...data, [e.target.name]:e.target.value});
          //console.log(data);
      }
  
      const submitForm=(e)=>{
          e.preventDefault();
          addProduct();
          setData({       
            customerName: "",
            products:"" ,
            createdAt: ""
          
          });
      }
      const addProduct=() =>{
          const sendData={
            customerName:data.customerName,
            products:data.products,
            createdAt:data.createdAt
          }
          console.log(sendData);
          fetch('http://localhost:3000/cartItems',{
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
  <Text fontSize="lg" lineHeight="tall" textAlign="center">Add a Cart</Text>
  {isAddProductVisible?(
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
       <Stack>
         <FormControl id="customerName" display="flex" flexDirection="row" alignItems="center">
            <FormLabel >customerName</FormLabel>
            <Input type="text" name="customerName"  
                onChange={handleChange} value={data.customerName} />
         </FormControl>
          <FormControl id="products" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>products</FormLabel>
            <Input type="text" name="products"  
                 onChange={handleChange} value={data.products}/>
          </FormControl>
          <FormControl id="createdAt" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>createdAt</FormLabel>
            <Input type="date" name="createdAt"  
                onChange={handleChange} value={data.createdAt} />
         </FormControl>
          
         <Button colorScheme={'blue'} variant={'solid'}  onClick={submitForm}>
              Submit
         </Button>
       </Stack>
    </Flex>
  ):(null)}
</Box>
)}
