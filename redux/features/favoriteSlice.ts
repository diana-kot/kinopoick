import { createSlice } from '@reduxjs/toolkit'

interface FavoriteFilms {
	films: []
}

const initialState: Array<any> | null = []

export const favoriteSlice = createSlice({
	name: 'favoriteSlice',
	initialState,
	reducers: {
		addToFav: (state, action) => {
			return (state = [...state, action.payload])
		},
		removeFromFav: (state, action) => {
			return (state = state.filter(item => item?.id !== action.payload))
		},
	},
})

export const { addToFav, removeFromFav } = favoriteSlice.actions
export default favoriteSlice.reducer
