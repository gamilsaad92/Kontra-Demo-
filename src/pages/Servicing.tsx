import { useDemo } from '../state/demoStore'
import { Button } from '../components/Button'

export default function Servicing(){
  const { state, dispatch } = useDemo()
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Servicing</h1>
      <div className="grid gap-3">
        {state.payments.map(p=>(
          <div key={p.id} className="rounded-xl border p-4 flex items-center gap-6">
            <div><b>Loan:</b> {p.loanId}</div>
            <div><b>Due:</b> {p.dueDate.slice(0,10)}</div>
            <div><b>Amount:</b> ${p.amount.toLocaleString()}</div>
            <div><b>Status:</b> {p.status}</div>
            {p.status==='Due' && <Button onClick={()=>dispatch({type:'MAKE_PAYMENT', paymentId:p.id})}>Make Payment</Button>}
          </div>
        ))}
      </div>
    </div>
  )
}
