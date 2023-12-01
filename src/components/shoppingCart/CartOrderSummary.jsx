import {
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    FormControl,
    Checkbox,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { FaArrowRight } from 'react-icons/fa'
  import { formatPrice } from './PriceTag'
  import { useState } from 'react'
  import { useNavigate } from 'react-router-dom';
  
  const OrderSummaryItem = (props) => {
    const { label, value, children } = props
    return (
      <Flex justify="space-between" fontSize="sm">
        <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
          {label}
        </Text>

        {value ? <Text fontWeight="medium">{value}</Text> : children}
      </Flex>
    )
  }
  
  export const CartOrderSummary = (props) => {
   const {cartData,onSaveCart} = props;
   console.log(cartData)
   const [paymentMethod, setPaymentMethod] = useState(''); // State to store the selected payment method

   const handleCheckboxChange = (event) => {
        setPaymentMethod(event.target.value);
   };

   let navigate = useNavigate();
   const onPlaceOrder= async () => {
         const token = window.localStorage.getItem('token');
    
         const currentDate = new Date();
         const formattedDate = currentDate.toLocaleDateString('en-GB', {
           year: 'numeric',
           month: '2-digit',
           day: '2-digit',
         });
  
       const sendData={
         customerName:localStorage.getItem('Username'),
         products:cartData,
         createdAt:formattedDate
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
           alert('Bad request!You can not place an order.');
           navigate("../login");
           throw new Error(`HTTP error! Status: ${res.status} - ${res.statusText}`);
          }
           return res.json();
       })
       .then ((data)=>{
                 alert(data.message);
          })
       .catch((error) => {
           console.error('Error:', error);
       })
   };
  
   
    return (
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md">Order Summary</Heading>
  
        <Stack spacing="6">
          <OrderSummaryItem label="Subtotal" value= {cartData && (
                formatPrice(cartData.reduce((acc, item) => acc + item.price * item.quantity, 0))
              )} />
          <OrderSummaryItem label="Mode Of Payment">
            {/* <Link href="#" textDecor="underline">
              Choose the Mode Of Payment
            </Link> */}
            <FormControl>
              <Stack direction="row" spacing="4">
                  <Checkbox
                    value="cash"
                    isChecked={paymentMethod === 'cash'}
                    onChange={handleCheckboxChange}
                  >
                    Cash
                  </Checkbox>
                  <Checkbox
                    value="online"
                    isChecked={paymentMethod === 'online'}
                    onChange={handleCheckboxChange}
                  >
                    Online
                  </Checkbox>
              </Stack>
            </FormControl>
         </OrderSummaryItem>
          {/* <OrderSummaryItem label="Coupon Code">
            <Link href="#" textDecor="underline">
              Add coupon code
            </Link>
          </OrderSummaryItem> */}
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              {cartData && (
                formatPrice(cartData.reduce((acc, item) => acc + item.price * item.quantity, 0))
              )}

              {/* {cartData?(cartData.map((item) => (formatPrice(total+=item.price*item.quantity)))
             ):(formatPrice(0))} */}
            </Text>
          </Flex>
        </Stack>
        <Button colorScheme="blue" size="lg" fontSize="md"  onClick={onSaveCart} rightIcon={<FaArrowRight />}>
          Save my cart
        </Button>
        <Button colorScheme="blue" size="lg" fontSize="md"  onClick={onPlaceOrder} rightIcon={<FaArrowRight />}>
          Place an order
        </Button>
      </Stack>
    )
  }