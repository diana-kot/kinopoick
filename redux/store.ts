import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import favoriteSlice from './features/favoriteSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import filmSearchSlice from './features/filmSearchSlice'
import filmFiltersSlice from './features/filmFiltersSlice'

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
}

const rootReducer = combineReducers({
	favoriteSlice: favoriteSlice,
	filmSearchSlice: filmSearchSlice,
	filmFiltersSlice: filmFiltersSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const bookStore = () => {
	return configureStore({
		reducer: {
			favoriteSlice: favoriteSlice,
			filmSearchSlice: filmSearchSlice,
			filmFiltersSlice: filmFiltersSlice,
		},
	})
}

const store = configureStore({
	reducer: persistedReducer,
})

// Типы для диспетчера и состояния
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// Hook, который предоставляет типизированный доступ к диспетчеру
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
