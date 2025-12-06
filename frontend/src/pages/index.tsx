import { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Education Platform</title>
        <meta name="description" content="Professional Education Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <h1>Education Platform</h1>
          <p>Welcome to the Education Platform</p>
        </div>
      </main>
    </>
  )
}

export default Home

