import { genres } from './genres'
import styles from './GenreFilter.module.scss'
import MultiSelectCheckbox from '@/ui/multiSelectCheckbox/MultiSelectCheckbox'

export interface IFilterComponentsProps {
	value?: number[]
}

const GenreFilter = ({ value }: IFilterComponentsProps) => {
	//вариант для select
	// const handleGenreChange = useCallback(
	// 	(event: any) => {
	// 		const {
	// 			target: { value },
	// 		} = event
	// 		setGenreName(typeof value === 'string' ? value.split(',') : value)
	// 	},
	// 	[setGenreName]
	// )

	return (
		<div className={styles.genresFilter}>
			<h5>Жанры</h5>
			{/* <Select options={genres} onChange={handleGenreChange} /> */}
			<MultiSelectCheckbox optionsSelect={genres} />
		</div>
	)
}

export default GenreFilter
