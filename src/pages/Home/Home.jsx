
import Products from '../../components/products/Products'
import CategoriesSection from './../../components/categories/CategoriesSection';
import HeroSection from '../../components/hero/HeroSection';
import FeaturesSection from "../../components/features/FeaturesSection";


import { Box} from "@mui/material";
import NewsletterSection from '../../components/newsletterSection/NewsletterSection';
import TestimonialsSection from '../../components/testimonialsSection/TestimonialsSection';

export default function Home() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <Box id="categories">
                <CategoriesSection />
            </Box>
            <Products />
            <TestimonialsSection/>
            <NewsletterSection/>
            

        </>
    )
}