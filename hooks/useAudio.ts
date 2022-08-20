import { useState, useEffect } from 'react'

type Music = { oggLoop: string; mp3Loop: string } | null

export const useAudio = (
  music: Music,
  loop: boolean,
  volume: number,
  onPlayEnd: () => void,
): [boolean, number, (time: number) => void, () => void, () => void] => {
  const [audio] = useState<HTMLAudioElement | null>(() =>
    typeof Audio !== 'undefined' ? new Audio() : null,
  )
  const [_, setForceUpdate] = useState(() => false)

  useEffect(() => {
    if (audio === null) return

    const forceUpdate = () => setForceUpdate((prev) => !prev)
    const onEnded = () => {
      forceUpdate()
      onPlayEnd()
    }

    if (music == null) {
      audio.pause()
      return
    }

    if (audio.canPlayType('audio/ogg')) {
      audio.src = music.oggLoop
    } else if (audio.canPlayType('audio/mpeg')) {
      audio.src = music.mp3Loop
    } else {
      return
    }

    console.log('audio.src', audio.src)

    audio.play()

    audio.addEventListener('play', forceUpdate)
    audio.addEventListener('pause', forceUpdate)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('timeupdate', forceUpdate)
    audio.addEventListener('volumechange', forceUpdate)

    return () => {
      audio.removeEventListener('play', forceUpdate)
      audio.removeEventListener('pause', forceUpdate)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('timeupdate', forceUpdate)
      audio.removeEventListener('volumechange', forceUpdate)
    }
  }, [audio, music, onPlayEnd])

  if (audio === null) return [false, 0, (_) => {}, () => {}, () => {}]

  audio.volume = volume
  audio.loop = loop

  const play = () => audio.play()
  const pause = () => audio.pause()
  const isPlaying = !audio.paused
  const currentTime = isNaN(audio.currentTime / audio.duration)
    ? 0
    : audio.currentTime / audio.duration
  const setCurrentTime = (time: number) => {
    if (!isNaN(audio.duration)) {
      audio.currentTime = time * audio.duration
    }
  }

  return [isPlaying, currentTime, setCurrentTime, play, pause]
}
