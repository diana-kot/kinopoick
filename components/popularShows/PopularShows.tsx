import { queryClient } from '@/app/react-query/client'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import MovieList from '../movieList/MovieList'
import { IFetchMovieParams } from '@/types/interfaces'
import { getMovieList } from '@/actions/movie'
import { QUERY_KEY } from '@/constants/queryKeys'

const PopularShows = async () => {
	const queryClient = new QueryClient()

	const searchParams: IFetchMovieParams = {
		page: 1,
		limit: 15,
		type: 'tv-series',
		top250: '!null',
		sortField: 'rating.kp',
		'votes.kp': '100000 - 1000000',
		sortType: '-1',
	}

	// await queryClient.prefetchQuery({
	// 	queryKey: [QUERY_KEY.popularShows, searchParams],
	// 	queryFn: () => getMovieList(searchParams),
	// })

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<MovieList
				title='Популярные сериалы'
				searchParams={searchParams}
				sliderControlsName='popular-controls'
				queryKey={QUERY_KEY.popularShows}
			/>
		</HydrationBoundary>
	)
}

export default PopularShows
