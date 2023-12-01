import React from 'react';
import {
    Breadcrumb,BreadcrumbItem,BreadcrumbLink
  } from "@chakra-ui/react";


export function Dashboard() {
    return(
        <nav backgroundcolor=''>
          <Breadcrumb spacing='8px' separator='-' >
            <BreadcrumbItem>
              <BreadcrumbLink href='/product'>Product</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href='/user'>Users</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href='/order'>Orders</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href='/cart'>Carts</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
      </nav>
    )
}