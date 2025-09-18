import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="py-8 bg-gray-900 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold mb-4">Yash Mishra</div>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaGithub size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter size={20} />
            </a>
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Yash Mishra. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer