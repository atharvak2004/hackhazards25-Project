import React from 'react';
import Title from './Title';

const ConnectWithUs = () => {
  return (
    <div className='text-center mt-20'>
      <Title text1={"Connect"} text2={"With Us!"} />
      <p className='text-gray-400 mt-4 mb-10'>We'd love to hear from you! Whether you have questions, suggestions, or just want to say hello, feel free to reach out.</p>


      <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 bg-white rounded-lg'>
        <input className='w-full sm:flex-1 outline-none' type="text" placeholder='Enter your email id' required />
        <button className='bg-black text-white text-s px-10 py-4 rounded-lg' type='submit'>Connect Now!</button>
      </form>
    </div>
  )
}

export default ConnectWithUs;
