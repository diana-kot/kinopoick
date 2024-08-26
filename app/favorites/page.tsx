'use client'
import MovieCard from '@/components/movieCard/MovieCard'
import { useAppSelector } from '@/redux/store'
import { IFilm } from '@/types/interfaces'

import styles from './Favorites.module.scss'

const Favorites = () => {
	const favoriteFilms = useAppSelector(state => state.favoriteSlice)

	// console.log('favoriteFilms', favoriteFilms.length)

	return (
		<>
			<div>
				{favoriteFilms?.length <= 0 ? (
					<div className={styles['fav-container']}>
						<div>У Вас нет избранных фильмов</div>
					</div>
				) : (
					<div className={styles['fav-list']}>
						{favoriteFilms.map((movie: IFilm) => (
							<MovieCard movie={movie} key={movie.id} />
						))}
					</div>
				)}
			</div>
		</>
	)
}

export default Favorites
