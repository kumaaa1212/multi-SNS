import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import style from './Swiper.module.scss'
SwiperCore.use([Navigation, Autoplay])

// カルーセル用の画像
const images = ['/swiper1.jpg', '/swiper2.jpg', '/swiper3.jpg']

const SwiperArea = () => {
  return (
    <>
      <Swiper slidesPerView={1} className='mySwiper' loop={true} autoplay={{ delay: 5000 }}>
        {images.map((src: string, index: number) => {
          return (
            <SwiperSlide key={`${index}`}>
              <Image className={style.img} src={src} width={1000} height={400} alt='sample' />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default SwiperArea
