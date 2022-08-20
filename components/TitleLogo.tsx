import Image from 'next/image'
import styles from './TitleLogo.module.scss'

const TitleLogo = () => {
  return (
    <div className={styles.titleLogo}>
      <Image
        src='/logo.svg'
        alt='music.sakana-no-bone.studio'
        width={400}
        height={75}
      />
    </div>
  )
}

export default TitleLogo
