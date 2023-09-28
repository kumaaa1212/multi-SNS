import Head from 'next/head'
import { NextSeo } from 'next-seo'

interface Props {
  title?: string
  description?: string
  url?: string
  canonical?: string
  locale?: string
  siteName?: string
}

export default function Meta(props: Props): JSX.Element {
  const { title, description, url, canonical, locale, siteName } = props

  return (
    <Head>
      <meta charSet='UTF-8' key='charset' />
      <meta name='viewport' content='width=device-width, initial-scale=1' key='viewport' />
      <link rel='icon' sizes='32x32' href='/soccer_favicon.png' />
      <base href='/home' />
      <title>{title ? title : 'TOKOTOKO=J'}</title>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title: title,
          description: description,
          url: url,
          locale: locale,
          siteName: siteName,
        }}
      />
    </Head>
  )
}
