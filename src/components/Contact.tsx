import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import ShinyText from './ShinyText';
import { Reveal } from './Reveal';

export const Contact = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childDob: '',
    subject: 'Enroll Your Child',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Basic validation
    if (!formData.parentName || !formData.email || !formData.phone || !formData.childName || !formData.childDob || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        throw new Error(`Server returned a non-JSON response (${response.status})`);
      }

      if (response.ok) {
        setStatus('success');
        setFormData({
          parentName: '',
          email: '',
          phone: '',
          childName: '',
          childDob: '',
          subject: 'Enroll Your Child',
          message: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(data?.error || 'Failed to send message. Please try again later.');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage(error.message || 'A network error occurred. Please check your connection and try again.');
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-white relative overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Reveal y={20} width="100%">
            <div className="inline-block px-5 py-2.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold text-indigo-600 uppercase tracking-widest">Connect With Us</span>
              </div>
            </div>
          </Reveal>
          
          <Reveal y={30} delay={0.2} width="100%">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-950 tracking-tight leading-tight mb-4">
              <ShinyText text="Join Our Montessori Family" speed={3} />
            </h2>
          </Reveal>
          
          <Reveal y={20} delay={0.4} width="100%">
            <p className="text-sm sm:text-lg text-slate-600 font-medium leading-relaxed">
              <ShinyText text="Schedule a tour or ask us anything — we're here to help your child thrive" speed={4} />
            </p>
          </Reveal>
        </div>

        <div className="max-w-4xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row bg-white rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden will-change-transform"
            style={{ translateZ: 0 }}
          >
            {/* Left Panel: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:w-[45%] bg-[#3F2BFF] text-white relative p-8 sm:p-10 flex flex-col justify-between overflow-hidden shrink-0 shadow-2xl z-10 will-change-transform"
              style={{ translateZ: 0 }}
            >
              {/* Pink Circle */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 bg-[#FF9898] rounded-full opacity-90 z-0"></div>

              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
                  <ShinyText text="Contact Information" speed={3} shineColor="rgba(255,255,255,0.8)" />
                </h3>
                <p className="text-[#E0E0E0] mb-6 sm:mb-8 leading-relaxed text-[10px] sm:text-xs font-medium">
                  <ShinyText text="Fill out the form and our team will get back to you within 24 hours." speed={4} shineColor="rgba(255,255,255,0.6)" />
                </p>

                <div className="space-y-4 sm:space-y-6">
                  <a href="tel:+17802466870" className="flex items-center gap-3 sm:gap-4 group">
                    <Phone size={16} className="text-white sm:w-5 sm:h-5" />
                    <span className="text-[10px] sm:text-xs font-bold">
                      <ShinyText text="+1 780-246-6870" speed={4} shineColor="rgba(255,255,255,0.6)" />
                    </span>
                  </a>

                  <a href="mailto:zahradaycare786@gmail.com" className="flex items-center gap-3 sm:gap-4 group">
                    <Mail size={16} className="text-white sm:w-5 sm:h-5" />
                    <span className="text-[10px] sm:text-xs font-bold break-all">
                      <ShinyText text="zahradaycare786@gmail.com" speed={4} shineColor="rgba(255,255,255,0.6)" />
                    </span>
                  </a>

                  <div className="flex items-start gap-4 sm:gap-6 group">
                    <MapPin size={18} className="text-white mt-1 sm:w-6 sm:h-6" />
                    <span className="text-[11px] sm:text-sm font-bold leading-relaxed">
                      <ShinyText text="5515-137 Avenue NW, Edmonton," speed={4} shineColor="rgba(255,255,255,0.6)" />
                      <br />
                      <ShinyText text="AB T5A3L4, Canada" speed={4} shineColor="rgba(255,255,255,0.6)" />
                    </span>
                  </div>
                </div>

                {/* Map Integration */}
                <div className="mt-8 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg h-32 sm:h-40 hover:border-white/40 transition-colors">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501.7541107671962!2d-113.42613899999996!3d53.5983778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a03d1a349e472f%3A0x82d84275fd873820!2sZahra%20Daycare%20Center!5e1!3m2!1sen!2sus!4v1774965057504!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Zahra Daycare Location"
                  />
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-3 sm:gap-4 relative z-10 mt-8 sm:mt-10">
                {[
                  {icon: Facebook, href: '#', label: 'Facebook'}, 
                  {icon: Twitter, href: '#', label: 'Twitter'}, 
                  {icon: Instagram, href: '#', active: true, label: 'Instagram'}, 
                  {icon: Linkedin, href: '#', label: 'LinkedIn'}
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
                      social.active ? 'bg-[#FF9898] text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <social.icon size={16} className="sm:w-5 sm:h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right Panel: Form */}
            <div className="lg:w-[55%] p-6 sm:p-7 bg-white flex flex-col">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    { label: 'Parent/Guardian Name', value: 'parentName', type: 'text', id: 'parent-name' },
                    { label: 'Email', value: 'email', type: 'email', id: 'email' },
                    { label: 'Phone', value: 'phone', type: 'tel', id: 'phone' },
                    { label: "Child's Name", value: 'childName', type: 'text', id: 'child-name' },
                    { label: 'Date of Birth', value: 'childDob', type: 'date', id: 'child-dob' }
                  ].map((field) => (
                    <div key={field.value} className={`relative group ${field.value === 'parentName' ? 'sm:col-span-2' : ''}`}>
                      <label htmlFor={field.id} className="text-[10px] sm:text-xs font-bold text-indigo-600 mb-2 block uppercase tracking-wider">
                        {field.label} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        className="input-premium w-full focus-ring"
                        value={formData[field.value as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.value]: e.target.value })}
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* Radio Buttons */}
                <div className="space-y-3 sm:space-y-4">
                  <label className="text-xs sm:text-sm font-bold text-[#111827] block uppercase tracking-wider">Service Type</label>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {['Book a Tour', 'Enroll Your Child', 'Other'].map((option) => {
                      const optionId = `service-${option.toLowerCase().replace(/\s+/g, '-')}`;
                      return (
                        <label key={option} htmlFor={optionId} className="flex items-center gap-2 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input
                              id={optionId}
                              type="radio"
                              name="subject"
                              className="peer appearance-none w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-[#D1D5DB] checked:border-[#3F2BFF] transition-all"
                              checked={formData.subject === option}
                              onChange={() => setFormData({ ...formData, subject: option })}
                            />
                            <div className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#3F2BFF] scale-0 peer-checked:scale-100 transition-transform" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-[#111827]">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="message" className="text-[10px] sm:text-xs font-bold text-indigo-600 mb-2 block uppercase tracking-wider">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    placeholder="Write your message..."
                    rows={3}
                    className="input-premium w-full focus-ring resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border-2 border-green-200 text-green-700 rounded-premium text-xs sm:text-sm font-bold shadow-premium"
                  >
                    ✓ Message sent successfully! We'll get back to you soon.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-premium text-xs sm:text-sm font-bold shadow-premium"
                  >
                    ✕ {errorMessage}
                  </motion.div>
                )}

                <div className="flex justify-end pt-4">
                  <motion.button
                    whileHover={{ scale: status === 'loading' ? 1 : 1.05, y: status === 'loading' ? 0 : -2 }}
                    whileTap={{ scale: status === 'loading' ? 1 : 0.95 }}
                    type="submit"
                    disabled={status === 'loading'}
                    className={`btn-primary w-full sm:w-auto flex items-center justify-center gap-3 ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                          →
                        </motion.span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
