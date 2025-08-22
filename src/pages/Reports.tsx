import { useDemo } from '../state/demoStore'
import { Button } from '../components/Button'

export default function Reports(){
  const { state } = useDemo()
  function exportJSON(){
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'kontra-demo-export.json'; a.click()
    setTimeout(()=>URL.revokeObjectURL(url), 1000)
  }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Reports & BI (Demo)</h1>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-2">KPIs</h2>
          <div>Total Loans: {state.portfolio.loans}</div>
          <div>Total UPB: ${state.portfolio.upb.toLocaleString()}</div>
          <div>Delinquency: {(state.portfolio.delinquency_rate*100).toFixed(2)}%</div>
          <div>WAC: {(state.portfolio.wac*100).toFixed(2)}%</div>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-2">Exports</h2>
          <Button onClick={exportJSON}>Export JSON</Button>
          <div className="text-sm opacity-60 mt-2">In production, this page would include BI widgets and scheduleable reports.</div>
        </div>
      </div>
    </div>
  )
}
