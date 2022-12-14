import type { NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';
import Header from '../components/Header';
import { withHeader } from '../hoc/withHeader';
import { authOptions } from './api/auth/[...nextauth]';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta
          name="description"
          content="Generated by create-t3-app"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <Header />

      {withHeader(
        <main className="container mx-auto flex p-12 gap-8 flex-grow">
          Please login to create a chat room and talk with others
        </main>
      )}
    </>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/chat',
        permanent: false
      }
    };
  } else {
    return { props: {} };
  }
}