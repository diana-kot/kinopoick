'use client'

import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { IFilm } from '@/types/interfaces'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import styles from './Slider.module.scss'
import SliderButton from '../sliderButton/SliderButton'

interface ISliderProps {
	spaceBetween: number
	slidesPerView: number | 'auto'
	slides: IFilm[]
	wrapperClassName: string
	slideClassName?: string
	controlsClassName?: string
	children: React.ReactNode[]
}

const Slider = ({
	spaceBetween,
	slidesPerView,
	slides,
	wrapperClassName,
	slideClassName,
	controlsClassName,
	children,
}: ISliderProps) => {
	const slideClasses = slideClassName
		? `${styles.slide} ${slideClassName}`
		: styles.slide

	const controlsClasses = controlsClassName
		? `${controlsClassName}`
		: styles.controls

	return (
		<>
			<Swiper
				spaceBetween={spaceBetween}
				slidesPerView={slidesPerView}
				modules={[Navigation]}
				navigation={{
					nextEl: `.${wrapperClassName} .swiper-button-next`,
					prevEl: `.${wrapperClassName} .swiper-button-prev`,
				}}>
				{slides.map((slide, index) => (
					<SwiperSlide key={slide.id} className={slideClasses}>
						{children[index]}
					</SwiperSlide>
				))}
			</Swiper>

			<div
				className={
					controlsClasses
						? `${controlsClasses} ${wrapperClassName}`
						: ''
				}>
				<SliderButton direction='prev' className='swiper-button-prev' />
				<SliderButton direction='next' className='swiper-button-next' />
			</div>
		</>
	)
}

export default Slider
