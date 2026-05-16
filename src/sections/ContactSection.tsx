import React, { useState } from 'react';
import { send } from '@emailjs/browser';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle,
  Facebook, Instagram, MessageSquare,
} from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

export default function ContactSection() {
  const { data, addMessage } = usePortfolioStore();
  const { personalInfo } = data;

  const [form, setForm]         = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      addMessage(form);
      const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;
      if (serviceId && templateId && publicKey) {
        // We embed the sender's details directly into the message 
        // to ensure they are visible regardless of EmailJS template config.
        const fullMessage = `Sender Name: ${form.name}\nSender Email: ${form.email}\n\nMessage:\n${form.message}`;

        await send(serviceId, templateId, {
          from_name: form.name, 
          from_email: form.email,
          subject: form.subject, 
          message: fullMessage,
          to_email: personalInfo.email,
        }, publicKey);
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrors(prev => ({ ...prev, form: 'Failed to send message. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-600 focus:outline-none transition-all ${
      errors[field]
        ? 'border-red-500 focus:border-red-400'
        : 'border-white/10 focus:border-violet-500 focus:bg-violet-500/5'
    }`;

  const contactItems = [
    { icon: Mail,   label: 'Email',    value: personalInfo.email,    href: `mailto:${personalInfo.email}` },
    { icon: Phone,  label: 'Phone',    value: personalInfo.phone,    href: `tel:${personalInfo.phone}` },
    { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
  ].filter(c => c.value);

  const socials = [
    { icon: Github,    href: personalInfo.github,    label: 'GitHub' },
    { icon: Linkedin,  href: personalInfo.linkedin,  label: 'LinkedIn' },
    { icon: Facebook,  href: personalInfo.facebook,  label: 'Facebook' },
    { icon: Instagram, href: personalInfo.instagram, label: 'Instagram' },
  ].filter(s => s.href);

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold tracking-widest uppercase mb-4">
            Let's Talk
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 section-heading-line">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg mt-6 max-w-xl mx-auto">
            Have a project in mind? I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card rounded-3xl p-7">
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-violet-400" /> Contact Info
              </h3>
              <div className="space-y-5 mb-8">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 shrink-0">
                      <Icon className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-white hover:text-violet-300 transition-colors text-sm break-all">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {socials.length > 0 && (
                <>
                  <p className="text-gray-500 text-xs font-medium mb-3 uppercase tracking-wider">Follow me</p>
                  <div className="flex gap-3">
                    {socials.map(({ icon: Icon, href, label }) => (
                      <a key={label} href={href!} target="_blank" rel="noopener noreferrer"
                        className="p-2.5 rounded-xl glass-card text-gray-400 hover:text-white hover:border-violet-500/30 transition-all"
                        title={label}>
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-3xl h-full flex flex-col items-center justify-center text-center p-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mb-5 mx-auto" />
                </motion.div>
                <h3 className="text-white text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-6">Thanks for reaching out! I'll get back to you soon.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="px-5 py-2.5 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <div className="glass-card rounded-3xl p-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1.5">Your Name *</label>
                      <input type="text" value={form.name} placeholder="Charitha Lakshan"
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className={inputClass('name')} />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1.5">Email Address *</label>
                      <input type="email" value={form.email} placeholder="hello@example.com"
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className={inputClass('email')} />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-1.5">Subject *</label>
                    <input type="text" value={form.subject} placeholder="Project inquiry, collaboration…"
                      onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      className={inputClass('subject')} />
                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-1.5">Message *</label>
                    <textarea value={form.message} placeholder="Tell me about your project…" rows={5}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className={`${inputClass('message')} resize-none`} />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {errors.form && <p className="text-red-400 text-sm">{errors.form}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all disabled:opacity-50 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {loading ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
