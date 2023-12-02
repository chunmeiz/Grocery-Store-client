import React,{useState} from 'react';
import {
  Text,
  Grid,GridItem,
  Card,
  Heading,
  CardBody,Stack,Divider,
  Image,CardFooter,
  Button,ButtonGroup,
  Center,
  Flex
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


export function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
 

  const handleAddtoCartClick = (product,index) => {
    if(isLoggedIn){
      console.log("User is logged in");
      // User is logged in, navigate to shoppingCart with product data
      navigate('/shoppingcart', { state: { productData: product} });
    }else{
      navigate('/login');}
  };
  
  const handleBuyClick = (product) => {
    if(isLoggedIn) {
      console.log("User is logged in");
      navigate('/shoppingcart', { state: { productData: product} })
    }else{navigate('/login')}
  };

 const productItems=[
  { ProductCode: 1, ProductName: 'Edible oil', Product_price:50, ImageSrc: '/images/Edible oil.jpg' ,description:'organic',currency:'USD', quantity:1},
  { ProductCode: 2, ProductName: 'Cornflakes', Product_price:20, ImageSrc: '/images/Cornflakes.jpg', description:'high fribr',currency:'USD',quantity:1 },
  { ProductCode: 4, ProductName: 'P_Biscuits', Product_price:30, ImageSrc: '/images/P_Biscuits.jpg',description:'crispy', currency:'USD',quantity:1 },
  { ProductCode: 9, ProductName: 'shampoo', Product_price:50, ImageSrc: '/images/shampoo.jpg', description:'fragrant', currency:'USD',quantity:1},
  { ProductCode: 6, ProductName: 'Toothbrush', Product_price:60, ImageSrc: '/images/Toothbrush.jpg', description:'manual',currency:'USD',quantity:1 },
  { ProductCode: 10, ProductName: 'Drink', Product_price:30, ImageSrc: '/images/Drink.jpeg' , description:'carbohydrate',currency:'USD',quantity:1},
] 

return (
  <Flex>
        
   <Heading size='md'>Home</Heading>
  <Grid
   h='200px'
   templateRows='repeat(2, 1fr)'
   templateColumns='repeat(3, 1fr)'
   gap={8}
   p={10}
  >
{productItems.map((product, index) => (
<GridItem key={index} rowSpan={1} colSpan={1}  bg='' >
<Card maxW='sm' index='1'>
  <CardBody>
   <Center> <Image
      src={product.ImageSrc}
      alt={product.ProductName}
      borderRadius='lg'
    /></Center>
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{product.ProductName}</Heading>
      <Text>
        The {product.ProductName} is {product.description}.
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        {product.Product_price} 
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'  onClick={() =>handleBuyClick(product,index)}>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue' onClick={() =>handleAddtoCartClick(product,index)}>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</GridItem>
))}
{/* <GridItem rowSpan={1} colSpan={1} bg='' >
  <Card maxW='sm'>
  <CardBody>
    <Center><Image
      src='/images/Cornflakes.jpg'
      alt='Cornflakes'
      borderRadius='lg'
    /></Center>
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Cornflakes</Heading>
      <Text size='xs' fontSize='0.5xl'>
        This Cornflakes is perfect for your healthy breakfast.
        
      </Text>
      <Text color='orange.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={() =>handleBuyClick()}>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue' onClick={() =>handleAddtoCartClick()}>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</GridItem>

<GridItem rowSpan={1} colSpan={1}  bg='' >
<Card maxW='sm'>
  <CardBody>
   <Center> <Image
      src='/images/P_Biscuits.jpg'
      alt='P_Biscuits'
      borderRadius='lg'
    /></Center>
    <Stack mt='6' spacing='3'>
      <Heading size='md'>P_Biscuits</Heading>
      <Text>
        This P_Biscuits is perfect for your breaktime.
        space 
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={() =>handleBuyClick()}>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue' onClick={() =>handleAddtoCartClick()}>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</GridItem>

<GridItem rowSpan={1} colSpan={1}  bg='' >
<Card maxW='sm'>
  <CardBody>
   <Center> <Image
      src='/images/shampoo.jpg'
      alt='shampoo'
      borderRadius='lg'
    /></Center>
    <Stack mt='6' spacing='3'>
      <Heading size='md'>shampoo</Heading>
      <Text>
        This shampoo is perfect for hair.
         
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={() =>handleBuyClick()}>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'  onClick={() =>handleAddtoCartClick()}>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</GridItem>

<GridItem rowSpan={1} colSpan={1} bg='' >
  <Card maxW='sm'>
  <CardBody>
    <Center><Image
      src='/images/toothbrush.jpg'
      alt='toothbrush'
      borderRadius='lg'
    /></Center>
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Toothbrush</Heading>
      <Text size='xs' fontSize='0.5xl'>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces
      </Text>
      <Text color='orange.600' fontSize='2xl'>
        $45
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={() =>handleBuyClick()}>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'  onClick={() =>handleAddtoCartClick()}>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</GridItem>

<GridItem rowSpan={1} colSpan={1} bg='' >
  <Card maxW='sm'>
  <CardBody>
    <Center><Image
      src='/images/Drink.jpeg'
      alt='Drink'
      borderRadius='lg'
    /></Center>
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Drink</Heading>
      <Text size='xs' fontSize='0.5xl'>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces
      </Text>
      <Text color='orange.600' fontSize='2xl'>
        $45
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={() =>handleBuyClick()}>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'  onClick={() =>handleAddtoCartClick()}>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</GridItem> */}

</Grid>

</Flex>
)}
