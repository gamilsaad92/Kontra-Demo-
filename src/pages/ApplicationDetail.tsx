import { useParams } from 'react-router-dom'
import { useDemo } from '../state/demoStore'
import { Button } from '../components/Button'
import { FormField } from '../components/FormField'
import { useState } from 'react'

export default function ApplicationDetail(){
  const { id } = useParams()
  const { state, dispatch } = useDemo()
  const app = state.applications.find(a => a.id === id)
  const [docname, setDocname] = useState('')
  if(!app) return <div>Not found</div>

  function runAI(){
    const score = Math.floor(60 + Math.random()*40)
    dispatch({ type:'SET_RISK', id: app.id, score })
  }
  function decide(status:'Approved'|'Denied'){
    dispatch({ type:'DECIDE_APP', id: app.id, status })
  }
  function addDoc(e:React.FormEvent){
    e.preventDefault()
    if(docname.trim()){
      dispatch({ type:'ADD_DOC', id: app.id, doc: docname.trim() })
      setDocname('')
    }
  }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Application {app.id}</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border p-4">
          <div><b>Borrower:</b> {app.borrower}</div>
          <div><b>Amount:</b> ${app.amount.toLocaleString()}</div>
          <div><b>Property:</b> {app.property}</div>
          <div><b>Status:</b> {app.status}</div>
          <div><b>Risk score:</b> {app.riskScore ?? '—'}</div>
          <div className="flex gap-2 mt-3">
            <Button onClick={runAI}>Run AI Assess</Button>
            <Button onClick={()=>decide('Approved')}>Approve</Button>
            <Button onClick={()=>decide('Denied')}>Deny</Button>
          </div>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-2">Documents</h2>
          <ul className="list-disc pl-5 mb-3">{app.docs.map((d,i)=><li key={i}>{d}</li>)}</ul>
          <form onSubmit={addDoc} className="flex gap-2">
            <FormField label="Add doc name">
              <input value={docname} onChange={e=>setDocname(e.target.value)} className="w-full px-3 py-2 rounded-xl border"/>
            </FormField>
            <Button type="submit" className="self-end">Add</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
