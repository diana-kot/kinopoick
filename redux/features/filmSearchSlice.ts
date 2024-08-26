import { ISingleSearchResult } from '@/types/interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface filmSearchState {
	filmsSearchHistory: ISingleSearchResult[]
	isSearchOpen: boolean
	filmsFromSearch: ISingleSearchResult[]
}

const initialState: filmSearchState = {
	isSearchOpen: false,
	filmsFromSearch: [],
	filmsSearchHistory: [],
}

export const filmSearchSlice = createSlice({
	name: 'filmSearch',
	initialState,
	reducers: {
		setFilmsFromSearch: (
			state,
			action: PayloadAction<ISingleSearchResult[]>
		) => {
			state.filmsFromSearch = action.payload
		},
		deleteFromsFromSearch: state => {
			state.filmsFromSearch = []
		},
		addFilmToHistory: (
			state,
			action: PayloadAction<ISingleSearchResult>
		) => {
			if (
				state.filmsSearchHistory.some(
					film => film.id === action.payload.id
				)
			) {
				return
			}

			state.filmsSearchHistory.unshift(action.payload)

			if (state.filmsSearchHistory.length > 10) {
				state.filmsSearchHistory.pop()
			}
		},

		setIsSearchOpen: (state, action: PayloadAction<boolean>) => {
			state.isSearchOpen = action.payload
		},
	},
})

export const {
	setFilmsFromSearch,
	deleteFromsFromSearch,
	addFilmToHistory,
	setIsSearchOpen,
} = filmSearchSlice.actions
export default filmSearchSlice.reducer
