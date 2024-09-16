'use client'

import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { IFilm, IFetchMovieParams, MovieGridProps } from '@/types/interfaces'
import MovieCard from '../movieCard/MovieCard'

import { getMovieList } from '@/actions/movie'

import styles from './MovieGrid.module.scss'

import Pagination from '../pagination/Pagination'
import Loader from '../loader/Loader'

const MovieGrid = ({
	params,
	title,
	queryKey,
	limitHandler,
}: MovieGridProps) => {
	console.log('params', params)
	const { isPending, isError, error, data, isFetching, isPlaceholderData } =
		useQuery({
			queryKey: [queryKey, params],
			queryFn: () => getMovieList(params),
			placeholderData: keepPreviousData,
		})

	const movies = data?.docs ?? []

console.log('isFetching', isFetching)

console.log('isPending', isPending)

	return (
		<div className={styles['movie-grid']}>
			<h2 className={styles['movie-grid__title']}>{title} </h2>

			<div className={styles['movie-grid__list']}>
				{isPending || (isFetching && <Loader />)}
				{error && (
					<p className={styles['movie-list__error']}>
						Произошла ошибка при загрузке данных. Пожалуйста,
						попробуйте позже
					</p>
				)}
					{movies.length === 0 && !isFetching && !isPending && (
					<p className={styles['movie-list__error']}>
						По вашему запросу ничего не найдено
					</p>
				)}
				{!isFetching && !isPending && (movies.map((movie: IFilm) => (
					<MovieCard movie={movie} key={movie.id} />
				)))}
			</div>
			<Pagination
				totalPage={data?.pages}
				isPlaceholderData={isPlaceholderData}
				params={params.limit}
				limitHandler={limitHandler}
			/>
		</div>
	)
}

export default MovieGrid
