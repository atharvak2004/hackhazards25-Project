import React from 'react'

function Footer() {
    return (
        <>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  text-sm w-full bg-white border-t z-50 p-10'>
                <div>
                    <p className='text-xl font-medium mb-5'>Skillora.io</p>
                    <p className='w-full md:w-2/3 text-gray-600'>Skillora.io is a real-time mentorship and learning platform connecting students with expert mentors. It features session booking, skill trend tracking, and community-based peer Circles. With public and private chat spaces, role-based access, and profile management, it fosters collaborative growth, skill discovery, and meaningful mentor-student interactions.</p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>PROJECT</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Team EvoCoders</li>
                        <li>------------------</li>

                        <li>Members:</li>
                        <li> - Atharva Kadam</li>
                        <li> - Divya .</li>
                        <li> - Mansha Pandey</li>
                        <li> - Shivansh Goel</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center bottom-0'>Copyright 2025 @ Skillora.io - All Right Reserved.</p>
            </div>
        </>
    );
}
export default Footer;