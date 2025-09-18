import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data submitted:', formData)
    // Here you would typically send the data to a server
    alert('Thanks for your message! This is just a demo - no message was actually sent.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <section id="contact" className="w-full py-20">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <h2 className="text-3xl font-bold text-center mb-12">CONTACT</h2>
        
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3 bg-gray-800 border border-gray-700 focus:border-white outline-none"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-3 bg-gray-800 border border-gray-700 focus:border-white outline-none"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-3 bg-gray-800 border border-gray-700 focus:border-white outline-none"
                required
              />
            </div>
            <div className="mb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-3 bg-gray-800 border border-gray-700 focus:border-white outline-none"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit"
                className="inline-block px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact