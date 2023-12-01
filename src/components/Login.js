'use client'
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react'
import React,{ useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

//  import {AuthContext} from './AuthContext';
import { useAuth } from './AuthContext';


export function Login() {
  const { isLoggedIn,login, firstLogin } = useAuth();
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['cartData']);
  // Check if the user is already logged in
  // React.useEffect(() => {
  //   if (isLoggedIn) {
      // If logged in, redirect to the product page
  //     navigate("../product");
  //   }
  // }, [isLoggedIn, navigate]);

    // const { isLoggedIn, login } = useAuth();
    // let navigate =useNavigate();
    const[Username, setUsername]=useState("");
    const[Password, setPassword]=useState("");
    const [error, setError] = useState('');
    // const { isAuthenticated, login, logout,isMember,member, admin } = useContext(AuthContext);
  
    const submitForm=(e)=>{
        e.preventDefault();
        // Perform client-side validation
    if (Password.length < 3) {
    // Display an error message to the user
        setError('Password must be at least 3 characters long');
        return; // Exit the function to prevent the request
    }
    // If validation passes, proceed with the request
        loginUser();
        setUsername("");
        setPassword("");
        setError("")
    }

    const loginUser=() =>{
       
        console.log({Username,Password});
        
        fetch('http://localhost:3000/login',{
            method:"POST",
            body:JSON.stringify({
                Username,
                Password,
            }),
            headers:{
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            if (res.status === 401) {
                // Validation error occurred on the server
                 return res.json(); 
               }
            return res.json();
        })
        .then ((data)=>{
            // console.log(data.error[0].msg)
            if (data.error) {
                // Handle validation errors
                setError(data.error[0].msg)
              } else {
                console.log(data.token);
                alert( data.message);
                window.localStorage.setItem('token',data.token);
                window.localStorage.setItem('Username',data.employee.Username);

                const storedCartData = cookies.cartData ? JSON.parse(cookies.cartData) : [];
                window.localStorage.setItem('cartData', JSON.stringify(storedCartData));

                console.log(isLoggedIn);
                login();
                
                // navigate("../product"); 
                console.log(firstLogin);
                // if (firstLogin) {
                  navigate("../");
                // } else {
                //   navigate(-1);
                // }
                 }    
           })
           .catch((error) => {
            console.error('Error:', error);
            
       })
       }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="Username">
            <FormLabel>Username</FormLabel>
            <Input type="text" name="Username" placeholder="Enter Username here" 
                onChange={(e)=> setUsername(e.target.value)} value={Username} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" name="Password" placeholder="Enter password here" 
                 onChange={(e)=> setPassword(e.target.value)} value={Password}/>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'}  onClick={submitForm}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      {/* <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex> */}
    </Stack>
  )
}