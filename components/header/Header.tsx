'use client'
import Link from 'next/link'

import styles from './Header.module.scss'
import Search from '@/ui/search/Search'

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={`${styles.header__container} container`}>
				<Link href='/' className={styles.header__logo}>
					LOGO
				</Link>

				<div className={styles.header__panel}>
					<Search />
					<Link href='/favorites' className={styles.header__login}>
						Избранное
					</Link>
					<button type='button' className={styles.header__login}>
						Войти
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header
