import { useDemo } from '../state/demoStore'
import { FormField } from '../components/FormField'
import { Button } from '../components/Button'

export default function Escrow(){
  const { state, dispatch } = useDemo()
  function create(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    dispatch({ type:'CREATE_ESCROW', escrow: {
      loanId: String(fd.get('loanId')||''),
      type: (String(fd.get('type')) as any) || 'tax',
      balance: Number(fd.get('balance')||0),
      schedule: [
        { dueDate: new Date(Date.now()+86400000*30).toISOString(), amount: 900 },
        { dueDate: new Date(Date.now()+86400000*60).toISOString(), amount: 900 }
      ]
    }})
    e.currentTarget.reset()
  }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Escrow Setup</h1>
      <form onSubmit={create} className="grid md:grid-cols-4 gap-4">
        <FormField label="Loan ID"><input name="loanId" className="w-full px-3 py-2 rounded-xl border"/></FormField>
        <FormField label="Type"><select name="type" className="w-full px-3 py-2 rounded-xl border"><option value="tax">tax</option><option value="insurance">insurance</option><option value="reserve">reserve</option></select></FormField>
        <FormField label="Initial Balance"><input name="balance" type="number" className="w-full px-3 py-2 rounded-xl border"/></FormField>
        <div className="self-end"><Button type="submit">Create</Button></div>
      </form>
      <div className="grid gap-3">
        {state.escrows.map(e=>(
          <div key={e.id} className="rounded-xl border p-4">
            <div><b>Loan:</b> {e.loanId}</div>
            <div><b>Type:</b> {e.type}</div>
            <div><b>Balance:</b> ${e.balance.toLocaleString()}</div>
            <div className="mt-2"><b>Schedule:</b> {e.schedule.map(s=>`${s.dueDate.slice(0,10)} $${s.amount}`).join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
