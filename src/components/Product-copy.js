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
 
} from '@chakra-ui/react';
import {Dashboard} from './Dashboard'
import {ProductTable} from './ProductTable'
import { useAuth } from './AuthContext';

export function Product() {
  // const { isLoggedIn } = useAuth();
  // console.log(isLoggedIn);

  return (
<div>
{/* {isLoggedIn ? <Dashboard />:null} */}
<Heading size='md'>Product</Heading>
<ProductTable />
{/* <TableContainer>
  <Table variant='striped' colorScheme='teal' size='lg'>
    <TableCaption>Products Table</TableCaption>
    <Thead>
      <Tr>
        <Th>Product Code</Th>
        <Th>Product name</Th>
        <Th>Product_price</Th>
        <Th>Quantity</Th>
        <Th></Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        
        <Td>inches</Td>
        <Td>25.4</Td>
        <Td><Button>Edit</Button></Td>
        <Td><Button>Delete</Button></Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        
        <Td>inches</Td>
        <Td>30.48</Td>
        <Td><Button>Edit</Button></Td>
        <Td><Button>Delete</Button></Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        
        <Td>inches</Td>
        <Td>0.91444</Td>
        <Td><Button>Edit</Button></Td>
        <Td><Button>Delete</Button></Td>
      </Tr>
    </Tbody> 
  </Table>
</TableContainer> */}
</div>
    )}
