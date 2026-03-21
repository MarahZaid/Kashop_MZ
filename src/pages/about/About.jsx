import Box from "@mui/material/Box";
import AboutHeroSection from "../../components/aboutHeroSection/AboutHeroSection";
import AboutStorySection from "../../components/aboutStorySection/AboutStorySection";
import ValuesSection from "../../components/valuesSection/ValuesSection";
import TeamSection from "../../components/teamSection/TeamSection";
import NewsletterSection from "../../components/newsletterSection/NewsletterSection";




export default function About() {


    return (
        <>
            <AboutHeroSection />
            <AboutStorySection />
            <ValuesSection />
            <TeamSection/>
            <NewsletterSection/>
        </>
    );
}
