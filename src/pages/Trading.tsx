import { useDemo } from '../state/demoStore'
import { FormField } from '../components/FormField'
import { Button } from '../components/Button'

export default function Trading(){
  const { state, dispatch } = useDemo()
  function list(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    dispatch({ type:'LIST_TRADE', trade: {
      loanId: String(fd.get('loanId')||''),
      type: (String(fd.get('type')) as any) || 'loan_sale',
      notional: Number(fd.get('notional')||0),
      counterparty: String(fd.get('counterparty')||'')
    }})
    e.currentTarget.reset()
  }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Trading (Demo)</h1>
      <form onSubmit={list} className="grid md:grid-cols-5 gap-4">
        <FormField label="Loan ID"><input name="loanId" className="w-full px-3 py-2 rounded-xl border"/></FormField>
        <FormField label="Type"><select name="type" className="w-full px-3 py-2 rounded-xl border"><option value="loan_sale">loan_sale</option><option value="participation">participation</option><option value="repo">repo</option><option value="securitization">securitization</option></select></FormField>
        <FormField label="Notional"><input name="notional" type="number" className="w-full px-3 py-2 rounded-xl border"/></FormField>
        <FormField label="Counterparty"><input name="counterparty" className="w-full px-3 py-2 rounded-xl border"/></FormField>
        <div className="self-end"><Button type="submit">List</Button></div>
      </form>
      <div className="grid gap-3">
        {state.trades.map(t=>(
          <div key={t.id} className="rounded-xl border p-4 flex items-center gap-4">
            <div><b>Loan:</b> {t.loanId}</div>
            <div><b>Type:</b> {t.type}</div>
            <div><b>Notional:</b> ${t.notional.toLocaleString()}</div>
            <div><b>Status:</b> {t.status}</div>
            {t.status==='Listed' && <Button onClick={()=>dispatch({type:'EXEC_TRADE', id:t.id})}>Execute</Button>}
          </div>
        ))}
      </div>
    </div>
  )
}
