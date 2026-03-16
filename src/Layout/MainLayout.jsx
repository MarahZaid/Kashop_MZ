import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'
import { Toolbar } from "@mui/material";
export default function MainLayout() {
    return (
        <>
            <Navbar />
            <Toolbar /> 
            <Outlet />
            <Footer />
        </>
    )
}