import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white border-t border-gray-800 mt-12">
            <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-black mb-2">Foodie</h3>
                    <p className="text-sm text-gray-300">Delivering delicious food experiences. Manage restaurants, menus and orders with ease.</p>
                </div>

                <div>
                    <h4 className="font-bold mb-3">Quick Links</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li><a href="/about" className="hover:underline">About Us</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                        <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
                        <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-3">Contact</h4>
                    <div className="flex items-center gap-3 text-gray-300 text-sm mb-2"><MapPin size={16} /> Tops ahmedabad</div>
                    <div className="flex items-center gap-3 text-gray-300 text-sm mb-2">
                        <Phone size={16} />
                        <a href="tel:+919351265645" className="hover:underline">+91 93512 65645</a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 text-sm mb-2">
                        <Mail size={16} />
                        <a href="mailto:Amansolanki073@gmail.com" className="hover:underline">Amansolanki073@gmail.com</a>
                    </div>

                    <div className="flex items-center gap-3 text-gray-300 text-sm mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
                            <path d="M12.04 2C6.48 2 2 6.48 2 12.04c0 2.11.62 4.07 1.69 5.7L2 22l4.56-1.44A10.02 10.02 0 0012.04 22C17.6 22 22 17.52 22 11.96 22 6.4 17.6 2 12.04 2zM12 20c-1.83 0-3.55-.5-5.04-1.36l-.36-.21-2.7.85.86-2.62-.23-.38A8 8 0 014 12.04C4 7.58 7.58 4 12.04 4 16.5 4 20 7.58 20 12.04 20 16.5 16.5 20 12 20z"/>
                            <path d="M17.5 14.6c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.76.97-.93 1.17c-.17.2-.34.22-.63.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.12.3-.32.45-.48.15-.15.2-.26.3-.43.1-.17.05-.32-.02-.47-.07-.15-.67-1.6-.92-2.19-.24-.57-.49-.49-.67-.5l-.57-.01c-.2 0-.52.07-.79.32-.27.26-1.03 1.01-1.03 2.47 0 1.46 1.05 2.88 1.2 3.08.15.2 2.06 3.28 5 4.6 2.94 1.32 3.06 1.06 3.61 1 .55-.06 1.77-.72 2.02-1.41.25-.69.25-1.29.18-1.41-.07-.12-.27-.2-.57-.35z"/>
                        </svg>
                        <a href="https://api.whatsapp.com/send?phone=919351265645&text=Hi" target="_blank" rel="noopener noreferrer" className="hover:underline">Chat on WhatsApp</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <a href="#" className="text-gray-300 hover:text-white"><Facebook size={18} /></a>
                        <a href="#" className="text-gray-300 hover:text-white"><Instagram size={18} /></a>
                        <a href="#" className="text-gray-300 hover:text-white"><Twitter size={18} /></a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-6">
                <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-400">© {new Date().getFullYear()} Foodie. All rights reserved.</div>
            </div>
        </footer>
    );
};

export default Footer;
