'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import CloseIcon from '@/assets/icons/close.svg'
import SearchIcon from '@/assets/icons/search.svg'

import { getSearchResult } from '@/actions/movie'
import Loader from '@/components/loader/Loader'
import SearchItem from './SearchItem'

import styles from './Search.module.scss'
import { useDebounce } from '@/hooks/useDebounce'
import { useOutsideClick } from '@/hooks/useClickOutside'
import { useFilmSearch } from '@/hooks/useFilmSearch'

const Search = () => {
	const { filmsSearchHistory } = useFilmSearch()

	const [searchValue, setSearchValue] = useState<string>('')
	const [isDropdownOpened, setIsDropdownOpened] = useState(false)
	const [isSearchActive, setIsSearchActive] = useState(false)

	const router = useRouter()

	const outerWrapperRef = useOutsideClick(() => {
		setIsDropdownOpened(false)
	})

	const { debouncedValue } = useDebounce(searchValue, 500)

	const {
		data: searchData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['short-search', debouncedValue],
		queryFn: () =>
			getSearchResult({
				page: 1,
				limit: 5,
				query: debouncedValue,
			}),
		select: data => data.docs,
		enabled: !!debouncedValue,
	})

	const handleInputChange = (value: string) => {
		setSearchValue(value)
		setIsDropdownOpened(true)
	}

	const handleSearch = (
		event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
	) => {
		event.preventDefault()
		setIsDropdownOpened(false)

		if (searchValue && searchValue.length > 3) {
			router.push(`/search?query=${searchValue}`)
		}
	}

	const handleSearchButtonClick = () => {
		setIsSearchActive(!isSearchActive)
	}

	const handleCloseClick = () => {
		setIsSearchActive(false)
		setIsDropdownOpened(false)
	}

	return (
		<div className={styles.search} ref={outerWrapperRef}>
			<form onSubmit={e => handleSearch(e)}>
				<input
					value={searchValue}
					className={
						isSearchActive
							? `${styles.search__input} ${styles.search__input_active}`
							: `${styles.search__input}`
					}
					type='search'
					placeholder='Найти'
					onInput={e => handleInputChange(e.currentTarget.value)}
					onFocus={() => setIsDropdownOpened(true)}
				/>
			</form>

			<button
				type='button'
				className={styles.search__submit}
				onClick={e => handleSearch(e)}
				aria-label='Поиск'>
				<SearchIcon />
			</button>

			<button
				type='button'
				className={styles['search__submit-mob']}
				onClick={handleSearchButtonClick}
				aria-label='Мобильный поиск'>
				<SearchIcon />
			</button>

			<button
				type='button'
				className={
					isSearchActive
						? `${styles.search__close} ${styles.search__close_active}`
						: `${styles.search__close}`
				}
				onClick={handleCloseClick}
				aria-label='Закрыть поиск'>
				<CloseIcon />
			</button>

			{isDropdownOpened && (
				<div className={styles.search__result}>
					{isLoading && <Loader />}

					{error && (
						<p className={styles.search__empty}>
							Произошла ошибка при загрузке данных. Пожалуйста,
							попробуйте позже
						</p>
					)}

					{searchData && !searchData.length && (
						<p className={styles.search__empty}>
							По вашему запросу ничего не найдено
						</p>
					)}

					{searchValue === '' &&
						isDropdownOpened &&
						filmsSearchHistory?.length > 0 && (
							<>
								<p className={styles.search__empty}>История:</p>
								<ul className={styles.search__list}>
									{filmsSearchHistory.map(film => (
										<SearchItem
											key={film.id}
											show={film}
											setIsDropdownOpened={
												setIsDropdownOpened
											}
										/>
									))}
								</ul>
							</>
						)}

					<ul className={styles.search__list}>
						{searchData?.map(result => (
							<SearchItem
								key={result.id}
								show={result}
								setIsDropdownOpened={setIsDropdownOpened}
							/>
						))}
					</ul>

					{debouncedValue && (
						<button
							type='button'
							className={styles['search__view-all']}
							onClick={e => handleSearch(e)}>
							Показать все
						</button>
					)}
				</div>
			)}
		</div>
	)
}

export default Search
