import { getMovieList } from '@/actions/movie'
import { IFetchMovieParams } from '@/types/interfaces'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

import DoubleRange from '../doubleRange/DoubleRange'
import GenreFilter from '../genreFilter/GenreFilter'

import styles from './FilmFilters.module.scss'
import { useFilter } from '@/hooks/useFilter'

interface IFilmFilters {

	setYear: () => void
	rating: number[]
	year: number[]
}

const FilmFilters = ({  setYear, rating, year }: IFilmFilters) => {


	return (
		<div className={styles['film-filters__wrapper']}>
			<GenreFilter />
			<DoubleRange
				state={rating}
				minDist={0.1}
				min={1}
				max={10}
				name={'Рейтинг'}
			/>
			{/* <DoubleRange
				state={year}
				setState={setYear}
				minDist={1}
				min={1990}
				max={2024}
				name={'Год'}
			/> */}
		</div>
	)
}

export default FilmFilters
