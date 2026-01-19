import React, { useState } from 'react';
import { ShoppingCart, Clock, Tag, Heart, Package, TrendingUp, X, Sparkles, Plus, Minus } from 'lucide-react';

const CocaColaEb2bMVP = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([1, 3]);
  const [promoModal, setPromoModal] = useState(null);
  const [showCart, setShowCart] = useState(false);

  // Define promotions first
  const promotions = [
    { 
      id: 1, 
      title: '10% OFF on Coca-Cola Original', 
      desc: 'Valid until Nov 10', 
      color: 'bg-red-500',
      productIds: [1],
      type: '10% OFF',
      discount: 0.10
    },
    { 
      id: 2, 
      title: 'Buy 2 Get 1 Free on Sprite', 
      desc: 'On 1.5L products', 
      color: 'bg-blue-500',
      productIds: [3],
      type: 'Buy 2 Get 1 FREE',
      freeCase: true,
      minCases: 2
    },
    { 
      id: 3, 
      title: '15% OFF Coke 8oz Cases', 
      desc: 'Limited time offer', 
      color: 'bg-green-500',
      productIds: [5],
      type: '15% OFF',
      discount: 0.15
    }
  ];

  const products = [
    { id: 1, name: 'Coca-Cola Original', size: '1.5L', pricePerCase: 1080, piecesPerCase: 24, image: '🥤', stock: 500 },
    { id: 2, name: 'Coca-Cola Zero', size: '1.5L', pricePerCase: 1080, piecesPerCase: 24, image: '🥤', stock: 350 },
    { id: 3, name: 'Sprite', size: '1.5L', pricePerCase: 1008, piecesPerCase: 24, image: '🥤', stock: 420 },
    { id: 4, name: 'Royal', size: '1.5L', pricePerCase: 960, piecesPerCase: 24, image: '🥤', stock: 380 },
    { id: 5, name: 'Coca-Cola Original', size: '8oz', pricePerCase: 180, piecesPerCase: 24, image: '📦', stock: 200 },
    { id: 6, name: 'Minute Maid Orange', size: '1L', pricePerCase: 1320, piecesPerCase: 24, image: '🧃', stock: 150 }
  ];

  // Add promo info to products
  const productsWithPromos = products.map(product => {
    const promo = promotions.find(p => p.productIds.includes(product.id));
    return promo ? { ...product, promo } : product;
  });

  const recentOrders = [
    { id: 1, items: [{ name: 'Coca-Cola Original 1.5L', cases: 2 }, { name: 'Sprite 1.5L', cases: 1 }], total: 3168, date: 'Oct 28' },
    { id: 2, items: [{ name: 'Coca-Cola Zero 1.5L', cases: 1 }, { name: 'Royal 1.5L', cases: 1 }], total: 2040, date: 'Oct 21' },
    { id: 3, items: [{ name: 'Coca-Cola Original 8oz', cases: 3 }], total: 540, date: 'Oct 15' }
  ];

  const addToCart = (product, cases = 1) => {
    // Check if product has promo and show modal
    if (product.promo) {
      setPromoModal({
        product,
        cases,
        promo: product.promo
      });
    } else {
      addToCartDirect(product, cases);
    }
  };

  const addToCartDirect = (product, cases) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, cases: item.cases + cases } : item
      ));
    } else {
      setCart([...cart, { ...product, cases }]);
    }
  };

  const confirmAddToCart = () => {
    if (promoModal) {
      addToCartDirect(promoModal.product, promoModal.cases);
      setPromoModal(null);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, newCases) => {
    if (newCases <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, cases: newCases } : item
      ));
    }
  };

  const reorderPastFavorite = (order) => {
    order.items.forEach(item => {
      const product = productsWithPromos.find(p => p.name === item.name);
      if (product) {
        const existing = cart.find(c => c.id === product.id);
        if (existing) {
          setCart(cart.map(c => 
            c.id === product.id ? { ...c, cases: c.cases + item.cases } : c
          ));
        } else {
          setCart([...cart, { ...product, cases: item.cases }]);
        }
      }
    });
  };

  const totalCases = cart.reduce((sum, item) => sum + item.cases, 0);
  
  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      let price = item.pricePerCase * item.cases;
      if (item.promo && item.promo.discount) {
        price = price * (1 - item.promo.discount);
      }
      return sum + price;
    }, 0);
  };

  const calculateItemPrice = (item) => {
    let price = item.pricePerCase * item.cases;
    if (item.promo && item.promo.discount) {
      price = price * (1 - item.promo.discount);
    }
    return price;
  };

  const goToPromoProducts = (promoProductIds) => {
    setActiveTab('catalog');
    // Scroll to first product with this promo (in a real app)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" alt="Coca-Cola" className="h-8" onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span class="text-red-600 font-bold text-xl">Coca-Cola</span>';
              }} />
            </div>
            <div>
              <div className="text-xs opacity-90">EUROPACIFIC ABOITIZ</div>
              <div className="font-bold text-lg">eB2B Platform</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs opacity-90">Sari-Sari Store #123</div>
              <div className="font-semibold">Juan Dela Cruz</div>
            </div>
            <div className="relative">
              <button onClick={() => setShowCart(!showCart)} className="relative hover:opacity-80 transition">
                <ShoppingCart className="w-6 h-6" />
                {totalCases > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalCases}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto flex">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 transition ${
              activeTab === 'catalog' ? 'text-red-600 border-b-4 border-red-600' : 'text-gray-500 hover:text-red-600'
            }`}
          >
            <Package className="w-5 h-5" />
            Product Catalog
          </button>
          <button
            onClick={() => setActiveTab('reorder')}
            className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 transition ${
              activeTab === 'reorder' ? 'text-red-600 border-b-4 border-red-600' : 'text-gray-500 hover:text-red-600'
            }`}
          >
            <Clock className="w-5 h-5" />
            Quick Reorder
          </button>
          <button
            onClick={() => setActiveTab('promos')}
            className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 transition ${
              activeTab === 'promos' ? 'text-red-600 border-b-4 border-red-600' : 'text-gray-500 hover:text-red-600'
            }`}
          >
            <Tag className="w-5 h-5" />
            Promotions
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Visual Product Catalog */}
        {activeTab === 'catalog' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Product Catalog</h2>
              <div className="text-sm text-gray-600">All products sold by case (24 pcs)</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsWithPromos.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
                  {product.promo && (
                    <div className="bg-red-600 text-white text-xs font-bold py-1 px-3 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {product.promo.type}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-6xl text-center mb-4">{product.image}</div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.size} • 24 pcs/case</p>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-2xl font-bold text-red-600">₱{product.pricePerCase}</div>
                      <div className="text-sm text-gray-500">per case</div>
                    </div>
                    <div className="text-xs text-gray-500 mb-4">
                      ≈ ₱{(product.pricePerCase / product.piecesPerCase).toFixed(2)} per piece
                    </div>
                    <div className="text-sm text-gray-500 mb-4">Stock: {product.stock} cases</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition"
                      >
                        Add 1 Case
                      </button>
                      <button className={`p-2 rounded-lg border-2 transition ${
                        favorites.includes(product.id) 
                          ? 'border-red-600 text-red-600 bg-red-50' 
                          : 'border-gray-300 text-gray-400 hover:border-red-600 hover:text-red-600'
                      }`}>
                        <Heart className="w-5 h-5" fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* One-Click Smart Reordering */}
        {activeTab === 'reorder' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Quick Reorder</h2>
              <p className="text-gray-600">Reorder your past favorites with just one click</p>
            </div>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600">Order from {order.date}</span>
                      </div>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-gray-800">
                            • {item.name} <span className="text-gray-600">× {item.cases} case(s)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Total</div>
                      <div className="text-2xl font-bold text-red-600">₱{order.total.toLocaleString()}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => reorderPastFavorite(order)}
                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Reorder This Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In-App Promotions Engine */}
        {activeTab === 'promos' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Active Promotions</h2>
              <p className="text-gray-600">Save more with our current offers</p>
            </div>
            <div className="space-y-4">
              {promotions.map(promo => (
                <div key={promo.id} className={`${promo.color} text-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-6 h-6" />
                        <h3 className="text-xl font-bold">{promo.title}</h3>
                      </div>
                      <p className="text-white opacity-90 mb-4">{promo.desc}</p>
                      <button 
                        onClick={() => goToPromoProducts(promo.productIds)}
                        className="bg-white text-gray-800 py-2 px-6 rounded-lg font-semibold hover:bg-gray-100 transition"
                      >
                        Shop Now
                      </button>
                    </div>
                    <div className="text-6xl opacity-20">🎁</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Promo Modal */}
      {promoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 text-9xl opacity-10">🎉</div>
              <button 
                onClick={() => setPromoModal(null)}
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Special Promotion!</h3>
              </div>
              <p className="text-red-100">You're ordering a product with an active promo</p>
            </div>
            
            <div className="p-6">
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-5 h-5 text-yellow-700" />
                  <span className="font-bold text-yellow-900 text-lg">{promoModal.promo.type}</span>
                </div>
                {promoModal.promo.discount && (
                  <p className="text-yellow-800 text-sm">
                    Save {(promoModal.promo.discount * 100)}% on your order!
                  </p>
                )}
                {promoModal.promo.freeCase && (
                  <p className="text-yellow-800 text-sm">
                    Buy {promoModal.promo.minCases} cases, get 1 FREE!
                  </p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-gray-800 mb-3">Order Summary:</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">{promoModal.product.name}</span>
                  <span className="text-gray-700">{promoModal.product.size}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-bold">{promoModal.cases} case(s) • {promoModal.cases * promoModal.product.piecesPerCase} pcs</span>
                </div>
                {promoModal.promo.discount && (
                  <>
                    <div className="flex justify-between items-center text-gray-500 line-through mb-1">
                      <span>Regular Price:</span>
                      <span>₱{(promoModal.product.pricePerCase * promoModal.cases).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-red-600 font-bold text-lg">
                      <span>Promo Price:</span>
                      <span>₱{((promoModal.product.pricePerCase * promoModal.cases) * (1 - promoModal.promo.discount)).toLocaleString()}</span>
                    </div>
                    <div className="text-green-600 text-sm text-right font-semibold mt-1">
                      You save ₱{((promoModal.product.pricePerCase * promoModal.cases) * promoModal.promo.discount).toLocaleString()}!
                    </div>
                  </>
                )}
                {!promoModal.promo.discount && (
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Price:</span>
                    <span className="text-red-600">₱{(promoModal.product.pricePerCase * promoModal.cases).toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setPromoModal(null)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAddToCart}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Summary */}
      {cart.length > 0 && !showCart && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl p-4 w-80">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800">Cart Summary</h3>
            <span className="text-red-600 font-bold">{totalCases} case(s)</span>
          </div>
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            {cart.map(item => (
              <div key={item.id} className="text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">{item.name} × {item.cases}</span>
                  <span className="font-semibold">₱{calculateItemPrice(item).toLocaleString()}</span>
                </div>
                {item.promo && (
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {item.promo.type} applied
                  </div>
                )}
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowCart(true)}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
          >
            View Cart - ₱{calculateTotal().toLocaleString()}
          </button>
        </div>
      )}

      {/* Full Cart View */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-red-600 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Your Cart</h3>
                <p className="text-red-100">{totalCases} case(s) • {cart.length} item(s)</p>
              </div>
              <button 
                onClick={() => setShowCart(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex gap-4">
                        <div className="text-5xl">{item.image}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.size} • 24 pcs/case</p>
                          {item.promo && (
                            <div className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded mt-1">
                              <Tag className="w-3 h-3" />
                              {item.promo.type}
                            </div>
                          )}
                          
                          <div className="mt-3 flex items-center gap-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateCartQuantity(item.id, item.cases - 1)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded flex items-center justify-center font-bold transition"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-bold text-lg w-12 text-center">{item.cases}</span>
                              <button
                                onClick={() => updateCartQuantity(item.id, item.cases + 1)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded flex items-center justify-center font-bold transition"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <span className="text-sm text-gray-500">case(s)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right flex flex-col justify-between">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-600 self-end transition"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <div>
                            {item.promo && item.promo.discount && (
                              <div className="text-sm text-gray-400 line-through">
                                ₱{(item.pricePerCase * item.cases).toLocaleString()}
                              </div>
                            )}
                            <div className="text-xl font-bold text-red-600">
                              ₱{calculateItemPrice(item).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.cases * item.piecesPerCase} pcs
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t bg-gray-50 p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-semibold">₱{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee:</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-red-600">₱{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
                
                <button className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CocaColaEb2bMVP;