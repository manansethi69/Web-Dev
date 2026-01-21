/**
 * This is a component which displays About Us page
 * @author Chetan Anand
 */
"use client";

import React from 'react';
import './AboutUs.css'
import { Metadata } from "next";
import { motion } from "motion/react";


//import aycBoats from '../img/aycBoats.jpg';

class AboutUs extends React.Component{
    render(){
        return(<div className='aboutPage'>
                <div className='slidingImage'></div>
                <div className='backgroundImage'>
                    <motion.div
                        className="main"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        <div>
                            <h2>ABOUT THIS PROJECT</h2>
                            <p>The purpose of this project is to preserve the rich local history of the Armdale Yacht Club and to share artifacts, stories, and historical materials with the community. We aim to create an accessible digital archive that celebrates the heritage of AYC and ensures that future generations can explore and appreciate its legacy.</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="main"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        <div>
                            <h2>ABOUT US</h2>
                            <p>The Armdale Yacht Club (AYC) extends a warm welcome to Members,
                                Visiting Yachts, their Crews and Non-Members alike. The AYC offers
                                a complete range of facilities and services to meet the needs of todays
                                yachtsperson, their families, friends and guests.</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="main"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        <div className='about-desc'>
                            <h2>MISSION</h2>
                            <p>We are a boating community, inspiring belonging and celebrating diversity.
                                We are a destination of choice locally and internationally.
                                We are dedicated to enhancing safe boating and sea skills among the
                                Halifax community, and embrace our stewardship of the natural and
                                cultural heritage of our Melville Island home.</p>

                            <h2>VISION</h2>
                            <p>Armdale Yacht Club is recognized for inspiring excellence in our maritime
                                boating community and for its exemplary role as a steward of Melville Island's
                                unique natural and cultural heritage.</p>

                            <h2>VALUES</h2>
                            <p><b>Respect for our Team -</b> We value our dedicated team members and
                                all the volunteers that give their time and resources for our collective enjoyment.</p>
                            <p><b>Accountable -</b> We are thankful for what we have been bestowed and will act as stewards
                                to preserve the heritage of this great space.</p>
                            <p><b>Seamanship -</b> We have a love of the sea and everything that is boating. We value skill
                                development through boating programs and events, always safely while continuing our
                                competition heritage.</p>
                            <p><b>Member Satisfaction -</b> We are committed to meeting the evolving needs of our diverse
                                membership. We will always foster a friendly Club atmosphere for our members and guests.</p>
                            <p><b>Community Minded -</b> We are here to serve and improve our boating community as well as
                                local, municipal, provincial and federal communities.</p>
                        </div>
                    </motion.div>
                </div>
                <div className='slidingImage'></div>

            </div>
        );
    }
}

export default AboutUs;
