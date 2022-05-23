import Head from 'next/head';
import LogIn from '../../components/LogIn/LogInPage';
const Index = () => {
  return (
    <>
      <Head>
        <title>Login | Teapost</title>

        <meta name="description" content={'Login/Register To Teapost MIS'} />
        <meta name="keywords" content={'Teapost'} />
        <meta name="author" content={'imsamad'} />
      </Head>
      <LogIn />
    </>
  );
};

export default Index;
