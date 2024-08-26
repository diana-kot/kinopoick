import { ISingleSearchResult } from '@/types/interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface filmFiltersState {
	genreName: string[]
	rating: number[]
	year: number[]
}

const initialState: filmFiltersState = {
	genreName: [],
	rating: [1, 10],
	year: [1990, 2024],
}

export const filmFiltersSlice = createSlice({
	name: 'filmFilters',
	initialState,
	reducers: {
		SetFilmGenreName: (state, action) => {
			state.genreName = action.payload
		},
		SetFilmRating: (state, action) => {
			state.rating = action.payload
		},

		SetFilmYear: (state, action) => {
			state.year = action.payload
		},
	},
})

export const { SetFilmGenreName, SetFilmRating, SetFilmYear } =
	filmFiltersSlice.actions
export default filmFiltersSlice.reducer
