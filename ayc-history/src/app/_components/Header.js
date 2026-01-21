"use client";

import './Header.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from "motion/react"; // ← import de motion

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setIsAdmin(user.role === "Superadmin" || user.role === "Maintainer");
    }, []);

    return (
        <motion.header
            className='site-header'
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className='container'>
                <div className='logo-title'>
                    <Link href="/" className='removeUnderLine'>
                        <div className="logo-container">
                            <img src="/img/ayc-logo-white.png" alt="AYC Logo" className="logo" />
                            <div className="logo-text">
                                <h1>ARMDALE YACHT CLUB</h1>
                                <h4>Historic Artifact Archive</h4>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>

                <motion.nav
                    id="links"
                    className={menuOpen ? "open" : ""}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link href="/" onClick={() => setMenuOpen(false)}>HOME</Link>
                    <Link href="/about" onClick={() => setMenuOpen(false)}>ABOUT</Link>
                    <Link href="/gallery" onClick={() => setMenuOpen(false)}>GALLERY</Link>
                    <Link href="/map" onClick={() => setMenuOpen(false)}>MAP</Link>
                    <Link href="/timeline" onClick={() => setMenuOpen(false)}>TIMELINE</Link>
                    <Link href="/exhibits" onClick={() => setMenuOpen(false)}>STORIES</Link>
                    {isAdmin && <Link href="/admin" onClick={() => setMenuOpen(false)}>ADMIN</Link>}
                </motion.nav>
            </div>
        </motion.header>
    );
}

export default Header;
