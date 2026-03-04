import React from 'react'
import { Compass, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-background border-t border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
                <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-4">
                    <div className="flex items-center space-x-2">
                        <Compass className="w-6 h-6 text-primary" />
                        <span className="text-xl font-bold tracking-tight">
                            CareerCompass<span className="text-primary">AI</span>
                        </span>
                    </div>
                    <p className="text-muted-foreground max-w-sm">
                        Empowering the next generation of professionals with AI-driven career insights and personalized growth roadmaps.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="p-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-foreground mb-4">Platform</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><a href="#" className="hover:text-primary transition-colors">Assessment</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Career Exploration</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Roadmap Generator</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Market Trends</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-foreground mb-4">Support</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-foreground mb-4">Our Team</h4>
                    <ul className="space-y-3 text-muted-foreground">
                        <li>
                            <p className="text-foreground font-medium text-sm">Anvi Pawar</p>
                        </li>
                        <li>
                            <p className="text-foreground font-medium text-sm">Tanvi Shende</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-muted-foreground text-sm">
                © {new Date().getFullYear()} CareerCompass AI. All rights reserved.
            </div>
        </footer>
    )
}
