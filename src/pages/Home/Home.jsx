import { Typography } from '@mui/material'
import React from 'react'
import Products from '../../components/products/Products'
import CategoriesSection from './../../components/categories/CategoriesSection';

export default function Home() {
    return (
        <>
            <Typography component={'h2'}>home</Typography>
            <CategoriesSection/>
            <Products/>

        </>
    )
}