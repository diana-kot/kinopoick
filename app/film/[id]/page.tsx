import FilmSidebar from '@/components/film/filmSidebar/FilmSidebar'
import styles from './page.module.scss'
import { getFilm } from '@/actions/movie'
import { IFilm } from '@/types/interfaces'
import FilmInfo from '@/components/film/filmInfo/FilmInfo'
import FilmMore from '@/components/film/filmMore/FilmMore'
import BackButton from '@/ui/backButton/BackButton'

// export async function generateMetadata({
// 	params,
// }: {
// 	params: { id: string }
// }): Promise<Metadata> {
// 	const film: IFilm = await getFilm(params.id)

// 	return {
// 		title: film?.name,
// 		description: film?.shortDescription,
// 	}
// }

export default async function FilmPage({ params }: { params: { id: string } }) {
	const film: IFilm = await getFilm(params.id)

	return (
		<div className={styles.film__container}>
			<BackButton />
			<div className={styles.film}>
				<div className={styles.film__media}>
					<FilmSidebar film={film} />
				</div>

				<div className={styles.film__info}>
					<FilmInfo film={film} isFav={false} />
				</div>
			</div>

			<div className={styles['film-more']}>
				<FilmMore film={film} />
			</div>
		</div>
	)
}
