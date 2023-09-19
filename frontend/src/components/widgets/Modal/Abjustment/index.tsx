import ModalBase from 'components/parts/Modal'
import style from './AbjustModal.module.scss'
import Image from 'next/image'
import ImageImg from '/public/thumbnail.png'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AbjustModal(props: Props) {
  const { open, setOpen } = props

  return (
    <ModalBase open={open} setOpen={setOpen}>
      <div className={style.abjust_modal}>
        <button onClick={() => setOpen(!open)} className={style.close_btn}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-x'
            width='40'
            height='40'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#000000'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M18 6l-12 12' />
            <path d='M6 6l12 12' />
          </svg>
        </button>
        <div className={style.header_content}>
          <h1 className={style.abjust_title}>TOKOTKO=J~攻略~</h1>
          <Image
            src={ImageImg}
            alt={'TOKOTKO=J~攻略 イメージ画像'}
            width={600}
            height={300}
            className={style.main_img}
          />
        </div>
        <div className={style.abjust_content}>
          <div className={style.scrollo_modal}>
            <section>
              <h1>何を投稿する？</h1>
              <p>
                TOKOTOKO=JはJリーグを愛する人のために作られたアプリです。使う人はJリーグを愛するサポーターだけです。つまりJリーグサポーターの心踊る投稿をすればいいのです!
              </p>
              <p>具体的には、、、</p>
              <ul>
                <li>旅の記録をつける</li>
                <li>仲間を見つける</li>
              </ul>
            </section>
            <section>
              <h2>何を伝える？</h2>
              <ul>
                <li>自分の魅力を見せる</li>
                <li>旅行の計画を立てる</li>
              </ul>
              <p>
                Jリーグの遠征は普通の旅行と異なる点があります。サッカーが目的であったり、旅行として人気な地域に行く訳ではないなど様々な点で違いはありますが、大きな違いは「大きな予定の変更が許されない」「試合の結果によって感情が左右されることです」
              </p>
              <div>
                <p>「大きな予定の変更が許されない」</p>
                <p>
                  時間的な問題や目的地のお店が混んでいたなどにより、やむを得ない予定の変更があると思います。しかしJリーグの遠征では、予定の変更は許されません。試合時間が決まっているために、大きな予定変更は試合へ影響が出てしまいます。
                </p>
              </div>
              <div>
                <p>「試合の結果によって感情が左右される」</p>
                <p>
                  普通の旅行では基本的に気分が下がることはありません。新しい体験や景色によりテンションは自然と高くなるでしょう。しかしJリーグの遠征は違います。試合の結果により気分が下がってしまいます。普通の旅行ではありえないことです。
                </p>
              </div>
            </section>
            <section>
              <h2>見せ方</h2>
              <p>
                以上のことを踏まえ、TOKOTOKO=JではJリーグ好きのためのアルバムを投稿できるようになっています。他の人の旅行プランを参考にして、自分の旅行プランを決めやすくできます。
              </p>
            </section>
          </div>
        </div>
      </div>
    </ModalBase>
  )
}
