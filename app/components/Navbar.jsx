import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const Navbar = () => {
    const [isScroll, setIsScroll] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sideMenuRef = useRef();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        // Cleanup event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Handle mobile menu
    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Effect untuk mengontrol transform menu mobile
    useEffect(() => {
        if (sideMenuRef.current) {
            if (isMenuOpen) {
                sideMenuRef.current.style.transform = 'translateX(-16rem)';
            } else {
                sideMenuRef.current.style.transform = 'translateX(16rem)';
            }
        }
    }, [isMenuOpen]);

    // Close menu when clicking outside (optional)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && sideMenuRef.current && 
                !sideMenuRef.current.contains(event.target) &&
                !event.target.closest('button[aria-label="Open menu"]')) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <>
            {/* Background Image */}
            <div className='fixed top-0 right-0 w-11/12 -z-10 -translate-y-[80%] pointer-events-none'>
                <Image 
                    alt='Header background' 
                    src={assets.header_bg_color} 
                    className='w-full'
                    width={1200}
                    height={600}
                    priority
                />
            </div>

            {/* Main Navbar */}
            <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex 
            items-center justify-between z-50 transition-all duration-300
            ${isScroll ? "bg-white/50 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
                
                {/* Logo */}
                <a href="#top" className='flex items-center'>
                    <Image 
                        src={assets.logo} 
                        className='w-28 cursor-pointer' 
                        alt='Logo'
                        width={112}
                        height={40}
                        priority
                    />
                </a>

                {/* Desktop Navigation */}
                <ul className={`hidden md:flex items-center gap-6 lg:gap-8
                rounded-full px-12 py-3 transition-all duration-300
                ${isScroll ? "bg-white/70 backdrop-blur-sm shadow-sm" : "bg-white/50 backdrop-blur-sm shadow-sm"}`}>
                    <li><a className='font-ovo hover:text-darkTheme transition-colors' href="#top">Home</a></li>
                    <li><a className='font-ovo hover:text-darkTheme transition-colors' href="#about">About me</a></li>
                    <li><a className='font-ovo hover:text-darkTheme transition-colors' href="#services">Services</a></li>
                    <li><a className='font-ovo hover:text-darkTheme transition-colors' href="#work">My Work</a></li>
                    <li><a className='font-ovo hover:text-darkTheme transition-colors' href="#contact">Contact Me</a></li>
                </ul>

                {/* Right Section */}
                <div className='flex items-center gap-4'>
                    {/* Dark Mode Toggle */}
                    <button className='p-2 cursor-pointer rounded-full transition-colors'>
                        <Image 
                            alt='Dark mode toggle' 
                            src={assets.moon_icon} 
                            className='w-6 h-6'
                            width={24}
                            height={24}
                        />
                    </button>

                    {/* Contact Button (Desktop) */}
                    <a className='hidden lg:flex items-center gap-3 px-10 py-2.5 border
                    border-darkTheme rounded-full ml-4 font-ovo hover:bg-darkTheme 
                    hover:text-white transition-colors duration-300' 
                    href="#contact">
                        Contact 
                        <Image 
                            src={assets.arrow_icon} 
                            className='w-3 h-3'
                            alt='Arrow icon'
                            width={12}
                            height={12}
                        />
                    </a>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={openMenu}
                        className='block md:hidden ml-3 p-2 cursor-pointer rounded-full transition-colors'
                        aria-label="Open menu"
                    >
                        <Image 
                            alt='Menu' 
                            src={assets.menu_black} 
                            className='w-6 h-6'
                            width={24}
                            height={24}
                        />
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div 
                        className='fixed inset-0  z-40 md:hidden'
                        onClick={closeMenu}
                    ></div>
                )}

                {/* Mobile Menu Panel */}
                <ul 
                    ref={sideMenuRef}
                    className='flex md:hidden flex-col gap-6 py-24 px-8 fixed top-0 -right-64
                    w-64 z-50 h-screen bg-lightHover shadow-2xl transition-transform duration-500 ease-in-out'
                >
                    {/* Close Button */}
                    <button 
                        onClick={closeMenu}
                        className='absolute right-6 top-6 p-2 hover:bg-lightHover rounded-full transition-colors'
                        aria-label="Close menu"
                    >
                        <Image 
                            alt='Close' 
                            src={assets.close_black} 
                            className='w-5 h-5'
                            width={20}
                            height={20}
                        />
                    </button>

                    {/* Menu Items */}
                    <li>
                        <a className='font-ovo text-xl hover:text-darkTheme transition-colors block py-3 border-b border-gray-100' 
                           onClick={closeMenu} 
                           href="#top">Home</a>
                    </li>
                    <li>
                        <a className='font-ovo text-xl hover:text-darkTheme transition-colors block py-3 border-b border-gray-100' 
                           onClick={closeMenu} 
                           href="#about">About me</a>
                    </li>
                    <li>
                        <a className='font-ovo text-xl hover:text-darkTheme transition-colors block py-3 border-b border-gray-100' 
                           onClick={closeMenu} 
                           href="#services">Services</a>
                    </li>
                    <li>
                        <a className='font-ovo text-xl hover:text-darkTheme transition-colors block py-3 border-b border-gray-100' 
                           onClick={closeMenu} 
                           href="#work">My Work</a>
                    </li>
                    <li>
                        <a className='font-ovo text-xl hover:text-darkTheme transition-colors block py-3 border-b border-gray-100' 
                           onClick={closeMenu} 
                           href="#contact">Contact Me</a>
                    </li>
                    
                    
                </ul>
            </nav>
        </>
    )
}

export default Navbar