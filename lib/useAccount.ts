import { useState, useContext } from 'react'

import Account from 'src/models/Account'
import createAccount from 'lib/createAccount'

import getUpdatedAccount from './getUpdatedAccount'
import AccountContext from 'src/context/accountContext'

const initialAccountValue = createAccount()

const useAccount = (): [
  Account,
  () => Promise<void>,
  boolean,
  () => void,
  () => void,
] => {
  const [account, setAccount] = useState<Account>(initialAccountValue)
  const [hasError, showError] = useState(false)

  const refreshAccount = async () => {
    try {
      setAccount(await getUpdatedAccount(account))
    } catch {
      showError(true)
    }
  }

  const showErrorMessage = () => {
    showError(true)
  }

  const hideErrorMessage = () => {
    showError(false)
  }

  return [account, refreshAccount, hasError, showErrorMessage, hideErrorMessage]
}

export default useAccount
