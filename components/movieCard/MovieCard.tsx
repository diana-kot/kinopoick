'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { IFilm } from '@/types/interfaces'

import styles from './MovieCard.module.scss'
import getImg from '@/utils/getImg'

const MovieCard = ({ movie }: { movie: IFilm }) => {
	const [startYear] = useState(
		movie.releaseYears?.length ? movie.releaseYears[0]?.start : movie.year
	)
	const [endYear] = useState(
		movie.releaseYears?.length ? movie.releaseYears[0]?.end : movie.year
	)

	const getReleaseYears = useMemo(() => {
		if (startYear === endYear) {
			return startYear
		}

		if (!endYear) {
			return startYear
		}

		return `${startYear} - ${endYear}`
	}, [startYear, endYear])

	return (
		<Link href={`/film/${movie.id}`} className={styles['movie-card']}>
			<div className={styles['movie-card__img']}>
				<Image
					src={getImg(movie.poster?.url)}
					alt={movie.name || 'Изображение'}
					width={150}
					height={225}
					priority
				/>
			</div>
			<div className={styles['movie-card__info']}>
				<p className={styles['movie-card__title']}>{movie.name}</p>
				<p className={styles['movie-card__row']}>
					{getReleaseYears}
					{movie.genres && movie.genres[0].name}
				</p>
			</div>
		</Link>
	)
}

export default MovieCard
