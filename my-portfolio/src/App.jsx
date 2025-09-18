import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Portfolio from './components/Portfolio/Portfolio'
//import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import PageLoader from './components/PageLoader/PageLoader' // Add this import

function App() {
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Show loader first */}
      {isLoading && <PageLoader onLoadingComplete={handleLoadingComplete} />}
      
      {/* Main content - only show when loading is complete */}
      {!isLoading && (
        <div className="min-h-screen bg-black text-white">
          <Header />
          <main>
            <Home />
            <About />
            <Skills />
            <Portfolio />
           {/* <Contact /> */}
          </main>
          <Footer />
          
          <ScrollToTop />
        </div>
      )}
      <Analytics />
    </>
  );
}

export default App;