import NewReleases from '@/components/newReleases/NewReleases'
import PopularShows from '@/components/popularShows/PopularShows'

export default async function Home({
	searchParams,
}: {
	searchParams?: {
		query?: string
		page?: string
	}
}) {
	const currentPage = Number(searchParams?.page) || 1
	return (
		<>
			<PopularShows />
			<NewReleases currentPage={currentPage} />
		</>
	)
}
