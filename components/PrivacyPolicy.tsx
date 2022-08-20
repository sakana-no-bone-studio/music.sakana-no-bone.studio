import Link from 'next/link'
import styles from './PrivacyPolicy.module.scss'

const PrivacyPolicy = () => {
  return (
    <section className={styles.section}>
      <h1>プライバシーポリシー</h1>
      <p>
        このサイトでは、コンテンツ制作の参考のためGoogle
        アナリティクスによりページビュー数 /
        各楽曲のダウンロード数などのデータの収集を行っています。サイト訪問時のバナーによってGoogle
        アナリティクスのCookieの利用を拒否できます。その場合でも、Googleアナリティクスにはpingを送信します。
        このpingにはタイムスタンプ、ユーザーエージェント、参照
        URLなどの機能に関する情報、集計情報/個人が特定されない情報が含まれます。
      </p>
      <p>
        すべてのデータは匿名で収集されており、個人を特定するものではありません。
      </p>
      <p>
        この規約に関しての詳細は
        <a href='https://marketingplatform.google.com/about/analytics/terms/jp/'>
          Google アナリティクスサービス利用規約のページ
        </a>
        および
        <a href='https://policies.google.com/technologies/ads?hl=ja'>
          Googleポリシーと規約ページ
        </a>
        もご覧ください。
      </p>
      <p>
        サイト訪問時のCookie利用許可バナーをリセットしもう一度表示する場合は、下のボタンを押してください。
      </p>
    </section>
  )
}

export default PrivacyPolicy
