import { createStore, combineReducers } from 'redux'

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
}

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
}

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      }
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      }
    case 'account/requestLoan':
      if (state.loan > 0) return state // Prevent multiple loans
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      }
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      }

    default:
      return state
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      }

    case 'customer/updateName':
      return { ...state, fullName: action.payload }

    default:
      return state
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

const store = createStore(rootReducer)

// store.dispatch({ type: 'account/deposit', payload: 500 })
// store.dispatch({ type: 'account/withdraw', payload: 200 })
// console.log(store.getState())

// store.dispatch({
//   type: 'account/requestLoan',
//   payload: { ammount: 1000, purpose: 'Buy a car' },
// })
// console.log(store.getState())

// store.dispatch({ type: 'account/payLoan' })
// console.log(store.getState())

function deposit(amount) {
  return { type: 'account/deposit', payload: amount }
}

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount }
}

function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  }
}

function payLoan() {
  return { type: 'account/payLoan' }
}

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  }
}

function updateName(fullName) {
  return { type: 'customer/updateName', payload: fullName }
}

store.dispatch(deposit(500))
console.log(store.getState())

store.dispatch(withdraw(200))
console.log(store.getState())

store.dispatch(requestLoan(1000, 'Buy a cheap car'))
console.log(store.getState())

store.dispatch(payLoan())
console.log(store.getState())

store.dispatch(createCustomer('John Doyl', '1234567890'))
console.log(store.getState())

store.dispatch(updateName('John Do'))
store.dispatch(deposit(250))
console.log(store.getState())
