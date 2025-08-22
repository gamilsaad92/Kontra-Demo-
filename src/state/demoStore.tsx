// src/state/demoStore.tsx
import React, { createContext, useContext, useEffect, useReducer } from 'react'

export type Role = 'borrower' | 'operator' | 'investor' | 'admin' | null

export type Application = {
  id: string
  borrower: string
  amount: number
  property: string
  status: 'Submitted' | 'Approved' | 'Denied' | 'Closed'
  docs: string[]
  riskScore?: number
  createdAt: string
}

export type Escrow = {
  id: string
  loanId: string
  type: 'tax' | 'insurance' | 'reserve'
  balance: number
  schedule: { dueDate: string; amount: number; paid?: boolean }[]
}

export type Payment = {
  id: string
  loanId: string
  dueDate: string
  amount: number
  status: 'Due' | 'Paid' | 'Late'
}

export type Trade = {
  id: string
  loanId: string
  type: 'loan_sale' | 'participation' | 'repo' | 'securitization'
  notional: number
  counterparty?: string
  status: 'Listed' | 'Executed'
}

export type Portfolio = {
  loans: number
  upb: number
  delinquency_rate: number
  wac: number
}

export type State = {
  role: Role
  orgId: string
  applications: Application[]
  escrows: Escrow[]
  payments: Payment[]
  trades: Trade[]
  portfolio: Portfolio
}

type Action =
  | { type: 'SET_ROLE'; role: Role }
  | { type: 'SET_ORG'; orgId: string }
  | { type: 'CREATE_APP'; app: Omit<Application, 'id' | 'createdAt' | 'status' | 'docs'> }
  | { type: 'ADD_DOC'; id: string; doc: string }
  | { type: 'SET_RISK'; id: string; score: number }
  | { type: 'DECIDE_APP'; id: string; status: 'Approved' | 'Denied' }
  | { type: 'CREATE_ESCROW'; escrow: Omit<Escrow, 'id'> }
  | { type: 'MAKE_PAYMENT'; paymentId: string }
  | { type: 'LIST_TRADE'; trade: Omit<Trade, 'id' | 'status'> }
  | { type: 'EXEC_TRADE'; id: string }
  | { type: 'RUN_NIGHTLY' }
  | { type: 'RESET' }

function rid(prefix: string = 'id') {
  return prefix + '_' + Math.random().toString(36).slice(2, 10)
}

const initial: State = {
  role: null,
  orgId: 'demo-org',
  applications: [
    { id: 'app_1001', borrower: 'Acme LLC', amount: 325000, property: '12 Main St', status: 'Submitted', docs: [], createdAt: new Date().toISOString() },
    { id: 'app_1002', borrower: 'Bluebird Inc', amount: 820000, property: '45 Pine Ave', status: 'Approved', docs: ['W2.pdf'], riskScore: 78, createdAt: new Date().toISOString() }
  ],
  escrows: [],
  payments: [
    { id: 'pmt_1', loanId: 'app_1002', dueDate: new Date(Date.now() + 86400000 * 7).toISOString(), amount: 4200, status: 'Due' }
  ],
  trades: [],
  portfolio: { loans: 12, upb: 5_800_000, delinquency_rate: 0.024, wac: 0.061 }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.role }

    case 'SET_ORG':
      return { ...state, orgId: action.orgId }

    case 'CREATE_APP': {
      const app: Application = {
        id: rid('app'),
        status: 'Submitted',
        createdAt: new Date().toISOString(),
        docs: [],
        ...action.app
      }
      return { ...state, applications: [app, ...state.applications] }
    }

    case 'ADD_DOC':
      return {
        ...state,
        applications: state.applications.map(a => (a.id === action.id ? { ...a, docs: [...a.docs, action.doc] } : a))
      }

    case 'SET_RISK':
      return {
        ...state,
        applications: state.applications.map(a => (a.id === action.id ? { ...a, riskScore: action.score } : a))
      }

    case 'DECIDE_APP':
      return {
        ...state,
        applications: state.applications.map(a => (a.id === action.id ? { ...a, status: action.status } : a))
      }

    case 'CREATE_ESCROW': {
      const esc: Escrow = { id: rid('esc'), ...action.escrow }
      return { ...state, escrows: [esc, ...state.escrows] }
    }

    case 'MAKE_PAYMENT':
      return {
        ...state,
        payments: state.payments.map(p => (p.id === action.paymentId ? { ...p, status: 'Paid' as const } : p))
      }

    case 'LIST_TRADE': {
      const tr: Trade = { id: rid('tr'), status: 'Listed', ...action.trade }
      return { ...state, trades: [tr, ...state.trades] }
    }

    case 'EXEC_TRADE':
      return {
        ...state,
        trades: state.trades.map(t => (t.id === action.id ? { ...t, status: 'Executed' as const } : t))
      }

    case 'RUN_NIGHTLY': {
      // Randomize risk for submitted/approved apps
      const apps = state.applications.map(a => {
        if (a.status === 'Submitted' || a.status === 'Approved') {
          return { ...a, riskScore: Math.floor(60 + Math.random() * 40) }
        }
        return a
      })
      // Randomly mark payments late (preserve union type with `as const`)
      const pays = state.payments.map(p =>
        Math.random() < 0.2 && p.status === 'Due' ? { ...p, status: 'Late' as const } : p
      )
      return { ...state, applications: apps, payments: pays }
    }

    case 'RESET':
      return initial

    default:
      return state
  }
}

const Ctx = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
  state: initial,
  dispatch: () => {}
})

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial, init => {
    try {
      const raw = localStorage.getItem('kontra_demo_state')
      return raw ? { ...init, ...(JSON.parse(raw) || {}) } : init
    } catch {
      return init
    }
  })
  useEffect(() => {
    localStorage.setItem('kontra_demo_state', JSON.stringify(state))
  }, [state])
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>
}

export function useDemo() {
  return useContext(Ctx)
}
