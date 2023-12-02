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

export function AddEmployee() {
 
    const [isAddProductVisible, setAddProductVisible] = useState(false);

    const handlePlusClick = () => {
        // Toggle the visibility of the addProduct component
        setAddProductVisible(!isAddProductVisible);
      };
      const token = window.localStorage.getItem('token');
      let navigate = useNavigate();
      const[data, setData]=useState({
          Empid:"",
          Username:"",
          Password:"",
      })
      const handleChange=(e)=>{
          setData({ ...data, [e.target.name]:e.target.value});
          //console.log(data);
      }
  
      const submitForm=(e)=>{
          e.preventDefault();
          addProduct();
          setData({       
            Empid:"",
            Username:"",
            Password:"",
          });
      }
      const addProduct=() =>{
          const sendData={
            Empid:data.Empid,
            Username:data.Username,
            Password:data.Password,
          }
          console.log(sendData);
          fetch('https://grocery-store-server-u9gz.onrender.com/employeeItems',{
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
  <Text fontSize="lg" lineHeight="tall" textAlign="center">Add an Employee</Text>
  {isAddProductVisible?(
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
       <Stack>
         <FormControl id="Empid" display="flex" flexDirection="row" alignItems="center">
            <FormLabel >Empid</FormLabel>
            <Input type="number" name="Empid"  
                onChange={handleChange} value={data.Empid} />
         </FormControl>
          <FormControl id="Username" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>Username</FormLabel>
            <Input type="text" name="Username"  
                 onChange={handleChange} value={data.Username}/>
          </FormControl>
          <FormControl id="Password" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>Password</FormLabel>
            <Input type="text" name="Password"  
                onChange={handleChange} value={data.Password} />
         </FormControl>
          
         <Button colorScheme={'blue'} variant={'solid'}  onClick={submitForm}>
              Submit
         </Button>
       </Stack>
    </Flex>
  ):(null)}
</Box>
)}
