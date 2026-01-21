"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import './Footer.css';
import { motion } from "motion/react";


function Footer() {
  return (
    <>
      <motion.footer
  className="ayc-footer"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
        >

        <motion.div
  className="footer-content"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true }}
>

          <div className="footer-content">
            <div className="footer-section">
              <h2>ABOUT US</h2>
              <p className="para">
                The Armdale Yacht Club (AYC) extends a warm welcome to Members, Visiting Yachts, their Crews and Non-Members alike. The AYC offers a complete range of facilities and services to meet the needs of today's yachtsperson, their families, friends and guests.
              </p>

              <div className='Connect'>
                <h2 id="connect-heading">CONNECT WITH US</h2>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <a href="https://www.facebook.com/armdaleyachtclub/" target="_blank" rel="noopener noreferrer">
                    <img className="social-icons" src="/img/facebook.webp" alt="Facebook" />
                  </a>
                  <a href="https://www.instagram.com/armdaleyachtclub/" target="_blank" rel="noopener noreferrer">
                    <img className="social-icons" src="/img/instagram.webp" alt="Instagram" />
                  </a>
                  <a href="mailto:office@armdaleyachtclub.ns.ca">
                    <img className="social-icons" src="/img/email.webp" alt="Email" />
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-section">
              <h2>NAVIGATION</h2>
              <nav>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/gallery">Gallery</Link>
                <Link href="/map">Map</Link>
                <Link href="/timeline">Timeline</Link>
                <Link href="/exhibits">Stories</Link>
                <Link href="/admin/login" className="login">🔒 Login</Link>
              </nav>
            </div>

            <div className="footer-section">
              <h2>CONTACT</h2>
              <p><strong>Office Location</strong><br />75 Burgee Run<br />Halifax, NS B3P 0C9</p>
              <p><strong>Telephone:</strong> <a href="tel:9024774617">(902) 477-4617</a></p>
              <p><strong>Email:</strong> <a href="mailto:office@armdaleyachtclub.ns.ca">office@armdaleyachtclub.ns.ca</a></p>
            </div>
          </div>
        </motion.div>
      </motion.footer>
      <div className="footer-bottom">
        <p className="mb-0">Copyright © 2025 Armdale Yacht Club - All rights reserved</p>
      </div>
    </>
  );
}

export default Footer;
