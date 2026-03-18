"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Copy,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EmailJS credentials — template variables: {{name}}  {{email}}  {{message}}
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_ztoi21a";
const EMAILJS_TEMPLATE_ID = "template_mynlkjb";
const EMAILJS_PUBLIC_KEY = "97ztdLBH66YcKVran";

const EMAIL = "harigovindmelath52@gmail.com";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear email error on retype
    if (name === "email") setErrors({});
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    if (!validateEmail(form.email)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  return (
    <section id="contact" className="py-24 border-t border-zinc-900/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* ── LEFT: Info ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100"
            >
              Get in Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.3 }}
              className="text-xl text-zinc-300 font-medium"
            >
              Let&apos;s talk about everything!
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-zinc-400 font-light leading-relaxed"
            >
              Open to collaborations, AI/ML opportunities, and backend development roles.
              Feel free to reach out — I&apos;ll get back to you as soon as possible.
            </motion.p>
          </div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.35 }}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-zinc-300" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-zinc-600 font-bold mb-1">
                  Email
                </p>
                <button
                  onClick={copyEmail}
                  className="text-zinc-300 hover:text-zinc-100 transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  {EMAIL}
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0" />
                  )}
                </button>
                {copied && (
                  <p className="text-[11px] text-emerald-400 mt-0.5">
                    Copied to clipboard!
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-zinc-300" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-zinc-600 font-bold mb-1">
                  Location
                </p>
                <p className="text-zinc-300 text-sm">Kerala, India</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-zinc-300" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-zinc-600 font-bold mb-1">
                  Phone
                </p>
                <a
                  href="tel:+918590849177"
                  className="text-zinc-300 hover:text-zinc-100 transition-colors duration-200 text-sm"
                >
                  +91 8590849177
                </a>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xs text-zinc-600 tracking-widest uppercase font-bold"
          >
            Based in India &bull; Available Worldwide
          </motion.p>
        </div>

        {/* ── RIGHT: Form ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-transparent rounded-2xl blur-2xl -z-10" />

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-8 shadow-2xl flex flex-col gap-5"
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-[11px] font-bold uppercase tracking-widest text-zinc-500"
              >
                Name <span className="text-red-500/70">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                disabled={status === "sending"}
                className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/40 text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-email"
                className="text-[11px] font-bold uppercase tracking-widest text-zinc-500"
              >
                Email <span className="text-red-500/70">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                disabled={status === "sending"}
                className={`w-full px-4 py-3 rounded-xl bg-zinc-800/50 border text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none focus:ring-1 transition-all duration-200 disabled:opacity-50 ${
                  errors.email
                    ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20"
                    : "border-zinc-700/40 focus:border-indigo-500/60 focus:ring-indigo-500/30"
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-[11px] font-bold uppercase tracking-widest text-zinc-500"
              >
                Message <span className="text-red-500/70">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                disabled={status === "sending"}
                className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/40 text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 resize-none disabled:opacity-50"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="flex items-center justify-center gap-2 mt-1 w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-250 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-indigo-900/20"
            >
              {status === "sending" && (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
              )}
              {status === "success" && (
                <><Check className="w-4 h-4" /> Message Sent!</>
              )}
              {status === "error" && (
                <><Send className="w-4 h-4" /> Try Again</>
              )}
              {status === "idle" && (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </button>

            {/* Status messages */}
            {status === "success" && (
              <div className="flex items-center gap-2 justify-center text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-4 py-3">
                <Check className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm">
                  Your message has been sent. I&apos;ll get back to you soon!
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col items-center gap-2 text-center bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <p className="text-sm text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  Message failed. Please email directly:
                </p>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="text-sm text-zinc-300 hover:text-white underline underline-offset-4 transition-colors flex items-center gap-1.5"
                >
                  {copied ? (
                    <><Check className="w-3 h-3 text-emerald-400" /> Copied!</>
                  ) : (
                    <><Copy className="w-3 h-3" /> {EMAIL}</>
                  )}
                </button>
              </div>
            )}
          </form>
        </motion.div>

      </div>
    </section>
  );
}
