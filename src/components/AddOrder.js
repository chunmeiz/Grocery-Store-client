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

export function AddOrder() {
 
    const [isAddProductVisible, setAddProductVisible] = useState(false);

    const handlePlusClick = () => {
        // Toggle the visibility of the addProduct component
        setAddProductVisible(!isAddProductVisible);
      };
      const token = window.localStorage.getItem('token');
      let navigate = useNavigate();
      const[data, setData]=useState({
        OrderNo: "",
        OrderDate:"" ,
        CustNo: "",
        ProductCode:"" ,
        ProductName: "",
        ProductQuantity:"" ,
        ProductPrice:"" ,
        Total:"",
        ModeOfPayment:""
       
      })
      const handleChange=(e)=>{
          setData({ ...data, [e.target.name]:e.target.value});
          //console.log(data);
      }
  
      const submitForm=(e)=>{
          e.preventDefault();
          addProduct();
          setData({       
            OrderNo: "",
            OrderDate:"" ,
            CustNo: "",
            ProductCode:"" ,
            ProductName: "",
            ProductQuantity:"" ,
            ProductPrice:"" ,
            Total:"",
            ModeOfPayment:""
          });
      }
      const addProduct=() =>{
          const sendData={
            OrderNo:data.OrderNo ,
            OrderDate:data.OrderDate ,
            CustNo: data.CustNo,
            ProductCode: data.ProductCode,

            ProductName: data.ProductName,
            ProductQuantity: data.ProductQuantity,
            ProductPrice: data.ProductPrice,
            Total:data.Total,
            ModeOfPayment:data.ModeOfPayment
          }
          console.log(sendData);
          fetch('https://grocery-store-server-u9gz.onrender.com/orderItems',{
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
  <Text fontSize="lg" lineHeight="tall" textAlign="center">Add an Order</Text>
  {isAddProductVisible?(
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
       <Stack>
         <FormControl id="OrderNo" display="flex" flexDirection="row" alignItems="center">
            <FormLabel >OrderNo</FormLabel>
            <Input type="number" name="OrderNo"  
                onChange={handleChange} value={data.OrderNo} />
         </FormControl>
          <FormControl id="OrderDate" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>OrderDate</FormLabel>
            <Input type="date" name="OrderDate"  
                 onChange={handleChange} value={data.OrderDate}/>
          </FormControl>
          <FormControl id="CustNo" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>CustNo</FormLabel>
            <Input type="number" name="CustNo"  
                onChange={handleChange} value={data.CustNo} />
         </FormControl>
          <FormControl id="ProductCode" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>ProductCode</FormLabel>
            <Input type="number" name="ProductCode"
                 onChange={handleChange} value={data.ProductCode}/>
          </FormControl>

          <FormControl id="ProductName" display="flex" flexDirection="row" alignItems="center">
            <FormLabel >ProductName</FormLabel>
            <Input type="text" name="ProductName"  
                onChange={handleChange} value={data.ProductName} />
         </FormControl>
          <FormControl id="ProductQuantity" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>ProductQuantity</FormLabel>
            <Input type="number" name="ProductQuantity"  
                 onChange={handleChange} value={data.ProductQuantity}/>
          </FormControl>
          <FormControl id="ProductPrice" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>ProductPrice</FormLabel>
            <Input type="number" name="ProductPrice"  
                onChange={handleChange} value={data.ProductPrice} />
         </FormControl>
          <FormControl id="Total" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>Total</FormLabel>
            <Input type="number" name="Total"
                 onChange={handleChange} value={data.Total}/>
          </FormControl>
          <FormControl id="ModeOfPayment" display="flex" flexDirection="row" alignItems="center">
            <FormLabel>ModeOfPayment</FormLabel>
            <Input type="text" name="ModeOfPayment"
                 onChange={handleChange} value={data.ModeOfPayment}/>
          </FormControl>
         <Button colorScheme={'blue'} variant={'solid'}  onClick={submitForm}>
              Submit
         </Button>
       </Stack>
    </Flex>
  ):(null)}
</Box>
)}
