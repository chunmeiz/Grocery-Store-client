import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Heading,
  IconButton, 
} from '@chakra-ui/react';
import {ProductTable} from './ProductTable'
import {AddProduct} from './AddProduct'
import MainTable from './MainTable';

export const Product = () => {
    const pcolumnTitles = ['Product Code', 'Product Name', 'Product Quantity', 'Product_price'];
    const ptableCaption = 'Product table';
    const purl = 'https://grocery-store-server-u9gz.onrender.com/productItems';

return (
<ChakraProvider>
   <Heading size='lg'>Product</Heading>
   <AddProduct />
   <MainTable
            columnTitles={pcolumnTitles}
            tableCaption={ptableCaption}
            url={purl}
          />
</ChakraProvider>
 )}
