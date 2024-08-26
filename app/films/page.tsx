import type { Metadata } from 'next'

import List from '@/components/list/List'
import filmsListData from './filmsListData'

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Фильмы',
		description:
			'Не знаете что посмотреть? Большая коллекция фильмов, сериалов и мультфильмов на Кинопоиске. Списки в категории “Фильмы“, составленные нашей редакцией и алгоритмами нашего онлайн-кинотеатра помогут вам выбрать кино для просмотра в отличном качестве',
	}
}

export default async function Films() {
	return (
		<>
			<h1>Списки фильмов</h1>
			<List items={filmsListData} />
		</>
	)
}
