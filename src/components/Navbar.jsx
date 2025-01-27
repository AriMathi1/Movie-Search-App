import React from 'react'
import { useState } from 'react';

function Navbar({searchValue, setSearchValue}) {



  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <h1 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Movies</h1>
          <input type="search" value = {searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type to search..." required />
        </div>
      </nav>
    </>
  )
}

export default Navbar