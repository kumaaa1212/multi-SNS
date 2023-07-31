import React, { useEffect, useState } from 'react'
import style from './Release.module.scss'
import RecipeReviewCard from '@/components/parts/Card'
import ReactConfetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
const Release = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [])
  return (
    <div>
      <ReactConfetti width={width} height={height} numberOfPieces={400} recycle={false} />
      <div className={style.release_contents}>
        <h1 className={style.release_title}>Congratulations!</h1>
        <RecipeReviewCard className='600' />
        <button className={style.check_btn}>
          <span>Visit</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='45'
            height='45'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#ffffff'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M7 12l5 5l10 -10' />
            <path d='M2 12l5 5m5 -5l5 -5' />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Release
