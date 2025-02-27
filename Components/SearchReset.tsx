"use client";
import Link from 'next/link';
import React from 'react'
import { FaTimes } from 'react-icons/fa'

const SearchReset = () => {
    const reset = ()=> {
        const Form = document.querySelector(".searchForm") as HTMLFormElement;
        if(Form){
            console.log("Cut" , Form)
            Form.reset()
        }

    }
    return (
        <button
            type='reset'
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-red-700"
            onClick={reset}
       >
       
       <Link href={'/'} className='search-btn text-white '> <FaTimes/></Link>
        </button>
    )
}

export default SearchReset
