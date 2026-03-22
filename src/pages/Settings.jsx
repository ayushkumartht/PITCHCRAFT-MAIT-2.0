import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ArrowLeft, User, Bell, Lock, Globe, Palette,
    Moon, Sun, LogOut, ChevronRight, Save
} from 'lucide-react'
import { useAuth, useLang } from '../App'
import './Settings.css'

const t = {
    hi: {
        title: 'सेटिंग्स',
        back: 'वापस',
        profile: 'प्रोफ़ाइल',
        name: 'नाम',
        email: 'ईमेल',
        phone: 'फोन नंबर',
        location: 'स्थान',
        save: 'सहेजें',
        preferences: 'प्राथमिकताएं',
        language: 'भाषा',
        theme: 'थीम',
        lightMode: 'लाइट मोड',
        darkMode: 'डार्क मोड',
        notifications: 'सूचनाएं',
        emailNotif: 'ईमेल सूचनाएं',
        smsNotif: 'SMS सूचनाएं',
        weatherAlerts: 'मौसम अलर्ट',
        security: 'सुरक्षा',
        changePassword: 'पासवर्ड बदलें',
        logout: 'लॉग आउट',
        saved: 'सहेजा गया!',
    },
    en: {
        title: 'Settings',
        back: 'Back',
        profile: 'Profile',
        name: 'Name',
        email: 'Email',
        phone: 'Phone Number',
        location: 'Location',
        save: 'Save',
        preferences: 'Preferences',
        language: 'Language',
        theme: 'Theme',
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
        notifications: 'Notifications',
        emailNotif: 'Email Notifications',
        smsNotif: 'SMS Notifications',
        weatherAlerts: 'Weather Alerts',
        security: 'Security',
        changePassword: 'Change Password',
        logout: 'Log Out',
        saved: 'Saved!',
    }
}

function Settings() {
    const { user, logout } = useAuth()
    const { lang, toggleLang } = useLang()
    const navigate = useNavigate()
    const text = t[lang]

    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        location: user?.location || '',
    })

    const [notifications, setNotifications] = useState({
        email: true,
        sms: true,
        weather: true,
    })

    const [darkMode, setDarkMode] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="settings-page">
            <header className="settings-header">
                <Link to="/dashboard" className="back-btn">
                    <ArrowLeft size={24} />
                    <span>{text.back}</span>
                </Link>
                <h1>{text.title}</h1>
            </header>

            <main className="settings-main">
                {/* Profile Section */}
                <motion.section
                    className="settings-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="section-header">
                        <User size={22} />
                        <h2>{text.profile}</h2>
                    </div>

                    <div className="profile-form">
                        <div className="form-group">
                            <label className="form-label">{text.name}</label>
                            <input
                                type="text"
                                className="form-input"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">{text.email}</label>
                            <input
                                type="email"
                                className="form-input"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">{text.phone}</label>
                            <input
                                type="tel"
                                className="form-input"
                                placeholder="+91 99999 99999"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">{text.location}</label>
                            <input
                                type="text"
                                className="form-input"
                                value={profile.location}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            />
                        </div>

                        <button className="btn btn-primary" onClick={handleSave}>
                            <Save size={18} />
                            {saved ? text.saved : text.save}
                        </button>
                    </div>
                </motion.section>

                {/* Preferences Section */}
                <motion.section
                    className="settings-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="section-header">
                        <Palette size={22} />
                        <h2>{text.preferences}</h2>
                    </div>

                    <div className="settings-list">
                        {/* Language */}
                        <div className="setting-item">
                            <div className="setting-info">
                                <Globe size={20} />
                                <span>{text.language}</span>
                            </div>
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
                        </div>

                        {/* Theme */}
                        <div className="setting-item">
                            <div className="setting-info">
                                {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                                <span>{text.theme}</span>
                            </div>
                            <button
                                className={`theme-toggle ${darkMode ? 'dark' : ''}`}
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                <span className="toggle-thumb"></span>
                            </button>
                        </div>
                    </div>
                </motion.section>

                {/* Notifications Section */}
                <motion.section
                    className="settings-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="section-header">
                        <Bell size={22} />
                        <h2>{text.notifications}</h2>
                    </div>

                    <div className="settings-list">
                        <div className="setting-item">
                            <span>{text.emailNotif}</span>
                            <button
                                className={`theme-toggle ${notifications.email ? 'active' : ''}`}
                                onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                            >
                                <span className="toggle-thumb"></span>
                            </button>
                        </div>

                        <div className="setting-item">
                            <span>{text.smsNotif}</span>
                            <button
                                className={`theme-toggle ${notifications.sms ? 'active' : ''}`}
                                onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                            >
                                <span className="toggle-thumb"></span>
                            </button>
                        </div>

                        <div className="setting-item">
                            <span>{text.weatherAlerts}</span>
                            <button
                                className={`theme-toggle ${notifications.weather ? 'active' : ''}`}
                                onClick={() => setNotifications({ ...notifications, weather: !notifications.weather })}
                            >
                                <span className="toggle-thumb"></span>
                            </button>
                        </div>
                    </div>
                </motion.section>

                {/* Security Section */}
                <motion.section
                    className="settings-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="section-header">
                        <Lock size={22} />
                        <h2>{text.security}</h2>
                    </div>

                    <div className="settings-list">
                        <button className="setting-item clickable">
                            <span>{text.changePassword}</span>
                            <ChevronRight size={20} />
                        </button>

                        <button className="setting-item clickable danger" onClick={handleLogout}>
                            <div className="setting-info">
                                <LogOut size={20} />
                                <span>{text.logout}</span>
                            </div>
                        </button>
                    </div>
                </motion.section>
            </main>
        </div>
    )
}

export default Settings
