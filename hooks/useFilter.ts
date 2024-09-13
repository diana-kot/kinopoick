import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	SetFilmGenreName,
	SetFilmRating,
	SetFilmYear,
} from '../redux/features/filmFiltersSlice'
import { RootState } from '@/types/StoreTypes'
import { useAppSelector } from '@/redux/hooks'

export const useFilter = () => {
	const dispatch = useDispatch()

	const { genreName, rating, year } = useAppSelector(
		(state: RootState) => state.filmFiltersSlice
	)

	const setFilmGenreName = (value: string[] | null) => {
		console.log('value 999', value)
		dispatch(SetFilmGenreName(value))
	}

	const setFilmRating = (value: number[]) => {
		console.log('setFilmRating', value)
		dispatch(SetFilmRating(value))
	}

	const setFilmYear = (value: number[]) => {
		dispatch(SetFilmYear(value))
	}

	return {
		genreName,
		rating,
		year,
		setFilmGenreName,
		setFilmRating,
		setFilmYear,
	}
}
