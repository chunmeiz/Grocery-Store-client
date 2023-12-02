import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Heading,
  IconButton, 
} from '@chakra-ui/react';
import {ProductTable} from './ProductTable'
import {AddOrder} from './AddOrder'
import MainTable from './MainTable';

export const Order = () => {
    const columnTitles = ['OrderNo', 'OrderData', 'CustomerNo','ProductCode', 'ProductName', 'ProductQuantity', 'ProductPrice', 'Total', 'ModeOfPayment'];
    const tableCaption = 'Order table';
    const url = 'https://grocery-store-server-u9gz.onrender.com/orderItems';
    return (
      <ChakraProvider>
          <Heading size='lg'>Order</Heading>
          <AddOrder />
          <MainTable
            columnTitles={columnTitles}
            tableCaption={tableCaption}
            url={url}
          />
      </ChakraProvider>
      );
}
