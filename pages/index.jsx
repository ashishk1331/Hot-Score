import Head from "next/head";
import { Montserrat } from "next/font/google";
import { TwitterLogo } from '@phosphor-icons/react'
import { client } from "../util/SupaClient";
import { useEffect } from "react";
import { useRouter } from "next/router";
import logo from "../images/logo.png";
import home from '../images/home.png'
import Image from "next/image";

const inter = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function Home() {

    const router = useRouter()

    async function signInWithTwitter() {
        const { data, error } = await client.auth.signInWithOAuth({
            provider: "twitter",
        });
    }

    useEffect(() => {
        (async function(){

            const { data: { session } , error } = await client.auth.getSession()
            if(session){
                router.push('/app')
            }
        })()
    }, [])

    return (
        <>
            <Head>
                <title>Hot Score</title>
                <meta
                    name="description"
                    content="Maintain the tweeting streak."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
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
            <main
                className={
                    "max-w-[640px] mx-auto p-3 py-6 flex flex-col items-center gap-4 text-center overflow-hidden h-screen " +
                    inter.className
                }
            >
                <Image
                    src={logo}
                    width={256}
                    height={256}
                    alt="@Hot score logo"
                    className="md:w-16 w-12 md:h-16 h-12 mt-12"
                />
                <h1 className="md:text-4xl text-3xl font-medium">Hot Score</h1>
                <p className="md:text-xl text-lg">
                    Increase your follower count
                    <br />
                    by setting goals.
                </p>
                <a
                    className="flex items-center gap-3 p-3 px-6 rounded bg-blue md:text-xl text-lg text-white cursor-pointer my-4"
                    onClick={() => signInWithTwitter()}
                >
                    <TwitterLogo weight="fill" className="md:w-6 w-4 md:h-6 h-6" />
                    Sign In
                </a>

                <div className="w-[80%] h-[100%] border-2 border-secondary-100 rounded-3xl">
                    <Image 
                        src={home}
                        width={512}
                        height="auto"
                        className="w-full object-cover rounded-3xl"
                    />
                </div>
            </main>
        </>
    );
}
