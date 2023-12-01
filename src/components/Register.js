'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


export  function Register(props) {
  
  const { isLoggedIn } = useAuth();
  let navigate = useNavigate();

  // Check if the user is already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      // If logged in, redirect to the product page
      navigate("../product");
    }
  }, [isLoggedIn, navigate]);
  

    const [showPassword, setShowPassword] = useState(false)
    const[data, setData]=useState({
        Username:"",
        Password:"",
        
    })
    const handleChange=(e)=>{
        setData({ ...data, [e.target.name]:e.target.value});
        //console.log(data);
    }

    const submitForm=(e)=>{
        e.preventDefault();
        registerUser();
        setData({       
        Username:"",
        Password:"",
        
        });
    }
    const registerUser=() =>{
        const sendData={
            Username:data.Username,
            Password:data.Password,
            // MemberType:data.MemberType
        }
        console.log(sendData);
        fetch('http://localhost:3000/register',{
            method:"POST",
            body:JSON.stringify(sendData),
            headers:{
                'Content-Type': 'application/json',
            },
        })
        .then((res)=>{
            return res.json();
        })
        .then ((data)=>{
           
                  alert(data.message);
                  //  navigate(Login);
                  window.localStorage.setItem('Username',data.employee.Username);
                  navigate("../login"); 
           })
        .catch((error) => {
            console.error('Error:', error);
       })
    }




  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Welcome to our grocery store ✌️
          </Text>
        </Stack>
         
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="Username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" name="Username" onChange={handleChange} value={data.Username}/>
                </FormControl>
                {/* <FormControl id="MemberType" isRequired>
                  <FormLabel>MemberType</FormLabel>
                  <Input type="text" name="MemberType" onChange={handleChange} value={data.MemberType} />
                </FormControl> */}
              </Box>
              
            </HStack>
            
            <FormControl id="Password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="Password" onChange={handleChange} value={data.Password} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }} onClick={submitForm}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link to="/login" color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
        
      </Stack>
    </Flex>
  )
}
