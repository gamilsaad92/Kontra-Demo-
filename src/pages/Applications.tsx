import { useDemo } from '../state/demoStore'
import { FormField } from '../components/FormField'
import { Button } from '../components/Button'
import { Table, THead, TRow, TCell } from '../components/Table'
import { useNavigate } from 'react-router-dom'

export default function Applications(){
  const { state, dispatch } = useDemo()
  const nav = useNavigate()
  function create(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    dispatch({ type: 'CREATE_APP', app: {
      borrower: String(fd.get('borrower')||''),
      amount: Number(fd.get('amount')||0),
      property: String(fd.get('property')||'')
    }})
    e.currentTarget.reset()
  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Loan Applications</h1>
      <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormField label="Borrower"><input name="borrower" required className="w-full px-3 py-2 rounded-xl border"/></FormField>
        <FormField label="Amount"><input name="amount" type="number" required className="w-full px-3 py-2 rounded-xl border"/></FormField>
        <FormField label="Property"><input name="property" className="w-full px-3 py-2 rounded-xl border"/></FormField>
        <div className="self-end"><Button type="submit">Create</Button></div>
      </form>
      <Table>
        <THead><div>Borrower</div><div>Amount</div><div>Property</div><div>Status</div><div>Risk</div></THead>
        {state.applications.map(a=>(
          <TRow key={a.id} onClick={()=>nav(`/applications/${a.id}`)} className="cursor-pointer hover:bg-black/5">
            <TCell span={3}>{a.borrower}</TCell>
            <TCell span={2}>${a.amount.toLocaleString()}</TCell>
            <TCell span={3}>{a.property}</TCell>
            <TCell span={2}>{a.status}</TCell>
            <TCell span={2}>{a.riskScore ?? '—'}</TCell>
          </TRow>
        ))}
      </Table>
    </div>
  )
}
