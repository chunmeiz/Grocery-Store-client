import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Grid,GridItem,
  theme,
  Card,
  Heading,
  CardBody,Stack,Divider,
  Image,CardFooter,
  Button,ButtonGroup,
  Center,
  TableContainer,Table,TableCaption,Thead,Tr,Td,Tfoot,Th,Tbody,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Link
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {NavBar} from './components/NavBar'

import {Login} from './components/Login'
import {Logout} from './components/Logout'
import {Register} from './components/Register'
import {Home} from './components/Home'
import {Product} from './components/Product'
import {Order} from './components/Order'
import {Employee} from './components/Employee'
import {Cart} from './components/Cart'
import {CartLayout}  from  './components/shoppingCart/CartLayout.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider,useAuth  } from './components/AuthContext';
import { Sidebar } from './components/Sidebar.tsx';


function App() {
  // const { isLoggedIn } = useAuth();
  return (
    <AuthProvider>
    <ChakraProvider theme={theme}>
      
     <Box textAlign="center" fontSize="xl">
        {/* <Grid minH="100vh" p={6}> */}
        <ColorModeSwitcher justifySelf="flex-end" />
{/* -------------------------------------------------------------------- */}
      
      <Router>
        <Box display="flex">
          <Sidebar />
          <Box flexGrow={1} p={6}>
            <NavBar />
            <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/register" element={<Register/>} />
               <Route path="/login" element={<Login />} />
               <Route path="/logout" element={<Logout/>} />
               <Route path="/product" element={<Product/>} />
               <Route path="/order" element={<Order/>} />
               <Route path="/employee" element={<Employee/>} />
               <Route path="/cart" element={<Cart/>} />
               <Route path="/shoppingcart" element={<CartLayout/>} />
            </Routes>
          </Box>
        </Box>
     </Router>
    
    </Box>
    </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
