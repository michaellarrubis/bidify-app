import { FC } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoutes'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import NewBidItem from './pages/NewBidItem'
import Deposit from './pages/Deposit'

const Routes: FC = () => (
  <Switch>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/user/deposit"
      element={
        <ProtectedRoute>
          <Deposit />
        </ProtectedRoute>
      }
    />
    <Route
      path="/bid/new-item"
      element={
        <ProtectedRoute>
          <NewBidItem />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Switch>
)

export default Routes