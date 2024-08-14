import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import Even14 from './Even14'
import Even16 from './Even16'
import Odd16 from './Odd16'
import Odd11 from './Odd11'
import Odd14 from './Odd14'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/even14' element={<Even14 />} />
        <Route path='/even16' element={<Even16 />} />
        <Route path='/odd11' element={<Odd11 />} />
        <Route path='/odd14' element={<Odd14 />} />
        <Route path='/odd16' element={<Odd16 />} />
      </Routes>
    </div>
  )
}

export default App