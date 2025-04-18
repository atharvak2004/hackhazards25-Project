import React from 'react'

function Footer() {
    return (
        <>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  text-sm w-full bg-white border-t z-50 p-10'>
                <div>
                    <p className='text-xl font-medium mb-5'>AI Mentor</p>
                    <p className='w-full md:w-2/3 text-gray-600'>Discover the latest trends with our e-commerce clothing store! We offer a wide range of stylish and high-quality apparel for men, women, and kids. Shop effortlessly with secure payments, fast delivery, and a seamless shopping experience. Upgrade your wardrobe today!</p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+91 9765208456</li>
                        <li>atharvakadam631@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center bottom-0'>Copyright 2025@  - All Right Reserved.</p>
            </div>
            </>
    );
}
export default Footer;