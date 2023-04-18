import Head from "next/head";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";
import { client } from "../util/SupaClient";
import { parseTweets } from "../util/parseTweets";
import { isPast } from 'date-fns'
import { useEffect, useState } from "react";

import Header from "../components/Header";
import Meter from "../components/Meter";
import Daily from "../components/Daily";
import Stats from "../components/Stats";
import Footer from '../components/Footer'

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [ growth, setGrowth ] = useState(0)

  async function signout() {
    const { error } = await client.auth.signOut();
    router.push("/");
    console.log(error);
  }

  useEffect(() => {
    (async function () {
      const {
        data: { user },
      } = await client.auth.getUser();
      const {
        data: { session },
        error,
      } = await client.auth.getSession();

      if (session) {
        let r = await fetch('/api/tweets',{
          method: 'POST',
          body: JSON.stringify({
            user: user.user_metadata
          })
        })
        r = await r.json()
        setTweets(r.data);
        setMetrics(parseTweets(r.data));
        setUser({ followerCount: r.followerCount, ...user });

        let followerCount = JSON.parse(localStorage.getItem('hot-score-followerCount'))
        if(followerCount === null){
          localStorage.setItem('hot-score-start-date', new Date().toJSON())
          localStorage.setItem('hot-score-followerCount', '[0, 0]')
        } else if(isPast(new Date()) || followerCount[0] === 0){
            localStorage.setItem('hot-score-start-date', new Date().toJSON())
            followerCount[1] = followerCount[0]
            followerCount[0] = r.followerCount
            if(followerCount[1] !== 0){
              let g = (followerCount[0] - followerCount[1]) / followerCount[1] * 100
              setGrowth(r.followerCount)
            }
            localStorage.setItem('hot-score-followerCount', JSON.stringify(followerCount))
          }
        
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Hot Score</title>
        <meta name="description" content="Maintain the tweeting streak." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className={"max-w-[640px] mx-auto p-3 py-6 " + inter.className}>
        <Header data={user} signout={signout} />
        <Meter metrics={metrics} user={user} growth={growth} />
        <Daily metrics={metrics} />
        <Stats metrics={metrics} />
        <Footer />
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      client: "still not ready",
    },
  };
}
