import { genres } from './genres'
import styles from './GenreFilter.module.scss'
import MultiSelectCheckbox from '@/ui/multiSelectCheckbox/MultiSelectCheckbox'
import Select from '@/ui/select/Select'
import { useFilter } from '@/hooks/useFilter'
import { useCallback } from 'react'

export interface IFilterComponentsProps {
	value?: number[]
}

const GenreFilter = ({ value }: IFilterComponentsProps) => {

	const { setFilmGenreName } = useFilter()
	//вариант для select
	const handleGenreChange = useCallback(
		(event: any) => {
			const {
				target: { value },
			} = event
			setFilmGenreName(typeof value === 'string' ? value.split(',') : value)
		},
		[setFilmGenreName]
	)

	return (
		<div className={styles.genresFilter}>
			<h5>Жанры</h5>
			<Select options={genres} onChange={handleGenreChange} />
			{/* <MultiSelectCheckbox optionsSelect={genres} /> */}
		</div>
	)
}

export default GenreFilter
