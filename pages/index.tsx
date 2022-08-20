import path from 'node:path'
import fs from 'node:fs/promises'
import glob from 'glob-promise'
import yaml from 'js-yaml'
import { useState, useRef, useEffect, useCallback } from 'react'
import type { NextPage, GetStaticProps } from 'next'
import styles from './index.module.scss'

import HeadItem from '../components/HeadItem'
import TitleLogo from '../components/TitleLogo'
import AudioPlayer from '../components/AudioPlayer'
import About from '../components/About'
import TermsOfUse from '../components/TermsOfUse'
import PrivacyPolicy from '../components/PrivacyPolicy'
import MusicList from '../components/MusicList'
import Footer from '../components/Footer'

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
