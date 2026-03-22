import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Leaf, Camera, Cloud, Users, ShoppingBag, Star, Shield,
    TrendingUp, Eye, EyeOff, ChevronDown, Check, ArrowRight,
    Smartphone, Zap, Heart
} from 'lucide-react'
import { useAuth, useLang } from '../App'
import './Landing.css'

// Translations
const t = {
    hi: {
        tagline: 'किसानों के लिए AI से फसल की देखभाल',
        heroTitle: 'फसल बीमार लग रही है?',
        heroSubtitle: 'फोटो खींचें, AI बताएगा क्या है समस्या। मौसम की सलाह और किसान साथियों से बात करें।',
        getStarted: 'शुरू करें',
        learnMore: 'और जानें',

        // How it Works
        howItWorks: 'ऐसे काम करता है',
        step1Title: 'फोटो खींचें',
        step1Desc: 'अपने पौधे या फसल की फोटो लें',
        step2Title: 'AI विश्लेषण',
        step2Desc: 'हमारा AI सेकंडों में बीमारी पहचानता है',
        step3Title: 'समाधान पाएं',
        step3Desc: 'उपचार और दवाइयां खरीदने की सलाह',

        // Features
        featuresTitle: 'हमारी विशेषताएं',
        feature1Title: 'AI फसल डायग्नोसिस',
        feature1Desc: 'पौधे की फोटो से बीमारी पहचानें, 95% सटीकता के साथ',
        feature2Title: 'मौसम अलर्ट',
        feature2Desc: 'आपके क्षेत्र का रियल-टाइम मौसम और चेतावनी',
        feature3Title: 'किसान समुदाय',
        feature3Desc: 'लाखों किसानों से जुड़ें और सवाल पूछें',
        feature4Title: 'खरीदारी बाज़ार',
        feature4Desc: 'सस्ते दामों पर खाद, बीज, कीटनाशक खरीदें',

        // Stats
        statsTitle: 'हमारी उपलब्धियां',
        stat1Value: '50,000+',
        stat1Label: 'किसान जुड़े',
        stat2Value: '1,00,000+',
        stat2Label: 'स्कैन किए गए',
        stat3Value: '95%',
        stat3Label: 'सटीकता',
        stat4Value: '24/7',
        stat4Label: 'सहायता',

        // Testimonials
        testimonialsTitle: 'किसान क्या कहते हैं',
        testimonial1: 'इस ऐप ने मेरी टमाटर की फसल बचाई। AI ने सही बीमारी बताई और इलाज भी।',
        testimonial1Name: 'राजेश कुमार',
        testimonial1Location: 'लखनऊ, उत्तर प्रदेश',
        testimonial2: 'मौसम अलर्ट बहुत काम का है। पहले ही पता चल जाता है कब पानी देना है।',
        testimonial2Name: 'सुनीता देवी',
        testimonial2Location: 'वाराणसी, उत्तर प्रदेश',

        // CTA
        ctaTitle: 'आज ही शुरू करें',
        ctaSubtitle: 'हजारों किसानों के साथ जुड़ें और अपनी फसल की देखभाल करें',
        ctaButton: 'मुफ्त में शुरू करें',

        // Auth
        signIn: 'साइन इन करें',
        signUp: 'नया खाता बनाएं',
        forgotPassword: 'पासवर्ड भूल गए?',
        email: 'ईमेल / फोन नंबर',
        password: 'पासवर्ड',
        name: 'आपका नाम',
        location: 'आपका गाँव / शहर',
        createAccount: 'खाता बनाएं',
        alreadyHave: 'पहले से खाता है?',

        // Footer
        privacy: 'गोपनीयता नीति',
        terms: 'नियम व शर्तें',
        contact: 'संपर्क करें',
        copyright: '© 2026 AgriAI Hub - हैकाथॉन प्रोजेक्ट',
    },
    en: {
        tagline: 'AI Crop Help for Farmers',
        heroTitle: 'Is your crop sick?',
        heroSubtitle: 'Take a photo, AI will diagnose the problem. Get weather advice and connect with fellow farmers.',
        getStarted: 'Get Started',
        learnMore: 'Learn More',

        howItWorks: 'How It Works',
        step1Title: 'Take Photo',
        step1Desc: 'Capture your plant or crop photo',
        step2Title: 'AI Analysis',
        step2Desc: 'Our AI identifies disease in seconds',
        step3Title: 'Get Solution',
        step3Desc: 'Treatment advice and medicine recommendations',

        featuresTitle: 'Our Features',
        feature1Title: 'AI Crop Diagnosis',
        feature1Desc: 'Identify diseases from plant photos with 95% accuracy',
        feature2Title: 'Weather Alerts',
        feature2Desc: 'Real-time local weather and warnings',
        feature3Title: 'Farmer Community',
        feature3Desc: 'Connect with millions of farmers and ask questions',
        feature4Title: 'Marketplace',
        feature4Desc: 'Buy fertilizers, seeds, pesticides at best prices',

        statsTitle: 'Our Achievements',
        stat1Value: '50,000+',
        stat1Label: 'Farmers Joined',
        stat2Value: '1,00,000+',
        stat2Label: 'Scans Done',
        stat3Value: '95%',
        stat3Label: 'Accuracy',
        stat4Value: '24/7',
        stat4Label: 'Support',

        testimonialsTitle: 'What Farmers Say',
        testimonial1: 'This app saved my tomato crop. AI correctly identified the disease and treatment.',
        testimonial1Name: 'Rajesh Kumar',
        testimonial1Location: 'Lucknow, Uttar Pradesh',
        testimonial2: 'Weather alerts are very useful. I know in advance when to water my crops.',
        testimonial2Name: 'Sunita Devi',
        testimonial2Location: 'Varanasi, Uttar Pradesh',

        ctaTitle: 'Get Started Today',
        ctaSubtitle: 'Join thousands of farmers and take care of your crops',
        ctaButton: 'Start Free',

        signIn: 'Sign In',
        signUp: 'Create Account',
        forgotPassword: 'Forgot Password?',
        email: 'Email / Phone Number',
        password: 'Password',
        name: 'Your Name',
        location: 'Your Village / City',
        createAccount: 'Create Account',
        alreadyHave: 'Already have an account?',

        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        contact: 'Contact Us',
        copyright: '© 2026 AgriAI Hub - Hackathon Project',
    }
}

function Landing() {
    const { login } = useAuth()
    const { lang, toggleLang } = useLang()
    const [showAuth, setShowAuth] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        location: ''
    })
    const [error, setError] = useState('')

    const text = t[lang]

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (!formData.email || !formData.password) {
            setError(lang === 'hi' ? 'कृपया सभी फ़ील्ड भरें' : 'Please fill all fields')
            return
        }

        if (isSignUp && (!formData.name || !formData.location)) {
            setError(lang === 'hi' ? 'कृपया सभी फ़ील्ड भरें' : 'Please fill all fields')
            return
        }

        login({
            id: Date.now(),
            name: formData.name || 'किसान',
            email: formData.email,
            location: formData.location || 'लखनऊ, उत्तर प्रदेश'
        })
    }

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="landing">
            {/* Header */}
            <header className="landing-header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <div className="logo-icon">
                                <Leaf size={28} />
                            </div>
                            <span className="logo-text">AgriAI Hub</span>
                        </div>

                        <nav className="nav-links">
                            <button onClick={() => scrollToSection('features')}>{text.featuresTitle}</button>
                            <button onClick={() => scrollToSection('how-it-works')}>{text.howItWorks}</button>
                            <button onClick={() => scrollToSection('testimonials')}>{text.testimonialsTitle}</button>
                        </nav>

                        <div className="header-right">
                            <div className="lang-toggle">
                                <button className={lang === 'hi' ? 'active' : ''} onClick={() => lang !== 'hi' && toggleLang()}>हिंदी</button>
                                <button className={lang === 'en' ? 'active' : ''} onClick={() => lang !== 'en' && toggleLang()}>EN</button>
                            </div>
                            <button className="btn btn-primary btn-sm" onClick={() => setShowAuth(true)}>
                                {text.signIn}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="hero-badge">🌾 {text.tagline}</span>
                        <h1 className="hero-title">{text.heroTitle}</h1>
                        <p className="hero-subtitle">{text.heroSubtitle}</p>

                        <div className="hero-buttons">
                            <button className="btn btn-primary btn-lg" onClick={() => setShowAuth(true)}>
                                {text.getStarted}
                                <ArrowRight size={20} />
                            </button>
                            <button className="btn btn-secondary btn-lg" onClick={() => scrollToSection('how-it-works')}>
                                {text.learnMore}
                            </button>
                        </div>

                        <div className="hero-stats">
                            <div className="hero-stat">
                                <Shield size={20} />
                                <span>50,000+ {lang === 'hi' ? 'किसान' : 'Farmers'}</span>
                            </div>
                            <div className="hero-stat">
                                <Star size={20} />
                                <span>4.8 {lang === 'hi' ? 'रेटिंग' : 'Rating'}</span>
                            </div>
                            <div className="hero-stat">
                                <Zap size={20} />
                                <span>95% {lang === 'hi' ? 'सटीकता' : 'Accuracy'}</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-image-wrapper"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <img src="/farmer-hero.png" alt="Farmer using AI app" className="hero-image" />
                    </motion.div>
                </div>

                <div className="scroll-indicator" onClick={() => scrollToSection('how-it-works')}>
                    <ChevronDown size={28} />
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="section section-light">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>{text.howItWorks}</h2>
                    </motion.div>

                    <div className="steps-grid">
                        {[
                            { icon: <Camera size={32} />, title: text.step1Title, desc: text.step1Desc, num: '01' },
                            { icon: <Zap size={32} />, title: text.step2Title, desc: text.step2Desc, num: '02' },
                            { icon: <Check size={32} />, title: text.step3Title, desc: text.step3Desc, num: '03' },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                className="step-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <span className="step-num">{step.num}</span>
                                <div className="step-icon">{step.icon}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>{text.featuresTitle}</h2>
                    </motion.div>

                    <div className="features-grid">
                        {[
                            { icon: <Camera size={28} />, title: text.feature1Title, desc: text.feature1Desc },
                            { icon: <Cloud size={28} />, title: text.feature2Title, desc: text.feature2Desc },
                            { icon: <Users size={28} />, title: text.feature3Title, desc: text.feature3Desc },
                            { icon: <ShoppingBag size={28} />, title: text.feature4Title, desc: text.feature4Desc },
                        ].map((feat, i) => (
                            <motion.div
                                key={i}
                                className="feature-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="feature-icon">{feat.icon}</div>
                                <h3>{feat.title}</h3>
                                <p>{feat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="section section-light">
                <div className="container">
                    <div className="stats-grid">
                        {[
                            { value: text.stat1Value, label: text.stat1Label },
                            { value: text.stat2Value, label: text.stat2Label },
                            { value: text.stat3Value, label: text.stat3Label },
                            { value: text.stat4Value, label: text.stat4Label },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="stat-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="section section-light">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>{text.testimonialsTitle}</h2>
                    </motion.div>

                    <div className="testimonials-grid">
                        {[
                            { quote: text.testimonial1, name: text.testimonial1Name, loc: text.testimonial1Location },
                            { quote: text.testimonial2, name: text.testimonial2Name, loc: text.testimonial2Location },
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                className="testimonial-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <div className="quote-icon">❝</div>
                                <p className="quote-text">{t.quote}</p>
                                <div className="quote-author">
                                    <div className="author-avatar">👨‍🌾</div>
                                    <div>
                                        <h4>{t.name}</h4>
                                        <p>{t.loc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container">
                    <motion.div
                        className="cta-content"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>{text.ctaTitle}</h2>
                        <p>{text.ctaSubtitle}</p>
                        <button className="btn btn-white btn-lg" onClick={() => setShowAuth(true)}>
                            {text.ctaButton}
                            <ArrowRight size={20} />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="logo">
                                <div className="logo-icon"><Leaf size={24} /></div>
                                <span className="logo-text">AgriAI Hub</span>
                            </div>
                            <p>{text.tagline}</p>
                        </div>
                        <div className="footer-links">
                            <a href="#">{text.privacy}</a>
                            <a href="#">{text.terms}</a>
                            <a href="#">{text.contact}</a>
                        </div>
                    </div>
                    <p className="copyright">{text.copyright}</p>
                </div>
            </footer>

            {/* Auth Modal */}
            {showAuth && (
                <div className="auth-overlay" onClick={() => setShowAuth(false)}>
                    <motion.div
                        className="auth-modal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={() => setShowAuth(false)}>×</button>

                        <div className="auth-header">
                            <h3>{isSignUp ? text.signUp : text.signIn}</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {isSignUp && (
                                <>
                                    <div className="form-group">
                                        <label className="form-label">{text.name}</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder={lang === 'hi' ? 'जैसे: राजेश कुमार' : 'e.g. Rajesh Kumar'}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">{text.location}</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder={lang === 'hi' ? 'जैसे: लखनऊ' : 'e.g. Lucknow'}
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label className="form-label">{text.email}</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder={lang === 'hi' ? 'ईमेल या फोन नंबर' : 'Email or phone number'}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">{text.password}</label>
                                <div className="password-input">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-input"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {error && <p className="error-text">{error}</p>}

                            <button type="submit" className="btn btn-primary btn-block">
                                {isSignUp ? text.createAccount : text.signIn}
                            </button>

                            {!isSignUp && (
                                <button type="button" className="link-btn">
                                    {text.forgotPassword}
                                </button>
                            )}
                        </form>

                        <div className="auth-footer">
                            <p>
                                {isSignUp ? text.alreadyHave : text.signUp}
                                <button
                                    type="button"
                                    className="link-btn highlight"
                                    onClick={() => setIsSignUp(!isSignUp)}
                                >
                                    {isSignUp ? text.signIn : text.signUp}
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default Landing
