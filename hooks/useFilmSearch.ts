import { useDispatch, useSelector } from 'react-redux'
import {
	setFilmsFromSearch,
	deleteFromsFromSearch,
	addFilmToHistory,
	setIsSearchOpen,
} from '../redux/features/filmSearchSlice'
import { RootState } from '@/types/StoreTypes'
import { ISingleSearchResult } from '@/types/interfaces'
import { useAppSelector } from '@/redux/hooks'

export const useFilmSearch = () => {
	// const { filmsSearchHistory, filmsFromSearch, isSearchOpen } = useSelector(
	// 	(state: RootState) => state.filmSearch
	// )

	const { filmsSearchHistory, filmsFromSearch, isSearchOpen } =
		useAppSelector((state: RootState) => state.filmSearchSlice)

	const dispatch = useDispatch()

	const deleteFilmsFromSearch = () => {
		dispatch(deleteFromsFromSearch())
	}

	const addFilmsToHistory = (film: ISingleSearchResult): void => {
		dispatch(addFilmToHistory(film))
	}

	const setIsSearchOpening = (isOpen: boolean) => {
		dispatch(setIsSearchOpen(isOpen))
	}

	return {
		deleteFilmsFromSearch,
		addFilmsToHistory,
		setIsSearchOpening,
		filmsSearchHistory,
		filmsFromSearch,
		isSearchOpen,
	}
}
