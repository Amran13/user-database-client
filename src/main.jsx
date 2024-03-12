import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Users from './Component/Users.jsx'
import UpdateUser from './Component/UpdateUser.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App></App>
  },
  {
    path : '/users', 
    element : <Users></Users>,
    loader : () => fetch('http://localhost:5000/users')
  }, 
  {
    path : '/users/update/:id',
    element : <UpdateUser></UpdateUser>,
    loader : ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
