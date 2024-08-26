'use server'

import { IFetchMovieParams, IFilm } from '@/types/interfaces'
import { apiHelper } from '@/utils/AxiosConfig'

export const getMovieList = async (params: IFetchMovieParams) =>
	apiHelper('get', 'v1.4/movie', { params })

export const getSearchResult = async (params: IFetchMovieParams) =>
	apiHelper('get', 'v1.4/movie/search', { params })

export const getFilm = async (id: string): Promise<IFilm> =>
	apiHelper('get', `v1.4/movie/${id}`)
