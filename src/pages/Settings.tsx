import { useDemo } from '../state/demoStore'
import { Button } from '../components/Button'

export default function Settings(){
  const { state, dispatch } = useDemo()
  function reset(){ dispatch({ type:'RESET' }) }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="rounded-xl border p-4">
        <div><b>Organization:</b> {state.orgId}</div>
        <div><b>Role:</b> {state.role ?? '—'}</div>
        <Button onClick={reset} className="mt-3">Reset Demo Data</Button>
      </div>
    </div>
  )
}
