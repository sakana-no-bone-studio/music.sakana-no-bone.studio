import Link from 'next/link'
import styles from './About.module.scss'

const About = () => {
  return (
    <>
      <section className={styles.section}>
        <h1>このサイトについて</h1>
        <p>
          <Link href='/'>music.sakana-no-bone.studio</Link>
          はゲーム音楽を想定した音楽ファイルの配布サイトです。
        </p>
        <p>
          個人でゲーム制作をしている
          <a href='https://twitter.com/MatchaChoco010'>オリトイツキ</a>
          が作曲の練習のために作成した楽曲を配布しています。
        </p>
      </section>

      <section className={styles.section}>
        <h1>楽曲について</h1>
        <p>
          プレビューの音源はループ音源の場合は2ループとしています。
          ダウンロードされる楽曲は1ループのoggデータです。
        </p>
        <p>
          oggデータには、RPGツクールなどで利用可能なループタグが含まれる場合があります。
        </p>
      </section>
    </>
  )
}

export default About
