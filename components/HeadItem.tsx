import Head from 'next/head'

const HeadItem = () => {
  return (
    <Head>
      <title>music.sakana-no-bone.studio</title>
      <link rel='icon' href='/favicon.ico' />

      <meta property='og:type' content='article' />
      <meta property='og:title' content='music.sakana-no-bone.studio' />
      <meta
        property='og:description'
        content='ゲーム用途を想定したフリーBGM配布サイト|music.sakana-no-bone.studio'
      />
      <meta property='og:url' content='https://music.sakana-no-bone.studio/' />
      <meta
        property='og:image'
        content='https://music.sakana-no-bone.studio/ogpimage.png'
      />

      <meta name='twitter:card' content='summary_large_image' />
      <meta
        name='twitter:image'
        content='https://music.sakana-no-bone.studio/ogpimage.png'
      />
      <meta name='twitter:site' content='Start Point' />
      <meta name='twitter:title' content='music.sakana-no-bone.studio' />
      <meta
        name='twitter:description'
        content='ゲーム用途を想定したフリーBGM配布サイト|music.sakana-no-bone.studio'
      />
      <meta name='twitter:url' content='https://music.sakana-no-bone.studio/' />
      <meta name='twitter:creator' content='@sakananobone_st' />
    </Head>
  )
}

export default HeadItem
