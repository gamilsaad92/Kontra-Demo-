import { useDemo } from '../state/demoStore'
import { Button } from '../components/Button'

export default function Risk(){
  const { state, dispatch } = useDemo()
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">Risk & Collections</h1>
        <Button onClick={()=>dispatch({type:'RUN_NIGHTLY'})}>Run Nightly Scoring</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-2">Risk Heat (AI score)</h2>
          <div className="grid grid-cols-4 gap-2">
            {state.applications.map(a=>(
              <div key={a.id} className="rounded-lg p-3 text-center border" style={{ backgroundColor: a.riskScore ? `hsl(${120 - (a.riskScore-60)*2},70%,90%)` : '#fafafa' }}>
                <div className="text-xs opacity-60">{a.id.slice(-4)}</div>
                <div className="text-sm">{a.riskScore ?? '—'}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-2">Collections Queue</h2>
          {state.payments.filter(p=>p.status==='Late').map(p=>(
            <div key={p.id} className="border rounded-lg p-3 mb-2">
              <div><b>Loan:</b> {p.loanId}</div>
              <div><b>Due:</b> {p.dueDate.slice(0,10)}</div>
              <div><b>Amount:</b> ${p.amount.toLocaleString()}</div>
              <div className="text-sm opacity-70">Actions: Send Notice • Promise-to-Pay • Call</div>
            </div>
          ))}
          {state.payments.filter(p=>p.status==='Late').length===0 && <div className="text-sm opacity-60">No delinquent items.</div>}
        </div>
      </div>
    </div>
  )
}
