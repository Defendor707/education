import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Education Platform</title>
        <meta name="description" content="Professional Education Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Education Platform</h1>
          <p className={styles.description}>
            Professional ta'lim platformasi
          </p>
          <div className={styles.buttons}>
            <Link href="/signup" className={styles.button}>
              Ro'yxatdan o'tish
            </Link>
            <Link href="/signin" className={styles.buttonSecondary}>
              Kirish
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home

