import path from 'node:path'
import fs from 'node:fs/promises'
import glob from 'glob-promise'
import yaml from 'js-yaml'
import { useState, useRef, useEffect, useCallback } from 'react'
import type { NextPage, GetStaticProps } from 'next'
import Script from 'next/script'
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent'
import styles from './index.module.scss'

import HeadItem from '../components/HeadItem'
import TitleLogo from '../components/TitleLogo'
import AudioPlayer from '../components/AudioPlayer'
import About from '../components/About'
import TermsOfUse from '../components/TermsOfUse'
import PrivacyPolicy from '../components/PrivacyPolicy'
import MusicList from '../components/MusicList'
import Footer from '../components/Footer'

import removeMatchedCookies from '../utils/removeMatchedCookies'

type Props = {
  musicList: [
    {
      title: string
      date: string
      ogg: string
      oggLoop: string
      mp3Loop: string
    },
  ]
}

const Index: NextPage<Props> = (props: Props) => {
  const musicListRef = useRef<HTMLTableElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState<number | null>(() => null)
  const [shuffle, setShuffle] = useState<boolean>(() => false)
  const [trackList, setTrackList] = useState(() =>
    props.musicList.map((_, index) => index),
  )
  const [isScrollTop, setIsScrollTop] = useState<boolean>(() => true)

  useEffect(() => {
    const right = rightRef.current
    const onScroll = () => {
      if (right?.scrollTop === 0) {
        setIsScrollTop(true)
      } else {
        setIsScrollTop(false)
      }
    }
    right?.addEventListener('scroll', onScroll)
    return () => right?.removeEventListener('scroll', onScroll)
  }, [rightRef, isScrollTop])

  useEffect(() => {
    if (getCookieConsentValue() == 'true') {
      gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      })
    }
  }, [])

  const onPlayEnd = useCallback(() => {
    if (index == null) return
    const currentIndex = trackList.findIndex((i) => i === index)
    if (currentIndex === -1 || currentIndex === trackList.length - 1) {
      setIndex(trackList[0])
    } else {
      setIndex(trackList[currentIndex + 1])
    }
  }, [index, trackList])
  const onPlay = useCallback(() => {
    const table = musicListRef.current
    if (table !== null && rightRef.current !== null) {
      rightRef.current.scrollTo({
        top: table.offsetTop,
        behavior: 'smooth',
      })
      window.scrollTo({
        top: table.offsetTop,
        behavior: 'smooth',
      })
    }
    if (index == null) {
      setIndex(0)
      return
    }
  }, [musicListRef, rightRef, index])
  const onNext = useCallback(() => {
    if (index == null) {
      setIndex(0)
      return
    }
    const currentIndex = trackList.findIndex((i) => i === index)
    if (currentIndex === -1 || currentIndex === trackList.length - 1) {
      setIndex(trackList[0])
    } else {
      setIndex(trackList[currentIndex + 1])
    }
  }, [index, trackList])
  const onPrev = useCallback(() => {
    if (index == null) {
      setIndex(trackList.length - 1)
      return
    }
    const currentIndex = trackList.findIndex((i) => i === index)
    if (currentIndex === -1 || currentIndex === 0) {
      setIndex(trackList[trackList.length - 1])
    } else {
      setIndex(trackList[currentIndex - 1])
    }
  }, [index, trackList])
  const onChangeShuffle = useCallback(
    (shuffle: boolean) => {
      setShuffle(shuffle)
      if (shuffle) {
        const newTrackList = props.musicList.map((_, index) => index)
        newTrackList.sort(() => Math.random() - 0.5)
        setTrackList(newTrackList)
        setIndex(Math.floor(Math.random() * newTrackList.length))
      } else {
        setIndex(0)
        setTrackList(props.musicList.map((_, index) => index))
      }
    },
    [props.musicList],
  )

  return (
    <>
      <HeadItem />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQKHXTQ"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />
      <Script
        id='gtag'
        data-cookieconsent='ignore'
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
});`,
        }}
      />
      <Script
        id='gtm'
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PQKHXTQ');`,
        }}
      />
      <CookieConsent
        location='bottom'
        enableDeclineButton
        buttonText='Cookieを許可する'
        declineButtonText='Cookieを拒否する'
        style={{ background: '#ffaacc' }}
        buttonStyle={{ color: '#f0a', fontSize: '13px' }}
        onAccept={() => {
          window.gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'granted',
          })
        }}
        onDecline={() => {
          window.gtag('consent', 'update', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
          })
          removeMatchedCookies(/^_ga/, 'localhost:3000')
        }}
      >
        このサイトではCookieを利用します。詳細はプライバシーポリシーの項目をご覧ください。
      </CookieConsent>
      <main className={styles.main}>
        <div className={styles.left}>
          <div
            className={isScrollTop ? styles.audioPlayerTop : styles.audioPlayer}
          >
            <TitleLogo />
            <AudioPlayer
              musicList={props.musicList}
              playing={index}
              shuffle={shuffle}
              onPlayEnd={onPlayEnd}
              onPlay={onPlay}
              onNext={onNext}
              onPrev={onPrev}
              onChangeShuffle={onChangeShuffle}
            />
          </div>
        </div>
        <div ref={rightRef} className={styles.right}>
          <div>
            <About />
            <TermsOfUse />
            <PrivacyPolicy />
            <MusicList
              tableRef={musicListRef}
              musicList={props.musicList}
              playing={index}
              onPlay={(i) => setIndex(i)}
            />
            <Footer />
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const contents = await glob('contents/**/*.yaml')
  contents.sort((a, b) => (b < a ? -1 : 1))
  const musicList = []
  for (const content of contents) {
    const p = path.parse(content)
    const ogg = path.join(p.dir, `${p.name}.ogg`)
    const oggLoop = path.join(p.dir, `${p.name}-2-loop.ogg`)
    const mp3Loop = path.join(p.dir, `${p.name}-2-loop.mp3`)
    const data = yaml.load(await fs.readFile(content, 'utf8')) as {
      title: string
      date: string
    }
    musicList.push({
      title: data.title,
      date: data.date,
      ogg,
      oggLoop,
      mp3Loop,
    })
  }
  return {
    props: { musicList },
  }
}

export default Index
