'use client'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from '@/redux/store'

const PersistProvider = ({ children }: { children: React.ReactNode }) => {
	const persistor = persistStore(store)

	return <PersistGate persistor={persistor}>{children}</PersistGate>
}

export default PersistProvider
