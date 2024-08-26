import type { Metadata } from 'next'

import '@/styles/main.css'
import '@/styles/index.scss'
import QueryWrapper from '@/provider/query/QueryWrapper'
import Header from '@/components/header/Header'
import Nav from '@/components/nav/nav'
import StoreProvider from '@/provider/StoreProvider'
import PersistProvider from '@/provider/PersistProvider'

export const metadata: Metadata = {
	title: 'film App',
	description: 'search films',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body>
				<StoreProvider>
					<PersistProvider>
						<QueryWrapper>
							<div className='page-container'>
								<Header />
								<main className='page'>
									<Nav />
									<div className='page-content'>
										{children}
									</div>
								</main>
							</div>
						</QueryWrapper>
					</PersistProvider>
				</StoreProvider>
			</body>
		</html>
	)
}
