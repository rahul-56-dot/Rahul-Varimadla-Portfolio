"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const mailto = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const fields = [
    { id: "name", label: "Your Name", type: "text" },
    { id: "email", label: "Your Email", type: "email" },
    { id: "message", label: "Your Message", type: "textarea" },
  ] as const;

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-neon-cyan text-sm tracking-widest uppercase">Connect</span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold mt-4 neon-text">Let&apos;s Build Together</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: Mail, label: "Email", value: personalInfo.email },
              { icon: Phone, label: "Phone", value: personalInfo.phone },
              { icon: MapPin, label: "Location", value: personalInfo.location },
            ].map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                className="glass-panel rounded-2xl p-5 flex items-center gap-4 border border-white/5 hover:border-neon-cyan/20 transition-colors"
                whileHover={{ x: 4 }}
                data-cursor="card"
              >
                <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-text-muted text-xs font-mono uppercase">{label}</p>
                  <p className="text-text-secondary text-sm">{value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="glass-panel rounded-2xl p-5 border border-green-400/20"
              animate={{ boxShadow: ["0 0 0px rgba(34,197,94,0)", "0 0 20px rgba(34,197,94,0.2)", "0 0 0px rgba(34,197,94,0)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-mono">{personalInfo.availability}</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 glass-panel rounded-3xl p-8 border border-white/10 contact-form-panel"
          >
            {fields.map((field) => (
              <div key={field.id} className="relative mb-6">
                <label
                  htmlFor={field.id}
                  className={cn(
                    "absolute left-4 transition-all duration-300 font-mono text-xs pointer-events-none",
                    focused === field.id || form[field.id as keyof typeof form]
                      ? "-top-2.5 text-neon-cyan form-label-float px-1"
                      : "top-4 text-text-muted"
                  )}
                >
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    rows={4}
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused(null)}
                    className="form-input resize-none"
                  />
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused(null)}
                    className="form-input"
                  />
                )}
                {errors[field.id] && (
                  <p className="text-red-400 text-xs mt-1">{errors[field.id]}</p>
                )}
              </div>
            ))}

            <Button type="submit" variant="neon" size="lg" className="w-full" data-cursor="button" disabled={sent}>
              {sent ? (
                <>
                  <CheckCircle size={18} /> Message Ready!
                </>
              ) : (
                <>
                  <Send size={18} /> Send Transmission
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
