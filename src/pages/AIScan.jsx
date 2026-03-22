import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ArrowLeft, Upload, Camera, Mic, Loader2, CheckCircle,
    AlertTriangle, BookOpen, ShoppingBag
} from 'lucide-react'
import { useAuth, useLang } from '../App'
import './AIScan.css'

const t = {
    hi: {
        title: 'AI फसल डायग्नोसिस',
        subtitle: 'पौधे की फोटो अपलोड करें, AI बताएगा बीमारी',
        uploadTitle: 'फोटो अपलोड करें',
        uploadHint: 'खींचें और छोड़ें या क्लिक करें',
        cameraBtn: 'कैमरा से खींचें',
        voiceBtn: 'बोलकर बताएं',
        analyzing: 'जाँच हो रही है...',
        resultTitle: 'डायग्नोसिस परिणाम',
        disease: 'पहचानी गई बीमारी',
        confidence: 'विश्वसनीयता',
        treatment: 'उपचार',
        prevention: 'रोकथाम',
        buyProducts: 'संबंधित उत्पाद खरीदें',
        learnMore: 'और जानें',
        scanAgain: 'फिर से स्कैन करें',
        back: 'वापस जाएं',
    },
    en: {
        title: 'AI Crop Diagnosis',
        subtitle: 'Upload a plant photo, AI will identify the disease',
        uploadTitle: 'Upload Photo',
        uploadHint: 'Drag & drop or click to browse',
        cameraBtn: 'Take Photo',
        voiceBtn: 'Describe by Voice',
        analyzing: 'Analyzing...',
        resultTitle: 'Diagnosis Results',
        disease: 'Identified Disease',
        confidence: 'Confidence',
        treatment: 'Treatment',
        prevention: 'Prevention',
        buyProducts: 'Buy Related Products',
        learnMore: 'Learn More',
        scanAgain: 'Scan Again',
        back: 'Go Back',
    }
}

// Mock AI result
const mockResult = {
    disease: 'टमाटर लेट ब्लाइट (Tomato Late Blight)',
    confidence: 92,
    severity: 'medium',
    treatment: [
        'प्रभावित पत्तियों को हटा दें',
        'कॉपर-आधारित फंगीसाइड का छिड़काव करें',
        'पौधों के बीच हवा का संचार सुनिश्चित करें',
    ],
    prevention: [
        'अधिक पानी देने से बचें',
        'पत्तियों को गीला न करें',
        'रोग-प्रतिरोधी किस्में लगाएं',
    ],
    products: [
        { name: 'कॉपर फंगीसाइड', price: 299 },
        { name: 'नीम ऑयल स्प्रे', price: 199 },
    ]
}

function AIScan() {
    const { lang } = useLang()
    const text = t[lang]

    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
            analyzeImage()
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
            analyzeImage()
        }
    }

    const analyzeImage = () => {
        setLoading(true)
        setResult(null)
        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            setResult(mockResult)
        }, 2500)
    }

    const resetScan = () => {
        setImage(null)
        setPreview(null)
        setResult(null)
    }

    return (
        <div className="scan-page">
            <header className="scan-header">
                <Link to="/dashboard" className="back-btn">
                    <ArrowLeft size={24} />
                    <span>{text.back}</span>
                </Link>
                <h1>{text.title}</h1>
            </header>

            <main className="scan-main">
                {!result ? (
                    <motion.div
                        className="scan-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="scan-subtitle">{text.subtitle}</p>

                        {/* Upload Zone */}
                        <div
                            className={`upload-zone ${preview ? 'has-preview' : ''}`}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {loading ? (
                                <div className="loading-state">
                                    <Loader2 size={48} className="spinner" />
                                    <p>{text.analyzing}</p>
                                </div>
                            ) : preview ? (
                                <img src={preview} alt="Preview" className="preview-image" />
                            ) : (
                                <label className="upload-label">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        hidden
                                    />
                                    <Upload size={48} />
                                    <h3>{text.uploadTitle}</h3>
                                    <p>{text.uploadHint}</p>
                                </label>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="scan-buttons">
                            <label className="btn btn-primary">
                                <input
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    onChange={handleImageChange}
                                    hidden
                                />
                                <Camera size={20} />
                                {text.cameraBtn}
                            </label>
                            <button className="btn btn-accent">
                                <Mic size={20} />
                                {text.voiceBtn}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        className="result-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2>{text.resultTitle}</h2>

                        <div className="result-grid">
                            {/* Image Preview */}
                            <div className="result-image">
                                <img src={preview} alt="Scanned plant" />
                            </div>

                            {/* Diagnosis Info */}
                            <div className="result-info">
                                <div className="disease-header">
                                    <AlertTriangle size={24} className="warning-icon" />
                                    <div>
                                        <h3>{text.disease}</h3>
                                        <p className="disease-name">{result.disease}</p>
                                    </div>
                                </div>

                                <div className="confidence-bar">
                                    <span>{text.confidence}: {result.confidence}%</span>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${result.confidence}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="info-section">
                                    <h4>💊 {text.treatment}</h4>
                                    <ul>
                                        {result.treatment.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="info-section">
                                    <h4>🛡️ {text.prevention}</h4>
                                    <ul>
                                        {result.prevention.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Recommended Products */}
                                <div className="products-section">
                                    <h4>🛒 {text.buyProducts}</h4>
                                    <div className="product-cards">
                                        {result.products.map((p, i) => (
                                            <Link to="/shop" key={i} className="product-mini">
                                                <span>{p.name}</span>
                                                <span className="price">₹{p.price}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="result-actions">
                            <button className="btn btn-primary" onClick={resetScan}>
                                <Camera size={20} />
                                {text.scanAgain}
                            </button>
                            <Link to="/shop" className="btn btn-secondary">
                                <ShoppingBag size={20} />
                                {text.buyProducts}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    )
}

export default AIScan
