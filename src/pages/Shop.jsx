import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ArrowLeft, Search, Filter, ShoppingCart, Heart, Star,
    Package, Truck, Shield, Plus, Minus, X
} from 'lucide-react'
import { useLang } from '../App'
import './Shop.css'

const t = {
    hi: {
        title: 'किसान बाज़ार',
        searchPlaceholder: 'उत्पाद खोजें...',
        categories: 'श्रेणियाँ',
        all: 'सभी',
        fertilizers: 'खाद',
        pesticides: 'कीटनाशक',
        seeds: 'बीज',
        tools: 'उपकरण',
        irrigation: 'सिंचाई',
        filters: 'फ़िल्टर',
        priceRange: 'मूल्य सीमा',
        brand: 'ब्रांड',
        rating: 'रेटिंग',
        inStock: 'स्टॉक में',
        sortBy: 'क्रमबद्ध करें',
        priceLow: 'मूल्य: कम से अधिक',
        priceHigh: 'मूल्य: अधिक से कम',
        popular: 'लोकप्रिय',
        addToCart: 'कार्ट में डालें',
        buyNow: 'अभी खरीदें',
        cart: 'कार्ट',
        total: 'कुल',
        checkout: 'चेकआउट',
        freeDelivery: 'मुफ़्त डिलीवरी',
        genuine: '100% असली',
        fastDelivery: 'तेज़ डिलीवरी',
        back: 'वापस',
    },
    en: {
        title: 'Farmer Marketplace',
        searchPlaceholder: 'Search products...',
        categories: 'Categories',
        all: 'All',
        fertilizers: 'Fertilizers',
        pesticides: 'Pesticides',
        seeds: 'Seeds',
        tools: 'Tools',
        irrigation: 'Irrigation',
        filters: 'Filters',
        priceRange: 'Price Range',
        brand: 'Brand',
        rating: 'Rating',
        inStock: 'In Stock',
        sortBy: 'Sort By',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
        popular: 'Popular',
        addToCart: 'Add to Cart',
        buyNow: 'Buy Now',
        cart: 'Cart',
        total: 'Total',
        checkout: 'Checkout',
        freeDelivery: 'Free Delivery',
        genuine: '100% Genuine',
        fastDelivery: 'Fast Delivery',
        back: 'Back',
    }
}

// Mock products
const products = [
    { id: 1, name: 'NPK 20-20-20 खाद', nameEn: 'NPK 20-20-20 Fertilizer', category: 'fertilizers', price: 450, originalPrice: 550, rating: 4.5, reviews: 234, image: '🧪', brand: 'IFFCO' },
    { id: 2, name: 'यूरिया खाद', nameEn: 'Urea Fertilizer', category: 'fertilizers', price: 380, originalPrice: 420, rating: 4.2, reviews: 189, image: '🧪', brand: 'NFL' },
    { id: 3, name: 'नीम ऑयल स्प्रे', nameEn: 'Neem Oil Spray', category: 'pesticides', price: 199, originalPrice: 250, rating: 4.6, reviews: 312, image: '🌿', brand: 'Organic' },
    { id: 4, name: 'कॉपर फंगीसाइड', nameEn: 'Copper Fungicide', category: 'pesticides', price: 299, originalPrice: 350, rating: 4.4, reviews: 156, image: '🛡️', brand: 'Bayer' },
    { id: 5, name: 'टमाटर बीज (हाइब्रिड)', nameEn: 'Tomato Seeds (Hybrid)', category: 'seeds', price: 120, originalPrice: 150, rating: 4.7, reviews: 445, image: '🌱', brand: 'Seminis' },
    { id: 6, name: 'गेहूं बीज HD-2967', nameEn: 'Wheat Seeds HD-2967', category: 'seeds', price: 85, originalPrice: 100, rating: 4.5, reviews: 678, image: '🌾', brand: 'ICAR' },
    { id: 7, name: 'हैंड स्प्रेयर (16L)', nameEn: 'Hand Sprayer (16L)', category: 'tools', price: 850, originalPrice: 999, rating: 4.3, reviews: 234, image: '💧', brand: 'Padgilwar' },
    { id: 8, name: 'खुरपी स्टील', nameEn: 'Steel Khurpi/Trowel', category: 'tools', price: 150, originalPrice: 180, rating: 4.8, reviews: 567, image: '🔧', brand: 'Falcon' },
    { id: 9, name: 'ड्रिप किट (1/4 एकड़)', nameEn: 'Drip Kit (1/4 Acre)', category: 'irrigation', price: 2500, originalPrice: 3000, rating: 4.6, reviews: 123, image: '💧', brand: 'Jain' },
    { id: 10, name: 'स्प्रिंकलर सेट', nameEn: 'Sprinkler Set', category: 'irrigation', price: 1200, originalPrice: 1500, rating: 4.4, reviews: 89, image: '🌧️', brand: 'Netafim' },
]

const categories = [
    { id: 'all', icon: '📦' },
    { id: 'fertilizers', icon: '🧪' },
    { id: 'pesticides', icon: '🛡️' },
    { id: 'seeds', icon: '🌱' },
    { id: 'tools', icon: '🔧' },
    { id: 'irrigation', icon: '💧' },
]

function Shop() {
    const { lang } = useLang()
    const text = t[lang]

    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [cart, setCart] = useState([])
    const [showCart, setShowCart] = useState(false)

    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
        const matchesSearch = (lang === 'hi' ? p.name : p.nameEn)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id)
        if (existing) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            ))
        } else {
            setCart([...cart, { ...product, qty: 1 }])
        }
    }

    const updateQty = (id, delta) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQty = item.qty + delta
                return newQty > 0 ? { ...item, qty: newQty } : null
            }
            return item
        }).filter(Boolean))
    }

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

    return (
        <div className="shop-page">
            {/* Header */}
            <header className="shop-header">
                <div className="header-left">
                    <Link to="/dashboard" className="back-btn">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1>{text.title}</h1>
                </div>

                <div className="search-bar">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder={text.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <button className="cart-btn" onClick={() => setShowCart(true)}>
                    <ShoppingCart size={24} />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>
            </header>

            {/* Trust Bar */}
            <div className="trust-bar">
                <div className="trust-item">
                    <Truck size={18} />
                    <span>{text.freeDelivery}</span>
                </div>
                <div className="trust-item">
                    <Shield size={18} />
                    <span>{text.genuine}</span>
                </div>
                <div className="trust-item">
                    <Package size={18} />
                    <span>{text.fastDelivery}</span>
                </div>
            </div>

            {/* Categories */}
            <div className="categories-bar">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                    >
                        <span className="cat-icon">{cat.icon}</span>
                        <span className="cat-label">{text[cat.id] || text.all}</span>
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <main className="shop-main">
                <div className="products-grid">
                    {filteredProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            className="product-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
                            <div className="product-image">
                                <span className="product-emoji">{product.image}</span>
                                <button className="wishlist-btn">
                                    <Heart size={18} />
                                </button>
                                {product.originalPrice > product.price && (
                                    <span className="discount-badge">
                                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                    </span>
                                )}
                            </div>

                            <div className="product-info">
                                <h3 className="product-name">
                                    {lang === 'hi' ? product.name : product.nameEn}
                                </h3>
                                <p className="product-brand">{product.brand}</p>

                                <div className="product-rating">
                                    <Star size={14} fill="#FBC02D" color="#FBC02D" />
                                    <span>{product.rating}</span>
                                    <span className="reviews">({product.reviews})</span>
                                </div>

                                <div className="product-price">
                                    <span className="current-price">₹{product.price}</span>
                                    {product.originalPrice > product.price && (
                                        <span className="original-price">₹{product.originalPrice}</span>
                                    )}
                                </div>

                                <button
                                    className="btn btn-primary add-cart-btn"
                                    onClick={() => addToCart(product)}
                                >
                                    <ShoppingCart size={16} />
                                    {text.addToCart}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Cart Sidebar */}
            {showCart && (
                <>
                    <div className="cart-overlay" onClick={() => setShowCart(false)} />
                    <motion.div
                        className="cart-sidebar"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                    >
                        <div className="cart-header">
                            <h2>🛒 {text.cart} ({cartCount})</h2>
                            <button onClick={() => setShowCart(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <p className="empty-cart">कार्ट खाली है / Cart is empty</p>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <span className="item-emoji">{item.image}</span>
                                        <div className="item-info">
                                            <h4>{lang === 'hi' ? item.name : item.nameEn}</h4>
                                            <span className="item-price">₹{item.price}</span>
                                        </div>
                                        <div className="qty-controls">
                                            <button onClick={() => updateQty(item.id, -1)}>
                                                <Minus size={16} />
                                            </button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, 1)}>
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-total">
                                    <span>{text.total}:</span>
                                    <span className="total-amount">₹{cartTotal}</span>
                                </div>
                                <button className="btn btn-primary checkout-btn">
                                    {text.checkout}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </div>
    )
}

export default Shop
