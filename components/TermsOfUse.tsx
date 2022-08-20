import styles from './TermsOfUse.module.scss'

const TermsOfUse = () => {
  return (
    <section className={styles.section}>
      <h1>利用規約</h1>
      <p>
        利用者は、本サイト及び本サイトの素材を利用するにあたり、以下の利用規約に同意したものとみなします。
      </p>
      <p>本サイトの楽曲の著作権はオリトイツキに帰属します。</p>
      <p>
        本サイトの楽曲はダウンロードしてご利用ください。
        将来的に配布URLの変更等が行われる可能性があるため、直リンクによる利用は避けてください。
      </p>
      <p>利用者はダウンロードした楽曲を次のように利用できます。</p>
      <ul>
        <li>公開中の音源は使用料無料で利用できます。</li>
        <li>ライセンス表記は必要ありません。</li>
        <li>商用作品へ組み込んで利用できます。</li>
        <li>音源の加工等自由にできます。</li>
        <li>利用可能ジャンルに制限はありません。</li>
      </ul>
      <p>利用者はダウンロードした楽曲を次のように利用できません。</p>
      <ul>
        <li>自分が作曲したと偽ること。</li>
        <li>その他 著作権情報を偽ること。</li>
        <li>音楽素材そのものを販売すること。</li>
        <li>その他 楽曲以外のコンテンツ内容が薄いものへ利用し配布すること。</li>
        <li>著作監理団体への楽曲登録をすること。</li>
        <li>Content IDの取得をすること。</li>
        <li>その他 他の利用者の利用を妨げること。</li>
      </ul>
      <p>
        規約が変更される可能性があります。その場合、ダウンロード時点での規約が反映されるものとします。
      </p>
      <p>
        不明点は
        <a href='https://twitter.com/MatchaChoco010'>オリトイツキ</a>
        もしくは
        <a href='https://twitter.com/sakananobone_st'>
          sakana-no-bone.studioのTwitter
        </a>
        まで連絡をください。
      </p>
      <p>
        <time dateTime='2022-08-15'>2022年8月15日</time>最終更新
      </p>
    </section>
  )
}

export default TermsOfUse
