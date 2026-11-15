"use client";

import { MotionConfig } from "framer-motion";

import { Navbar } from "./_components/Navbar";
import { Hero } from "./_components/Hero";
import { Features } from "./_components/Features";
import { Analytics } from "./_components/Analytics";
import { HowItWorks } from "./_components/HowItWorks";
import { CallToAction } from "./_components/CallToAction";
import { Footer } from "./_components/Footer";

export default function Home() {
    return (
        // reducedMotion="user": no movement for people who ask for less of it
        <MotionConfig reducedMotion="user">
            <div className="min-h-screen bg-background font-sans text-foreground">
                <Navbar />
                <main>
                    <Hero />
                    <Features />
                    <Analytics />
                    <HowItWorks />
                    <CallToAction />
                </main>
                <Footer />
            </div>
        </MotionConfig>
    );
}
