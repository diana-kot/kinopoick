'use client'

import { useQuery } from '@tanstack/react-query'

import { IFetchMovieParams, IFilm } from '@/types/interfaces'
import { getMovieList } from '@/actions/movie'

import Loader from '../loader/Loader'
import MovieCard from '../movieCard/MovieCard'
import Slider from '@/ui/slider/Slider'

import styles from './MovieList.module.scss'

interface MovieListProps {
	title: string
	searchParams: IFetchMovieParams
	sliderControlsName: string
	queryKey: string
}

const MovieList = ({
	title,
	searchParams,
	sliderControlsName,
	queryKey,
}: MovieListProps) => {
	const { data, isLoading, error } = useQuery({
		queryKey: [queryKey, searchParams],
		queryFn: () => getMovieList(searchParams),
	})

	// console.log('data', data)

	const movies = data?.docs ?? []

	return (
		<div className={styles['movie-list']}>
			<h2 className={styles['movie-list__title']}>{title} </h2>
			{isLoading && <Loader />}
			{error && (
				<p className={styles['movie-list__error']}>
					Произошла ошибка при загрузке данных. Пожалуйста, попробуйте
					позже
				</p>
			)}
			{!movies.length && (
				<p className={styles['movie-list__error']}>Ничего не найдено</p>
			)}
			{movies.length > 0 && (
				<div className={styles['movie-list__slider']}>
					<Slider
						spaceBetween={0}
						slidesPerView='auto'
						slides={movies}
						wrapperClassName={sliderControlsName}
						slideClassName={styles['movie-list__slide']}
						controlsClassName={styles['movie-list__controls']}>
						{movies.map((movie: IFilm) => (
							<MovieCard movie={movie} key={movie.id} />
						))}
					</Slider>
				</div>
			)}
		</div>
	)
}

export default MovieList
