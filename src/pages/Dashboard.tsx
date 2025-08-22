import { Card } from '../components/Card'
import { useDemo } from '../state/demoStore'
import { LineChart, FileText, MapPin, Bot } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Dashboard(){
  const { state } = useDemo()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card><div className="p-6 flex items-start gap-3"><div className="rounded-xl w-12 h-12 grid place-items-center border"><Bot/></div><div className="flex-1"><div className="text-xl font-semibold">AI-Powered</div><div className="text-xl -mt-1 font-semibold">Property Search</div><Link to="/land" className="inline-block mt-4 text-sm underline">Open</Link></div></div></Card>
        <Card><div className="p-6 flex items-start gap-3"><div className="rounded-xl w-12 h-12 grid place-items-center border"><MapPin/></div><div className="flex-1"><div className="text-xl font-semibold">Site Suitability</div><div className="text-xl -mt-1 font-semibold">Analysis</div><Link to="/market" className="inline-block mt-4 text-sm underline">Open</Link></div></div></Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6 text-2xl font-semibold flex items-center gap-2"><LineChart className="opacity-70"/> Portfolio Summary</div>
          <div className="px-6 pb-6 grid grid-cols-2 gap-4">
            <Stat label="Loans" value={state.portfolio.loans} />
            <Stat label="UPB" value={`$${state.portfolio.upb.toLocaleString()}`} />
            <Stat label="Delinquency" value={`${(state.portfolio.delinquency_rate*100).toFixed(2)}%`} />
            <Stat label="WAC" value={`${(state.portfolio.wac*100).toFixed(2)}%`} />
          </div>
        </Card>
        <Card>
          <div className="p-6 text-2xl font-semibold flex items-center gap-2"><FileText className="opacity-70"/> Quick actions</div>
          <div className="px-6 pb-6 grid grid-cols-2 gap-3">
            <Link to="/applications" className="border rounded-xl px-4 py-3 text-sm hover:opacity-90">New Application</Link>
            <Link to="/applications" className="border rounded-xl px-4 py-3 text-sm hover:opacity-90">View Pipeline</Link>
            <Link to="/servicing" className="border rounded-xl px-4 py-3 text-sm hover:opacity-90">Servicing</Link>
            <Link to="/trading" className="border rounded-xl px-4 py-3 text-sm hover:opacity-90">Trading</Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
function Stat({label, value}:{label:string; value:React.ReactNode}){return (<div className="rounded-xl border p-4"><div className="text-sm opacity-60">{label}</div><div className="text-xl font-semibold mt-1">{value}</div></div>)}
