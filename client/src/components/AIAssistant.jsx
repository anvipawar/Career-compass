import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, BrainCircuit, Sparkles, User } from 'lucide-react'
import { chatWithAI } from '../services/careerAI'

const SYSTEM_RESPONSES = {
    greeting: "Hi! 👋 I'm your CareerCompass AI assistant. I can help you with career guidance, college info, course recommendations, and more. What would you like to know?",
}

export default function AIAssistant() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'assistant', text: SYSTEM_RESPONSES.greeting, id: 0 }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    const sendMessage = async (overrideText = '') => {
        const text = (overrideText || input).trim()
        if (!text) return

        // Add user message locally
        const userMsg = { role: 'user', text, id: Date.now() }
        setMessages(prev => [...prev, userMsg])

        if (!overrideText) setInput('')
        setIsTyping(true)

        try {
            // Prepare messages for AI (limit to last 10 for performance)
            const chatHistory = messages.concat(userMsg).slice(-10).map(m => ({
                role: m.role,
                text: m.text
            }))

            const response = await chatWithAI(chatHistory)

            if (response.success && response.reply) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    text: response.reply,
                    id: Date.now() + 1
                }])
            } else {
                throw new Error('Invalid response from AI')
            }
        } catch (err) {
            console.error('AI Error:', err)
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: "I'm having trouble connecting to my brain right now. 🤖 Please check your internet or try again in a moment!",
                id: Date.now() + 1
            }])
        } finally {
            setIsTyping(false)
        }
    }

    const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

    const quickReplies = ['Best careers for PCM?', 'Top colleges in Maharashtra', 'Free coding courses', 'Government jobs 2026']

    return (
        <>
            {/* FAB Button */}
            <motion.button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-2xl"
                style={{ boxShadow: '0 0 30px rgba(56,189,248,0.4)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                id="ai-assistant-fab"
            >
                <AnimatePresence mode="wait">
                    {open
                        ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X className="w-6 h-6 text-white" /></motion.div>
                        : <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><MessageCircle className="w-6 h-6 text-white" /></motion.div>
                    }
                </AnimatePresence>
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-1.5rem)] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        style={{ background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(20px)' }}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-b border-white/10">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                <BrainCircuit className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-sm flex items-center gap-1.5">
                                    CareerCompass AI <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                </div>
                                <div className="text-xs text-green-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                                    Online · India-Focused
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-72 overflow-y-auto p-4 space-y-3">
                            {messages.map(msg => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${msg.role === 'assistant' ? 'bg-gradient-to-br from-cyan-500 to-purple-600' : 'bg-white/10 border border-white/20'}`}>
                                        {msg.role === 'assistant' ? <BrainCircuit className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                                    </div>
                                    <div className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-white/8 border border-white/10 text-white/90 rounded-tl-none' : 'bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/20 text-white rounded-tr-none'}`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
                                        <BrainCircuit className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="px-4 py-3 bg-white/8 border border-white/10 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                        {[0, 1, 2].map(i => <span key={i} className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                                    </div>
                                </motion.div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Quick Replies */}
                        <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                            {quickReplies.map(q => (
                                <button key={q} onClick={() => { setInput(q); setTimeout(sendMessage, 50) }}
                                    className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/40 transition-all text-white/70 hover:text-white">
                                    {q}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="flex gap-2 p-3 border-t border-white/10">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="Ask about careers, colleges..."
                                className="flex-grow px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-cyan-500/50 placeholder-white/30 text-white"
                                id="ai-chat-input"
                            />
                            <button onClick={sendMessage} disabled={!input.trim()}
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-transform flex-shrink-0">
                                <Send className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
