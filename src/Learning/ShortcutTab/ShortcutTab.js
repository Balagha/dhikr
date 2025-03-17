import React, { useState, useRef, useEffect } from 'react';

const ShortcutTab = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Toggle dropdown menu
    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative flex justify-end items-center gap-4 mr-4">
            {/* Left group: Gmail, Images, Search Labs */}
            <div className="flex items-center gap-4">
                <a
                    href="https://mail.google.com"
                    target="_self"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 hover:underline px-2 py-1 rounded-sm transition-colors duration-200 hover:bg-gray-100"
                >
                    Gmail
                </a>
                <a
                    href="https://www.google.com/imghp"
                    target="_self"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 hover:underline px-2 py-1 rounded-sm transition-colors duration-200 hover:bg-gray-100"
                >
                    Images
                </a>
                <a
                    href="https://labs.google.com/search/"
                    target="_self"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                    {/* Refactored Search Labs Icon */}
                    <svg className="gb_E text-gray-600" focusable="false" height="24px" viewBox="0 -960 960 960" width="24px">
                        <path
                            d="M209-120q-42 0-70.5-28.5T110-217q0-14 3-25.5t9-21.5l228-341q10-14 15-31t5-34v-110h-20q-13 0-21.5-8.5T320-810q0-13 8.5-21.5T350-840h260q13 0 21.5 8.5T640-810q0 13-8.5 21.5T610-780h-20v110q0 17 5 34t15 31l227 341q6 9 9.5 20.5T850-217q0 41-28 69t-69 28H209Zm221-660v110q0 26-7.5 50.5T401-573L276-385q-6 8-8.5 16t-2.5 16q0 23 17 39.5t42 16.5q28 0 56-12t80-47q69-45 103.5-62.5T633-443q4-1 5.5-4.5t-.5-7.5l-78-117q-15-21-22.5-46t-7.5-52v-110H430Z"></path>
                    </svg>
                </a>

            </div>

            {/* Right group: Grid Icon with Dropdown */}
            <div className="relative">
                <button
                    onClick={toggleMenu}
                    className="flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                    {/* 3x3 Grid Icon */}
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="3" y="3" width="4" height="4" fill="currentColor" />
                        <rect x="10" y="3" width="4" height="4" fill="currentColor" />
                        <rect x="17" y="3" width="4" height="4" fill="currentColor" />
                        <rect x="3" y="10" width="4" height="4" fill="currentColor" />
                        <rect x="10" y="10" width="4" height="4" fill="currentColor" />
                        <rect x="17" y="10" width="4" height="4" fill="currentColor" />
                        <rect x="3" y="17" width="4" height="4" fill="currentColor" />
                        <rect x="10" y="17" width="4" height="4" fill="currentColor" />
                        <rect x="17" y="17" width="4" height="4" fill="currentColor" />
                    </svg>
                    {/* Downward Arrow */}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="ml-1 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div
                        ref={menuRef}
                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                    >
                        <a
                            href="https://drive.google.com/drive/home"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Drive
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShortcutTab;
