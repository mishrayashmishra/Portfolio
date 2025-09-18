import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ContactModal({ isOpen, onClose, anchorRef, setIsOpen }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const modalRef = useRef(null);
  const [modalStyle, setModalStyle] = useState({});

  // EmailJS Configuration - Replace with your actual values
  const EMAILJS_CONFIG = {
    serviceID: 'service_27cravm',           
    templateID: 'template_sae4qs8',         
    autoReplyTemplateID: 'template_47adndq',  
    publicKey: 'YDgOwkxu9414nN5pd'          
  };

  // Position modal below the button
  useEffect(() => {
    if (isOpen && anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      const modalWidth = 400;
      const padding = 16;
      let left = rect.left - 250;
      
      if (left + modalWidth + padding > window.innerWidth) {
        left = window.innerWidth - modalWidth - padding;
      }
      if (left < padding) {
        left = padding;
      }
      
      setModalStyle({
        position: 'fixed',
        top: rect.bottom + 10,
        left,
        zIndex: 1000
      });
    }
  }, [isOpen, anchorRef]);

  // Focus trap and ESC key handler
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.querySelector('input')?.focus();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Smart scroll handler - closes modal on scroll
  useEffect(() => {
    if (!isOpen) return;
    
    let initialScrollY = window.scrollY;
    const scrollThreshold = 50;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDistance = Math.abs(currentScrollY - initialScrollY);
      
      if (scrollDistance > scrollThreshold) {
        onClose();
      }
    };
    
    const timeoutId = setTimeout(() => {
      initialScrollY = window.scrollY;
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 200);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, onClose]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, setIsOpen, anchorRef]);

  const sendEmail = async (templateParams, templateId = EMAILJS_CONFIG.templateID) => {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.serviceID,
          template_id: templateId,
          user_id: EMAILJS_CONFIG.publicKey,
          template_params: templateParams,
        }),
      });

      if (response.ok) {
        return { success: true };
      } else {
        const errorData = await response.text();
        console.error('EmailJS Error:', errorData);
        throw new Error(`Failed to send email: ${response.status}`);
      }
    } catch (error) {
      console.error('Email sending error:', error);
      return { success: false, error: error.message };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Template parameters for main email (to you)
      const mainEmailParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'mishray314@gmail.com'
      };

      // Template parameters for auto-reply (to user)
      const autoReplyParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      };

      console.log('Sending main email...', mainEmailParams);

      // Send main email to you
      const mainEmailResult = await sendEmail(mainEmailParams);

      if (mainEmailResult.success) {
        console.log('Sending auto-reply email...');
        
        // Send auto-reply to user
        const autoReplyResult = await sendEmail(autoReplyParams, EMAILJS_CONFIG.autoReplyTemplateID);
        
        if (autoReplyResult.success) {
          console.log('Both emails sent successfully');
          setSubmitStatus('success');
        } else {
          console.log('Main email sent, but auto-reply failed:', autoReplyResult.error);
          setSubmitStatus('success'); // Still show success since main email worked
        }
        
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Auto-close after 2.5 seconds
        setTimeout(() => {
          onClose();
        }, 2500);
      } else {
        console.error('Main email send failed:', mainEmailResult.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (submitStatus === 'error') {
      setSubmitStatus(null);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={modalStyle}
          ref={modalRef}
          className="bg-gray-900 p-8 rounded-lg shadow-xl max-w-lg w-full border border-gray-700"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors w-8 h-8 flex items-center justify-center"
            aria-label="Close modal"
          >
            &times;
          </button>
          
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Get In Touch</h2>
          
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-600 text-white p-3 rounded mb-4 text-center"
            >
              ✅ Message sent successfully!
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-600 text-white p-3 rounded mb-4 text-center"
            >
              ❌ Failed to send message. Please check your connection and try again.
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name *"
                className="w-full p-3 bg-gray-800 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none text-white placeholder-gray-400 rounded transition-colors"
                required
                disabled={isSubmitting}
              />
              
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email *"
                className="w-full p-3 bg-gray-800 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none text-white placeholder-gray-400 rounded transition-colors"
                required
                disabled={isSubmitting}
              />
              
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject *"
                className="w-full p-3 bg-gray-800 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none text-white placeholder-gray-400 rounded transition-colors"
                required
                disabled={isSubmitting}
              />
              
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message *"
                className="w-full p-3 bg-gray-800 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none text-white placeholder-gray-400 rounded resize-none transition-colors"
                rows="4"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="w-full mt-6 px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
          
          <p className="text-gray-400 text-sm text-center mt-4">
            * Required fields
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactModal;