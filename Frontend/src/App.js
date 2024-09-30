import React from 'react'

import Home from './Component/Home'
import List from './Component/List'
import Create from './Component/Create'
import Update from './Component/Update'

import { Route, Routes } from 'react-router-dom'
import Menu from './Component/Menu'

export default function App() {
  return (
    <div>

      <Menu />
      <Routes>


        <Route path='/' element={<Home />} />
        <Route path='/list' element={<List />} />
        <Route path='/create' element={<Create />} />
        <Route path='/update' element={<Update />} />
      </Routes>




    </div>
  )
}
