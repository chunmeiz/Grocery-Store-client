import {
    Box,
    Flex,
    Heading,
    HStack,
    
    Stack,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { CartItem } from './CartItem'
  import { CartOrderSummary } from './CartOrderSummary'
  // import { cartData } from './_data'
  import { Link as ChakraLink } from '@chakra-ui/react';
  import { Link as ReactRouterLink } from 'react-router-dom';
  import { useLocation } from 'react-router-dom';
  import { useEffect,useState } from 'react'
  import { useNavigate } from 'react-router-dom';

  const getCartDataFromStorage = () => {
    const storedData = localStorage.getItem('cartData');
    return storedData ? JSON.parse(storedData) : [];
  };
  
  export const CartLayout = () => {
    const location = useLocation();
    // let productData = location.state?.productData;
    const [productData, setProductData] = useState(location.state?.productData); 
    const [cartData, setCartData] = useState(getCartDataFromStorage());
    console.log(productData);
    console.log(cartData);

    useEffect(() => {
      if (productData) {
        // Check if the product is already in the cart
        const existingProduct = cartData.find(item => item.id === productData.ProductCode);
    
        if (existingProduct) {
          // If the product is already in the cart, update its quantity
          const updatedCartData = cartData.map(item =>
            item.id === existingProduct.id ? { ...item, quantity: item.quantity + productData.quantity } : item
          );
    
          setCartData(updatedCartData);
          localStorage.setItem('cartData', JSON.stringify(updatedCartData));
        } else {
          // If the product is not in the cart, add it
          const updatedCartData = [
            ...cartData,
            {
              id: productData.ProductCode,
              price: productData.Product_price,
              currency: productData.currency,
              name: productData.ProductName,
              description: productData.description,
              quantity: productData.quantity,
              imageUrl: productData.ImageSrc,
            },
          ];
    
          setCartData(updatedCartData);
          localStorage.setItem('cartData', JSON.stringify(updatedCartData));
          setProductData(null);
        }
      }
    }, [productData]);

    console.log(cartData);

 const onChangeQuantity =(productId, newQuantity)=>{
   console.log(newQuantity);
   console.log(cartData);
    let updatedCartData = cartData.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    // cartData = updatedCartData;
    setCartData(updatedCartData);
    localStorage.setItem('cartData', JSON.stringify(updatedCartData));
    console.log(cartData);
    console.log("Quantity updated for product with ID", productId);
 }
 const onClickDelete =(productId)=>{
    const updatedCartData = cartData.filter((item) => item.id !== productId);
    // cartData = updatedCartData;
    setCartData(updatedCartData);
    localStorage.setItem('cartData', JSON.stringify(updatedCartData));
    console.log("Product deleted with ID", productId);
    console.log(cartData);
 }

//place an order
let navigate = useNavigate();
const onSaveCart= async () => {
  const token = window.localStorage.getItem('token');
  
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

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



  return(
    <Box
      maxW={{
        base: '3xl',
        lg: '7xl',
      }}
      mx="auto"
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12',
      }}
    >
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        align={{
          lg: 'flex-start',
        }}
        spacing={{
          base: '8',
          md: '16',
        }}
      >
        <Stack
          spacing={{
            base: '8',
            md: '10',
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart  ({cartData.length} items)
          </Heading>
  
          <Stack spacing="6">
            {cartData.map((item) => (
              <CartItem 
                {...item}
                onChangeQuantity={onChangeQuantity}
                onClickDelete={onClickDelete}
              />
            ))}
          </Stack>
        </Stack>
  
        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary 
             cartData={cartData}
             onSaveCart={onSaveCart}
          />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <ChakraLink as={ReactRouterLink} to="../" color={mode('blue.500', 'blue.200')}>Continue shopping</ChakraLink>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  )
 }