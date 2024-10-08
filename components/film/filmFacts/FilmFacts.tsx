'use client'

import { useEffect, useState } from 'react'

import styles from './FilmFacts.module.scss'
import { IFilm } from '@/types/interfaces'
import Button from '@/ui/button/Button'

interface FilmFactsProps {
	film: IFilm
}

const FilmFacts = ({ film }: FilmFactsProps) => {
	const [factsList, setFactsList] = useState(film.facts.slice(0, 3))
	const [factsListLength, setFactsListLength] = useState(3)

	const handleButtonClick = () => {
		setFactsListLength(prevLength => prevLength + 3)
	}

	useEffect(() => {
		setFactsList(film.facts.slice(0, factsListLength))
	}, [factsListLength, film.facts])

	return (
		<div className={styles['film-facts']}>
			<p className={styles['film-facts__title']}>Знаете ли вы, что…</p>

			<ul className={styles['film-facts__list']}>
				{factsList.map(fact => (
					<li key={fact.value} className={styles['film-facts__item']}>
						<p dangerouslySetInnerHTML={{ __html: fact.value }} />
					</li>
				))}
			</ul>

			{film.facts.length > 3 &&
				film.facts.length !== factsList.length && (
					<div className={styles['film-facts__button']}>
						<Button
							className={styles['film-facts__more']}
							onClick={handleButtonClick}
							text='Показать еще'></Button>
					</div>
				)}
		</div>
	)
}

export default FilmFacts
