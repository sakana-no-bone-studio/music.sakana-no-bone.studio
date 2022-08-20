import { MutableRefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faDownload } from '@fortawesome/free-solid-svg-icons'
import styles from './MusicList.module.scss'

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
  onPlay: (index: number) => void
  tableRef: MutableRefObject<HTMLTableElement | null>
}

const MusicList = (props: Props) => {
  return (
    <section className={styles.section}>
      <h1>楽曲一覧</h1>
      <table ref={props.tableRef} className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>試聴</th>
            <th>タイトル</th>
            <th>追加日</th>
            <th>ダウンロード</th>
          </tr>
        </thead>
        <tbody>
          {props.musicList.map((music, index) => (
            <tr key={index} className={styles.tr}>
              <td className={styles.tdPlay}>
                <button
                  className={index == props.playing ? styles.playing : ''}
                  onClick={() => props.onPlay(index)}
                >
                  <FontAwesomeIcon icon={faPlay} />
                </button>
              </td>
              <td className={styles.tdTitle}>{music.title}</td>
              <td className={styles.tdDate}>{music.date}</td>
              <td className={styles.tdDownload}>
                <a href={music.ogg} download data-music-title={music.title}>
                  <FontAwesomeIcon icon={faDownload} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default MusicList
