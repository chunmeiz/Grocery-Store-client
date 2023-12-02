import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Heading,
  IconButton, 
} from '@chakra-ui/react';
import {ProductTable} from './ProductTable'
import {AddCart} from './AddCart'
import MainTable from './MainTable';

export const Cart = () => {
    const columnTitles = ['customerName', 'products', 'createdAt'];
    const tableCaption = 'Cart table';
    const url = 'https://grocery-store-server-u9gz.onrender.com/cartItems';
    return (
      <ChakraProvider>
          <Heading size='lg'>Cart</Heading>
          <AddCart />
          <MainTable
            columnTitles={columnTitles}
            tableCaption={tableCaption}
            url={url}
          />
      </ChakraProvider>
      );
}
