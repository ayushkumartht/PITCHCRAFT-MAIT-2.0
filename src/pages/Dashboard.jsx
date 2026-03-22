import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Home, Camera, Leaf, BookOpen, MessageCircle, Cloud,
    Settings, HelpCircle, Menu, X, LogOut, Bell, Search,
    TrendingUp, AlertTriangle, ChevronRight, Upload, Mic,
    ShoppingBag
} from 'lucide-react'
import { useAuth, useLang } from '../App'
import './Dashboard.css'

// Translations
const t = {
    hi: {
        welcome: 'नमस्ते',
        ji: 'जी!',
        searchPlaceholder: 'फसल या बीमारी खोजें...',

        // Sidebar
        dashboard: 'डैशबोर्ड',
        aiScan: 'AI डायग्नोसिस',
        myFarm: 'मेरी फसल',
        knowledge: 'ज्ञान भंडार',
        community: 'समुदाय प्रश्नोत्तर',
        weather: 'मौसम अलर्ट',
        shop: 'बाज़ार',
        settings: 'सेटिंग्स',
        help: 'सहायता',
        logout: 'लॉग आउट',

        // AI Scan Card
        scanTitle: 'पौधा स्कैन करें',
        scanSubtitle: 'पौधे की फोटो से बीमारी पहचानें, AI तुरंत बताएगा',
        uploadBtn: 'फोटो अपलोड करें',
        cameraBtn: 'कैमरा खोलें',
        voiceBtn: 'बोलकर पूछें',
        offlineNote: '✓ इंटरनेट न हो तो भी काम करता है',

        // Weather
        weatherTitle: 'आज का मौसम',
        weatherLocation: 'लखनऊ, उत्तर प्रदेश',
        weatherAlert: '⚠️ कल बारिश संभावित - स्प्रे टालें',

        // Stats
        cropsTracked: 'ट्रैक्ड फसलें',
        totalScans: 'कुल स्कैन',
        healthyPercent: 'स्वस्थ',
        farmHealth: 'फार्म स्वास्थ्य',

        // Recent Scans
        recentScans: 'हाल के स्कैन',
        viewAll: 'सभी देखें',

        // Tips
        tipsTitle: 'आज के सुझाव',
        tip1: '🌾 गेहूं में रस्ट का खतरा - सावधान रहें',
        tip2: '🌿 नीम का छिड़काव करें - एफिड से बचाव',
        tip3: '💧 सिंचाई सुबह जल्दी करें',

        // Community
        communityTitle: 'समुदाय से',
        askQuestion: 'प्रश्न पूछें',

        // Quick Actions
        quickActions: 'त्वरित कार्य',
        browseShop: 'बाज़ार देखें',
        viewOrders: 'ऑर्डर देखें',
    },
    en: {
        welcome: 'Hello',
        ji: '!',
        searchPlaceholder: 'Search crops or diseases...',

        dashboard: 'Dashboard',
        aiScan: 'AI Diagnosis',
        myFarm: 'My Farm',
        knowledge: 'Knowledge Base',
        community: 'Community Q&A',
        weather: 'Weather Alerts',
        shop: 'Marketplace',
        settings: 'Settings',
        help: 'Help',
        logout: 'Log Out',

        scanTitle: 'Scan Your Plant',
        scanSubtitle: 'Identify diseases from plant photos, AI will diagnose instantly',
        uploadBtn: 'Upload Photo',
        cameraBtn: 'Open Camera',
        voiceBtn: 'Ask by Voice',
        offlineNote: '✓ Works even without internet',

        weatherTitle: "Today's Weather",
        weatherLocation: 'Lucknow, Uttar Pradesh',
        weatherAlert: '⚠️ Rain expected tomorrow - delay spraying',

        cropsTracked: 'Crops Tracked',
        totalScans: 'Total Scans',
        healthyPercent: 'Healthy',
        farmHealth: 'Farm Health',

        recentScans: 'Recent Scans',
        viewAll: 'View All',

        tipsTitle: "Today's Tips",
        tip1: '🌾 Wheat rust risk - stay alert',
        tip2: '🌿 Apply neem spray - aphid prevention',
        tip3: '💧 Irrigate early morning',

        communityTitle: 'From Community',
        askQuestion: 'Ask Question',

        quickActions: 'Quick Actions',
        browseShop: 'Browse Shop',
        viewOrders: 'View Orders',
    }
}

// Mock data
const recentScans = [
    { id: 1, crop: 'टमाटर', disease: 'लेट ब्लाइट', confidence: 92, status: 'disease', date: 'आज' },
    { id: 2, crop: 'गेहूं', disease: 'स्वस्थ', confidence: 98, status: 'healthy', date: 'कल' },
    { id: 3, crop: 'आलू', disease: 'अर्ली ब्लाइट', confidence: 85, status: 'disease', date: '2 दिन पहले' },
]

const communityQuestions = [
    { id: 1, q: 'मक्का में आर्मीवर्म कैसे रोकें?', replies: 12 },
    { id: 2, q: 'टमाटर की पत्तियां पीली हो रही हैं', replies: 8 },
]

function Dashboard() {
    const { user, logout } = useAuth()
    const { lang, toggleLang } = useLang()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const text = t[lang]

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const sidebarItems = [
        { icon: Home, label: text.dashboard, path: '/dashboard', active: true },
        { icon: Camera, label: text.aiScan, path: '/scan' },
        { icon: Leaf, label: text.myFarm, path: '/farm' },
        { icon: BookOpen, label: text.knowledge, path: '/knowledge' },
        { icon: MessageCircle, label: text.community, path: '/community' },
        { icon: Cloud, label: text.weather, path: '/weather' },
        { icon: ShoppingBag, label: text.shop, path: '/shop' },
        { icon: Settings, label: text.settings, path: '/settings' },
        { icon: HelpCircle, label: text.help, path: '/help' },
    ]

    return (
        <div className="dashboard-layout">
            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo-mini">
                        <Leaf size={24} />
                    </div>
                    <span className="logo-text-mini">AgriAI Hub</span>
                    <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${item.active ? 'active' : ''}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon size={22} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="nav-item logout" onClick={handleLogout}>
                        <LogOut size={22} />
                        <span>{text.logout}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Top Header */}
                <header className="dashboard-header">
                    <div className="header-left">
                        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <h1 className="greeting">
                            {text.welcome} {user?.name?.split(' ')[0]}{text.ji}
                        </h1>
                    </div>

                    <div className="header-center">
                        <div className="search-bar">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder={text.searchPlaceholder}
                            />
                            <button className="voice-search">
                                <Mic size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="lang-toggle">
                            <button
                                className={lang === 'hi' ? 'active' : ''}
                                onClick={() => lang !== 'hi' && toggleLang()}
                            >
                                हिंदी
                            </button>
                            <button
                                className={lang === 'en' ? 'active' : ''}
                                onClick={() => lang !== 'en' && toggleLang()}
                            >
                                EN
                            </button>
                        </div>
                        <button className="notification-btn">
                            <Bell size={22} />
                            <span className="notification-dot"></span>
                        </button>
                        <div className="user-avatar">
                            {user?.name?.charAt(0) || '👤'}
                        </div>
                    </div>
                </header>

                {/* Alert Banner */}
                <div className="alert-banner">
                    <AlertTriangle size={20} />
                    <span>{text.weatherAlert}</span>
                    <ChevronRight size={18} />
                </div>

                {/* Dashboard Content */}
                <div className="dashboard-content">
                    {/* AI Scan Hero Card */}
                    <motion.div
                        className="card scan-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="scan-card-content">
                            <div className="scan-icon">
                                <Camera size={48} />
                            </div>
                            <div className="scan-text">
                                <h2>{text.scanTitle}</h2>
                                <p>{text.scanSubtitle}</p>
                                <span className="offline-badge">{text.offlineNote}</span>
                            </div>
                        </div>
                        <div className="scan-actions">
                            <Link to="/scan" className="btn btn-primary">
                                <Upload size={20} />
                                {text.uploadBtn}
                            </Link>
                            <button className="btn btn-secondary">
                                <Camera size={20} />
                                {text.cameraBtn}
                            </button>
                            <button className="btn btn-accent voice-btn">
                                <Mic size={20} />
                                {text.voiceBtn}
                            </button>
                        </div>
                    </motion.div>

                    {/* Two Column Grid */}
                    <div className="dashboard-grid">
                        {/* Left Column */}
                        <div className="grid-column">
                            {/* Weather Card */}
                            <motion.div
                                className="card weather-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <div className="card-header">
                                    <h3><Cloud size={20} /> {text.weatherTitle}</h3>
                                    <span className="location">{text.weatherLocation}</span>
                                </div>
                                <div className="weather-display">
                                    <div className="temp">
                                        <span className="temp-value">28°C</span>
                                        <span className="weather-icon">☀️</span>
                                    </div>
                                    <div className="weather-details">
                                        <span>💧 65% आर्द्रता</span>
                                        <span>💨 12 km/h हवा</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Stats Card */}
                            <motion.div
                                className="card stats-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                <div className="stats-grid">
                                    <div className="stat-item">
                                        <span className="stat-icon">🌱</span>
                                        <span className="stat-number">3</span>
                                        <span className="stat-label">{text.cropsTracked}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-icon">📸</span>
                                        <span className="stat-number">12</span>
                                        <span className="stat-label">{text.totalScans}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-icon">✅</span>
                                        <span className="stat-number">85%</span>
                                        <span className="stat-label">{text.healthyPercent}</span>
                                    </div>
                                </div>
                                <div className="health-progress">
                                    <span>{text.farmHealth}</span>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Tips Card */}
                            <motion.div
                                className="card tips-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            >
                                <h3>💡 {text.tipsTitle}</h3>
                                <ul className="tips-list">
                                    <li>{text.tip1}</li>
                                    <li>{text.tip2}</li>
                                    <li>{text.tip3}</li>
                                </ul>
                            </motion.div>
                        </div>

                        {/* Right Column */}
                        <div className="grid-column">
                            {/* Recent Scans */}
                            <motion.div
                                className="card scans-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.15 }}
                            >
                                <div className="card-header">
                                    <h3>🕐 {text.recentScans}</h3>
                                    <button className="view-all-btn">{text.viewAll} →</button>
                                </div>
                                <div className="scans-list">
                                    {recentScans.map((scan) => (
                                        <div key={scan.id} className={`scan-item ${scan.status}`}>
                                            <div className="scan-thumb">🌱</div>
                                            <div className="scan-info">
                                                <span className="scan-crop">{scan.crop}</span>
                                                <span className="scan-disease">{scan.disease} - {scan.confidence}%</span>
                                            </div>
                                            <span className="scan-date">{scan.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Community Card */}
                            <motion.div
                                className="card community-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.25 }}
                            >
                                <div className="card-header">
                                    <h3>💬 {text.communityTitle}</h3>
                                    <button className="btn btn-secondary btn-sm">{text.askQuestion}</button>
                                </div>
                                <div className="questions-list">
                                    {communityQuestions.map((q) => (
                                        <div key={q.id} className="question-item">
                                            <span className="question-text">{q.q}</span>
                                            <span className="replies-count">💬 {q.replies}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Quick Actions */}
                            <motion.div
                                className="card actions-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.35 }}
                            >
                                <h3>⚡ {text.quickActions}</h3>
                                <div className="quick-actions">
                                    <Link to="/shop" className="action-btn">
                                        <ShoppingBag size={24} />
                                        <span>{text.browseShop}</span>
                                    </Link>
                                    <button className="action-btn">
                                        <TrendingUp size={24} />
                                        <span>{text.viewOrders}</span>
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating Action Button */}
            <Link to="/scan" className="fab">
                <Camera size={28} />
            </Link>
        </div>
    )
}

export default Dashboard
