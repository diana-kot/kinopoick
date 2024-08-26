import { ISingleSearchResult } from '@/types/interfaces'

import styles from './SearchList.module.scss'
import InfinitiScroll from '@/ui/infinitiScroll/InfinitiScroll'
import Loader from '@/components/loader/Loader'
import SearchItem from '../searchItem/SearchItem'

interface SearchListProps {
	searchResult: ISingleSearchResult[]
	isLoading: boolean
	hasMore: boolean
	loadMore: () => void
}

const SearchList = ({
	searchResult,
	isLoading,
	hasMore,
	loadMore,
}: SearchListProps) => {
	return (
		<>
			<ul className={styles['search-list']}>
				{searchResult.map((item, index) => (
					<li className={styles['search-list__item']} key={item.id}>
						<SearchItem film={item} index={index} />
					</li>
				))}
			</ul>

			{isLoading && <Loader />}

			{!isLoading && (
				<InfinitiScroll hasMore={hasMore} loadMore={loadMore} />
			)}
		</>
	)
}

export default SearchList
