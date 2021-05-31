import { createContext } from 'react'
import Account from 'src/models/Account'

type AccountHandler = {
  account: Account
  hasError: boolean
  showErrorMessage: () => void
  hideErrorMessage: () => void
}

const AccountContext = createContext<AccountHandler | null>(null)

export default AccountContext
