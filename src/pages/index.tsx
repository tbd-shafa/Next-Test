import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import config from '../config';



const Home: NextPage = () => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
 
  useEffect(() => {
    const authData = localStorage.getItem(config.TOKEN_STORAGE_KEY);
    if (authData && router.query.registration !== 'success') {
      router.push('/dashboard');
      return;
    }
  }, [router, router.query]);

  useEffect(() => {
    if (router.query.registration === 'success') {
      setShowSuccessPopup(true);
    }
  }, [router.query]);

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Head>
        <title>MediArchive - Your Medical Records Management Solution</title>
        <meta name="description" content="Securely store and manage your medical records with MediArchive" />
        <link rel="icon" href="images/favicon.ico" />
      </Head>

      <Header />

      <main className="login-main">
        <div className="container">
          <div className="login-container">
            <div className="left-section">
              <div className="body-icon mb-5">
                <img
                  src="/images/medical-illustration.svg"
                  alt="Medical Records Illustration"
                  className="medical-illustration"
                />
              </div>
              <div className="content">
                <h2>Access to medical records </h2>
                <p>
                  Enjoy the freedom to access, edit, and <br />
                  share your medical records in the MediArchive system.
                </p>
              </div>
            </div>
            <div className="right-section">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    
    </div>
    
  );
};

export default Home;
