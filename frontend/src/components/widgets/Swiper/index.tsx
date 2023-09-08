import Image from 'next/image'
import SwiperCore from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import style from './Swiper.module.scss'

SwiperCore.use([Navigation, Autoplay])

const images = ['/swiper1.jpg', '/swiper2.jpg', '/swiper3.jpg']

const SwiperArea = (): JSX.Element => {
  return (
    <>
      <Swiper slidesPerView={1} className='mySwiper' loop={true} autoplay={{ delay: 5000 }}>
        {images.map((src: string, index: number) => {
          return (
            <SwiperSlide key={`${index}`}>
              <Image className={style.img} src={src} width={1000} height={350} alt='sample' />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default SwiperArea
