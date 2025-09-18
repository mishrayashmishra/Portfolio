import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function Home() {
  const handleDownloadResume = () => {
    // Replace with your actual resume file path
    const resumeUrl = '/src/assets/resume/Yash_Mishra_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Yash_Mishra_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen w-full flex flex-col md:flex-row home-diagonal-container">
      {/* Left side - Content over diagonal background */}
      <div className="md:w-1/2 py-20 px-8 md:px-16 lg:px-20 flex flex-col justify-between home-content-left">
        <div className="flex-grow flex flex-col justify-center">
          <p className="text-gray-700 mb-2">Hi, I am</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-black">
            Yash Mishra
          </h1>
          <p className="text-xl text-gray-500 mb-12">
            Front-end Developer / UI Designer
          </p>
          
          {/* Social Icons - Styled like Figma design */}
          <div className="flex justify-center space-x-6 mt-6">
            <a
              href="mailto:mishray314@gmail.com"
              className="group bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-110 border border-gray-100"
              aria-label="Email"
            >
              <MdEmail 
                size={24} 
                className="text-gray-700 group-hover:text-black transition-colors duration-300" 
              />
            </a>
            <a
              href="https://www.github.com/mishrayashmishra"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-110 border border-gray-100"
              aria-label="GitHub"
            >
              <FaGithub 
                size={24} 
                className="text-gray-700 group-hover:text-black transition-colors duration-300" 
              />
            </a>
            <a
              href="http://www.linkedin.com/in/yashmishraa"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-110 border border-gray-100"
              aria-label="LinkedIn"
            >
              <FaLinkedin 
                size={24} 
                className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300" 
              />
            </a>
          </div>

          {/* Download Resume Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleDownloadResume}
              className="group bg-black text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 flex items-center space-x-3 border-2 border-black hover:bg-gray-800 hover:border-gray-800"
            >
              <FaDownload 
                size={18} 
                className="group-hover:animate-bounce transition-all duration-300" 
              />
              <span className="font-medium text-sm tracking-wide">
                DOWNLOAD RESUME
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Content over diagonal background */}
      <div className="md:w-1/2 flex items-center justify-center home-content-right">
        {/* Profile image container */}
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl">
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white">
            <img 
              src="/src/assets/images/ME.png" 
              alt="Yash Mishra - Front-end Developer" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;