'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, RefreshCw } from 'lucide-react';
import { Profile, EducationItem, ExperienceItem, SkillItem, ProjectItem } from '@/lib/data';

interface AiAssistantProps {
  profile: Profile;
  education: EducationItem[];
  experiences: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const presetQuestions = [
  'Siapa Taufik Rahman?',
  'Apa keahlian Taufik?',
  'Apa saja proyek Taufik?',
  'Di mana Taufik pernah bekerja?',
  'Bagaimana cara menghubungi Taufik?',
];

export default function AiAssistant({
  profile,
  education,
  experiences,
  skills,
  projects,
}: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Halo! Saya Asisten AI Taufik. Saya siap membantu Anda mengenal Taufik, pengalaman, keahlian, dan proyek yang pernah dikerjakan.',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateAnswer = (userQuery: string): string => {
    const q = userQuery.toLowerCase();

    if (q.includes('siapa') || q.includes('tentang') || q.includes('profil') || q.includes('bio')) {
      return `${profile.name} adalah ${profile.title}. Beliau merupakan lulusan ${profile.university} dengan IPK ${profile.gpa}. Memiliki keahlian kuat di bidang pengembangan web full stack, analisis sistem, dan keamanan siber.`;
    }

    if (q.includes('keahlian') || q.includes('skill') || q.includes('teknologi') || q.includes('bisa apa')) {
      const webSkills = skills.filter((s) => s.category === 'Pengembangan Web').map((s) => s.name).join(', ');
      const cyberSkills = skills.filter((s) => s.category === 'Keamanan Siber').map((s) => s.name).join(', ');
      const dbSkills = skills.filter((s) => s.category === 'Basis Data').map((s) => s.name).join(', ');

      return `Taufik menguasai berbagai teknologi tingkat lanjut:\n\n• Web Development: ${webSkills}\n• Basis Data: ${dbSkills}\n• Keamanan Siber & Digital Forensics: ${cyberSkills}\n• Desain & UI/UX: Figma, Photoshop, Illustrator\n• TI: Analisis Sistem, IT Support, Infrastruktur Jaringan & Troubleshooting.`;
    }

    if (q.includes('proyek') || q.includes('project') || q.includes('karya') || q.includes('aplikasi')) {
      const projTitles = projects.map((p) => `• ${p.title} (${p.year}): ${p.short_description}`).join('\n');
      return `Berikut adalah beberapa proyek utama Taufik Rahman:\n\n${projTitles}\n\nAnda dapat melihat rincian lengkapnya di section Proyek!`;
    }

    if (q.includes('kerja') || q.includes('pengalaman') || q.includes('bekerja') || q.includes('magang')) {
      const expList = experiences.map((e) => `• ${e.role} di ${e.company} (${e.period})`).join('\n');
      return `Taufik memiliki rekam jejak pengalaman profesional dan pengabdian:\n\n${expList}`;
    }

    if (q.includes('kontak') || q.includes('hubungi') || q.includes('email') || q.includes('wa') || q.includes('whatsapp')) {
      return `Anda dapat menghubungi Taufik Rahman secara langsung melalui:\n\n• Email: ${profile.email}\n• WhatsApp: ${profile.whatsapp}\n• LinkedIn: ${profile.linkedin}\n\nAtau dengan mengisi formulir pada section Kontak!`;
    }

    if (q.includes('ipk') || q.includes('kuliah') || q.includes('pendidikan') || q.includes('lulus')) {
      const edu = education[0];
      return `Taufik menempuh pendidikan di ${edu.institution}, Program Studi ${edu.major}, ${edu.faculty} (${edu.start_year}-${edu.end_year}) dengan IPK ${edu.gpa} (Predikat Sangat Memuaskan).`;
    }

    return `Taufik Rahman, S.Kom adalah Full Stack Developer & Cybersecurity Enthusiast lulusan Universitas Ma'soem (IPK 3,72). Memiliki pengalaman di Lapas Kelas IIA Bekasi, PT. Analyst Forensik Digital, dan Kepolisian RI. Apakah ada hal spesifik mengenai proyek, keahlian, atau kontak yang ingin Anda ketahui?`;
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const newMsg: Message = {
      sender: 'user',
      text: text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateAnswer(text);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: responseText,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Taufik AI Assistant"
          className="relative group min-w-[54px] min-h-[54px] rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-blue-500/40 p-3.5 border-2 border-white/20"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
          </span>
          <Bot className="w-6 h-6" />
        </motion.button>
      </div>

      {/* AI Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 bottom-20 sm:left-auto sm:right-6 sm:w-[420px] h-[550px] max-h-[80vh] z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* Window Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    Asisten AI Taufik
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </h3>
                  <p className="text-[11px] text-blue-100 font-medium">Digital Assistant • Online</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/50 text-xs sm:text-sm">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed font-medium ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/60 rounded-bl-none shadow-sm whitespace-pre-line'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1.5 text-right font-normal ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-center text-slate-400">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-100" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-200" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 text-[11px] font-medium whitespace-nowrap transition-colors shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ketik pertanyaan untuk Asisten AI..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 transition-colors shadow-md shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
