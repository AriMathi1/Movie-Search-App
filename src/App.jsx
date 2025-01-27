
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import MovieList from './components/MovieList'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import MovieDetail from './components/MovieDetail'

function App() {
  const [searchValue, setSearchValue] = useState('');


  return (
    <>
      <BrowserRouter>

        <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />

        <Routes>
          <Route path="/" element={<MovieList searchValue={searchValue} />} />
          <Route path="MovieDetail" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
