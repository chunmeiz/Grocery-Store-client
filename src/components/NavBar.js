import React,{useEffect} from 'react';
import {
    Button,
    Avatar,
    Flex,
    Heading,
    Spacer,
    useColorModeValue,
    useColorMode,
    Link,
    Breadcrumb,BreadcrumbItem,BreadcrumbLink
  } from "@chakra-ui/react";
  import {
    FiShoppingCart,
  } from 'react-icons/fi';
  
 import { useAuth } from './AuthContext';
  
  export function NavBar() {
    const navColor = useColorModeValue("gray.100", "gray.900");
    const { toggleColorMode } = useColorMode();
    const toggleText = useColorModeValue("dark", "light");
    const { isLoggedIn } = useAuth();
    console.log(isLoggedIn);
    
    // This useEffect run when isLoggedIn changes
    useEffect(() => {
      console.log("isLoggedIn has changed:", isLoggedIn);
     }, [isLoggedIn]);

    return (
      <Flex
        p="1em"
        bg={navColor}
        align="center"
        w="full"
        gap="10px"
        direction="row"
        as="nav"
      >
        {/* <Heading size="md"></Heading> */}
        <Spacer />

        <Button onClick={toggleColorMode} colorScheme="pink">
          Switch to {toggleText} mode
        </Button>
  
        {/* <Link to="/register"> */}
        <Breadcrumb spacing='8px' separator='' >
           <BreadcrumbItem>
             <BreadcrumbLink href='/shoppingcart'>
                <Button colorScheme="blue"><FiShoppingCart /></Button>
              </BreadcrumbLink>
           </BreadcrumbItem>

           <BreadcrumbItem>
             <BreadcrumbLink href='/'>
                <Button colorScheme="blue">Home</Button>
              </BreadcrumbLink>
           </BreadcrumbItem>

            
          
        {isLoggedIn?(
        <BreadcrumbItem>
             <BreadcrumbLink href='/logout'>
                <Button colorScheme="blue">Logout</Button>
              </BreadcrumbLink>
          </BreadcrumbItem>):(
            <Flex>
            <BreadcrumbItem>
            <BreadcrumbLink href='/register'>
               <Button colorScheme="blue">Register</Button>
             </BreadcrumbLink>
           </BreadcrumbItem>

            <BreadcrumbItem>
             <BreadcrumbLink href='/login'>
               <Button colorScheme="blue">Login</Button>
               </BreadcrumbLink>
            </BreadcrumbItem>
            </Flex>
          )}
      
        </Breadcrumb>
        {isLoggedIn?(
        <Avatar name={window.localStorage.getItem('Username')} src="" />):(
          <Avatar name={null} src="" />
        )}
      </Flex>
    );
  }
  