import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <>
      <section className={styles.section}>
        <a href='https://twitter.com/sakananobone_st'>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </section>
    </>
  )
}

export default Footer
