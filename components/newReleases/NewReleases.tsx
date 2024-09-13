'use client'

import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
	useQuery,
} from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { IFetchMovieParams } from '@/types/interfaces'
import MovieList from '../movieList/MovieList'
import { getMovieList } from '@/actions/movie'
import { QUERY_KEY } from '@/constants/queryKeys'
import MovieGrid from '../movieGrid/MovieGrid'
import { useState } from 'react'
import FilmFilters from '../filters/filmFilters/FilmFilters'

import styles from './NewReleases.module.scss'
import { useFilter } from '@/hooks/useFilter'

export default function NewReleases({ currentPage = 1 }: { currentPage?: number }) {
	const queryClient = new QueryClient()

	const { genreName, rating, year, setFilmYear } = useFilter()

	const [limit, setLimit] = useState(10)

	const limitHandler = (num: number) => {
		setLimit(num)
	}

	// const searchParams = useSearchParams()
	// console.log('searchParams', searchParams)

	const formatGenresName = (): string => {
		if (genreName.length <= 0) {
			return ''
		}
// console.log('genreName', genreName)
// genres.name=драма, genres.name=криминал, genres.name=криминал&genres.name=драма
	 return genreName.join(', ').toLowerCase()
		// return genreName.map(genre=> `genres.name=${genre}`).join('&')
	}

	const params: IFetchMovieParams = {
		page: +`${currentPage}`,
		limit: +`${limit}`,
		sortField: 'rating.kp',
		sortType: '-1',
		'votes.kp': '50000 - 1000000',
		'genres.name' : formatGenresName(),
		'rating.kp': `${rating[0]}-${rating[1]}`,
		year: `${year[0]}-${year[1]}`,
	}

	// await queryClient.prefetchQuery({
	// 	queryKey: [QUERY_KEY.newReleases, params],
	// 	queryFn: () => getMovieList(params),
	//})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className={styles['new-releases']}>
				<FilmFilters
					year={year}
					setYear={() => setFilmYear}
					rating={rating}
				/>
				<MovieGrid
					title='Свежие релизы'
					params={params}
					queryKey={QUERY_KEY.newReleases}
					limitHandler={limitHandler}
				/>
			</div>
		</HydrationBoundary>
	)
}


