import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faBackwardStep,
  faForwardStep,
  faRepeat,
  faPause,
  faShuffle,
  faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons'
import { getTrackBackground, Range } from 'react-range'
import { useAudio } from '../hooks/useAudio'
import styles from './AudioPlayer.module.scss'

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
  playing: number | null
  shuffle: boolean
  onPlayEnd: () => void
  onPlay: () => void
  onNext: () => void
  onPrev: () => void
  onChangeShuffle: (shuffle: boolean) => void
}

const AudioPlayer = (props: Props) => {
  const music = props.playing !== null ? props.musicList[props.playing] : null
  const [showVolume, setShowVolume] = useState(() => false)
  const [volume, setVolume] = useState(() => 0.5)
  const [isLoop, setIsLoop] = useState(() => false)
  const [isPlaying, currentTime, setCurrentTime, play, pause] = useAudio(
    music,
    isLoop,
    volume,
    props.onPlayEnd,
  )
  const volumeSliderRef = useRef<HTMLDivElement>(null)

  const title =
    props.playing !== null ? props.musicList[props.playing].title : ''
  const playIcon = isPlaying ? (
    <FontAwesomeIcon icon={faPause} color='rgb(85, 85, 85)' />
  ) : (
    <FontAwesomeIcon icon={faPlay} color='rgb(85, 85, 85)' />
  )

  useEffect(() => {
    const elem = volumeSliderRef.current
    const handleClickOutsideOfVolumeSlider = (e: MouseEvent) => {
      if (showVolume && !elem?.contains(e.target as Node)) setShowVolume(false)
    }
    document.addEventListener('mouseup', handleClickOutsideOfVolumeSlider)
    return () =>
      document.removeEventListener('mouseup', handleClickOutsideOfVolumeSlider)
  }, [showVolume, volumeSliderRef])

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.musicTitle}>
        <div className={styles.musicTitleText}>{title}</div>
        <div
          className={showVolume ? styles.volumeButtonShow : styles.volumeButton}
          onClick={() => setShowVolume(true)}
        >
          <FontAwesomeIcon icon={faVolumeHigh} color='rgb(85, 85, 85)' />
        </div>
      </div>
      <div className={styles.buttonList}>
        <div
          className={
            props.shuffle ? styles.sideButtonEnabled : styles.sideButton
          }
          onClick={() => {
            props.onChangeShuffle(!props.shuffle)
          }}
        >
          <FontAwesomeIcon icon={faShuffle} color='rgb(85, 85, 85)' />
        </div>
        <div className={styles.sideButton} onClick={props.onPrev}>
          <FontAwesomeIcon icon={faBackwardStep} color='rgb(85, 85, 85)' />
        </div>
        <div
          className={styles.playButton}
          onClick={() => {
            if (isPlaying) {
              pause()
            } else {
              if (props.playing != null) {
                play()
              }
              props.onPlay()
            }
          }}
        >
          {playIcon}
        </div>
        <div className={styles.sideButton} onClick={props.onNext}>
          <FontAwesomeIcon icon={faForwardStep} color='rgb(85, 85, 85)' />
        </div>
        <div
          className={isLoop ? styles.sideButtonEnabled : styles.sideButton}
          onClick={() => setIsLoop(!isLoop)}
        >
          <FontAwesomeIcon icon={faRepeat} color='rgb(85, 85, 85)' />
        </div>
      </div>
      <div className={styles.timeSlider}>
        <Range
          min={0}
          max={1}
          step={0.001}
          values={[currentTime]}
          onChange={(v) => setCurrentTime(v[0])}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              className={styles.timeSliderTrack}
            >
              <div
                ref={props.ref}
                className={styles.timeSliderTrackInner}
                style={{
                  background: getTrackBackground({
                    values: [currentTime],
                    colors: ['rgb(230, 39, 187)', 'rgb(128, 128, 128)'],
                    min: 0,
                    max: 1,
                  }),
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              className={styles.timeSliderThumb}
              {...props}
              style={{
                ...props.style,
              }}
            />
          )}
        />
      </div>

      <div
        ref={volumeSliderRef}
        className={
          showVolume ? styles.volumeSliderShow : styles.volumeSliderHide
        }
      >
        <Range
          min={0}
          max={1}
          step={0.01}
          values={[volume]}
          onChange={(v) => setVolume(v[0])}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              className={styles.volumeSliderTrack}
            >
              <div
                ref={props.ref}
                className={styles.volumeSliderTrackInner}
                style={{
                  background: getTrackBackground({
                    values: [volume],
                    colors: ['rgb(230, 39, 187)', 'rgb(128, 128, 128)'],
                    min: 0,
                    max: 1,
                  }),
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              className={styles.volumeSliderThumb}
              {...props}
              style={{
                ...props.style,
              }}
            />
          )}
        />
      </div>
    </div>
  )
}

export default AudioPlayer
