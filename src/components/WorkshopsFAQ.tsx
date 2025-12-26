"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { zoomInOut, viewportOptionsFast, staggerContainer, staggerItem } from "@/lib/animations";
import { faqStyles } from './styles/WorkshopsFAQ.styles';


interface FAQProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

const FAQ: React.FC<FAQProps> = ({ question, answer, isOpen, onToggle }) => {
    return (
        <motion.div 
            layout
            className={faqStyles.faqItem}
        >
            <div 
                className={faqStyles.questionWrapper}
                onClick={onToggle}
            >
                <h3 className={faqStyles.questionText}>{question}</h3>
                <div className={faqStyles.iconWrapper}>
                    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={faqStyles.answerWrapper}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className={faqStyles.answerText}>{answer}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const WorkshopsFAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "What is AI House?",
            answer: "AI House is a Community House for India's builders, not a co-working space. It's a dedicated hub for founders, student clubs, and engineers to collaborate, learn, and host events."
        },
        {
            question: "What are the operating hours?",
            answer: "We're open from 10 AM to 10 PM, every day of the week (Monday to Sunday) to match your schedule."
        },
        {
            question: "Is there a cost for students to visit?",
            answer: "General events and hackathons are usually free. Specific club activities depend on your campus club's partnership with us."
        },
        {
            question: "How can my student club use AI House?",
            answer: "Partner clubs can use the house as their event home to host hackathons, workshops, and meetups at no venue cost."
        },
        {
            question: "What does AI House offer founders?",
            answer: "We offer a vibrant community hub, not just desks. Get access to curated networking, mentorship, and a platform to run events and connect with investors and talent."
        },
        {
            question: "What support do you provide for events?",
            answer: "We provide community support: promotion to our network, help finding expert mentors/judges, and logistical collaboration to make your event a success."
        },
        {
            question: "How can I start as a student or engineer?",
            answer: "Join our public events! Attend a hackathon, workshop, or open house. Follow our socials for the calendar and jump into the community."
        },
        {
            question: "How does the internship/job help work?",
            answer: "By actively building and participating in hackathons here, you get noticed. We make direct referrals to our partner companies for standout talent."
        },
        {
            question: "Can you host workshops at our college?",
            answer: "Yes! For partner clubs, we can organize expert-led workshops (like our 3-Day GenAI workshop) on your campus through a collaborative model."
        },
        {
            question: "How is the community environment maintained?",
            answer: "Through a shared culture of building and helping others build. We focus on contribution and collaboration over just networking."
        }
    ];

    return (
        <motion.div
            className={faqStyles.section}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptionsFast}
            variants={zoomInOut}
            style={{ willChange: "transform, opacity" }}
        >
            <div className={faqStyles.container}>
                <motion.h2
                    className={faqStyles.title}
                    variants={staggerItem}
                >
                    FAQ
                </motion.h2>
                <motion.div
                    className={faqStyles.faqList}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOptionsFast}
                >
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            variants={staggerItem}
                        >
                            <FAQ
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WorkshopsFAQ;
