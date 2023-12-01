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
    const url = 'http://localhost:3000/cartItems';
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
