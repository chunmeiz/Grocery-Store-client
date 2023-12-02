import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Heading,
  IconButton, 
} from '@chakra-ui/react';
import {AddEmployee} from './AddEmployee'
import MainTable from './MainTable';

export function Employee  ()  {
    const columnTitles = ['Empid', 'Username', 'Password'];
    const tableCaption = 'Employee table';
    const url = 'https://grocery-store-server-u9gz.onrender.com/employeeItems';
    return (
      <ChakraProvider>
          <Heading size='lg'>Employee</Heading>
          <AddEmployee />
          <MainTable
            columnTitles={columnTitles}
            tableCaption={tableCaption}
            url={url}
          />
      </ChakraProvider>
      );
}
