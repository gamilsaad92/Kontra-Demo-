import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Search, LayoutDashboard, FilePlus2, Scale, Landmark, ShieldCheck, LineChart, Settings as SettingsIcon, MapPin, BarChart3, Users, UserCircle2 } from 'lucide-react'
import { cn } from '../utils/cn'
import { useDemo } from '../state/demoStore'
import React from 'react'

function Item({ to, icon, label }:{to:string; icon:React.ReactNode; label:string}){
  return (
    <NavLink to={to} className={({isActive}) => cn('flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-black/5', isActive && 'bg-black/10')} end>{icon}<span>{label}</span></NavLink>
  )
}

export function AppLayout(){
  const { state, dispatch } = useDemo()
  const nav = useNavigate()
  function setRole(role:any){ dispatch({ type:'SET_ROLE', role }); nav('/') }
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-4 hidden md:flex flex-col gap-2">
        <div className="flex items-center gap-2 px-2 py-1 text-xl font-semibold">
          <div className="rounded-lg w-8 h-8 grid place-items-center border">K</div>
          <span>Kontra Demo</span>
        </div>
        <nav className="mt-6 flex flex-col gap-1 text-sm">
          <Item to="/" icon={<LayoutDashboard size={18}/>} label="Dashboard"/>
          <Item to="/applications" icon={<FilePlus2 size={18}/>} label="Applications"/>
          <Item to="/escrow" icon={<Scale size={18}/>} label="Escrow"/>
          <Item to="/servicing" icon={<Users size={18}/>} label="Servicing"/>
          <Item to="/trading" icon={<Landmark size={18}/>} label="Trading"/>
          <Item to="/risk" icon={<ShieldCheck size={18}/>} label="Risk & Collections"/>
          <Item to="/reports" icon={<LineChart size={18}/>} label="Reports & BI"/>
          <Item to="/land" icon={<MapPin size={18}/>} label="Land"/>
          <Item to="/market" icon={<BarChart3 size={18}/>} label="Market"/>
          <Item to="/settings" icon={<SettingsIcon size={18}/>} label="Settings"/>
        </nav>
      </aside>
      <main className="flex-1 min-w-0">
        <header className="flex items-center gap-3 p-4 border-b">
          <div className="relative w-80 max-w-full">
            <Search className="absolute left-2 top-2.5" size={18}/>
            <input aria-label="Search" placeholder="Search…" className="w-full pl-8 pr-2 py-2 rounded-xl border"/>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <UserCircle2 className="opacity-80"/>
            <select className="border rounded-lg px-2 py-1" value={state.role || ''} onChange={e=>setRole(e.target.value as any)}>
              <option value="">Select role…</option>
              <option value="borrower">Borrower</option>
              <option value="operator">Operator</option>
              <option value="investor">Investor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </header>
        <div className="p-6"><Outlet/></div>
      </main>
    </div>
  )
}
