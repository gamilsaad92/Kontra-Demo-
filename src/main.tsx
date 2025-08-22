import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './shell/AppLayout'
import { Dashboard } from './pages/Dashboard'
import Applications from './pages/Applications'
import ApplicationDetail from './pages/ApplicationDetail'
import Escrow from './pages/Escrow'
import Servicing from './pages/Servicing'
import Trading from './pages/Trading'
import Risk from './pages/Risk'
import Reports from './pages/Reports'
import Land from './pages/Land'
import Market from './pages/Market'
import Settings from './pages/Settings'
import { DemoProvider } from './state/demoStore'

const router = createBrowserRouter([
  { path: '/', element: <AppLayout/>, children: [
    { index: true, element: <Dashboard/> },
    { path: '/applications', element: <Applications/> },
    { path: '/applications/:id', element: <ApplicationDetail/> },
    { path: '/escrow', element: <Escrow/> },
    { path: '/servicing', element: <Servicing/> },
    { path: '/trading', element: <Trading/> },
    { path: '/risk', element: <Risk/> },
    { path: '/reports', element: <Reports/> },
    { path: '/land', element: <Land/> },
    { path: '/market', element: <Market/> },
    { path: '/settings', element: <Settings/> }
  ] }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DemoProvider>
      <RouterProvider router={router}/>
    </DemoProvider>
  </React.StrictMode>
)
