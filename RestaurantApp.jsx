import { useState, useEffect, useCallback, useMemo, createContext, useContext, useRef } from "react";
import { ShoppingCart, ChefHat, LayoutDashboard, Home, Globe, Minus, Plus, Trash2, Search, Filter, Clock, CheckCircle, AlertCircle, Users, DollarSign, TrendingUp, Edit3, Upload, LogOut, ArrowLeft, X, Menu, Star, Flame, Leaf, ChevronDown, Package, Bell, BarChart3, Settings, UserPlus, Eye, EyeOff, Lock, Phone, MapPin, Utensils, Coffee, Wine, Cake, Fish, Beef, Salad, Pizza, IceCream, Soup, Sandwich, ChevronRight, Heart, Image, MessageCircle, Quote, Camera, Link2, RefreshCw, ExternalLink, FileText, Wifi, WifiOff, Pen, Type, LayoutList } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ============================================================
// CONTEXT & TRANSLATIONS
// ============================================================
const AppContext = createContext();

const translations = {
  it: {
    home: "Home", menu: "Menu", cart: "Carrello", staff: "Cucina", admin: "Admin",
    welcome: "Benvenuto", discover: "Scopri i nostri piatti", orderNow: "Ordina Ora",
    viewMenu: "Vedi il Menu", categories: "Categorie", all: "Tutti", allergens: "Allergeni",
    addToCart: "Aggiungi", total: "Totale", checkout: "Procedi all'Ordine",
    emptyCart: "Il carrello è vuoto", orderType: "Tipo Ordine", takeaway: "Asporto",
    dineIn: "Al Tavolo", table: "Tavolo", notes: "Note", send: "Invia Ordine",
    newOrders: "Nuovi", preparing: "In Preparazione", ready: "Pronti",
    accept: "Accetta", markReady: "Pronto", delivered: "Consegnato",
    dashboard: "Dashboard", revenue: "Incassi", menuMgmt: "Gestione Menu",
    staffMgmt: "Gestione Staff", daily: "Giornaliero", monthly: "Mensile",
    editItem: "Modifica", deleteItem: "Elimina", addItem: "Aggiungi Piatto",
    price: "Prezzo", name: "Nome", description: "Descrizione", save: "Salva",
    cancel: "Annulla", search: "Cerca...", popular: "Popolari", chef: "Chef's Choice",
    today: "Oggi", orders: "Ordini", avgOrder: "Ordine Medio", topDish: "Piatto Top",
    glutenFree: "Senza Glutine", vegan: "Vegano", vegetarian: "Vegetariano",
    lactoseFree: "Senza Lattosio", spicy: "Piccante", quantity: "Quantità",
    orderPlaced: "Ordine Inviato!", back: "Indietro", currency: "Valuta",
    language: "Lingua", tableNum: "Numero Tavolo", orderSuccess: "Ordine inviato con successo!",
    staffName: "Nome Staff", role: "Ruolo", active: "Attivo", addStaff: "Aggiungi Staff",
    totalRevenue: "Incasso Totale", ordersToday: "Ordini Oggi", itemsSold: "Piatti Venduti",
    heroSubtitle: "Cucina autentica italiana con ingredienti freschi e di stagione",
    heroTitle: "La Bella Tavola", specialToday: "Speciale del Giorno",
    openHours: "Orari di Apertura", location: "Dove Siamo", callUs: "Chiamaci",
    ourStory: "La Nostra Storia", storyText: "Dal 1985, portiamo in tavola la tradizione italiana con passione e ingredienti genuini.",
    reserved: "Prenota un Tavolo", contact: "Contattaci", followUs: "Seguici",
    rights: "Tutti i diritti riservati", madeWith: "Fatto con",
    filterByAllergens: "Filtra per allergeni", clearFilters: "Pulisci filtri",
    mins: "min", preparing_label: "In preparazione", orderFor: "Ordine per",
    reviews: "Recensioni dei Clienti", uploadImage: "Carica Immagine", changeImage: "Cambia Immagine",
    noImage: "Nessuna immagine", homeContent: "Contenuti Home", reviewsMgmt: "Recensioni",
    addReview: "Aggiungi Recensione", editReview: "Modifica Recensione",
    reviewText: "Testo Recensione", reviewerName: "Nome Recensore", rating: "Valutazione",
    source: "Fonte", manual: "Manuale", date: "Data",
    thirdPartyIntegration: "Integrazione Recensioni Esterne",
    googlePlaceId: "Google Place ID", apiKey: "API Key",
    connected: "Connesso", disconnected: "Disconnesso",
    connect: "Collega", disconnect: "Scollega", syncNow: "Sincronizza Ora",
    lastSync: "Ultima sincronizzazione", autoSync: "Sincronizzazione Automatica",
    syncInterval: "Intervallo di sincronizzazione", everyHour: "Ogni ora",
    every6Hours: "Ogni 6 ore", everyDay: "Ogni giorno",
    minRating: "Valutazione minima da importare",
    importedReviews: "Recensioni importate",
    sectionTitle: "Titolo Sezione", sectionText: "Testo Sezione", sectionImage: "Immagine Sezione",
    addSection: "Aggiungi Sezione", homeSections: "Sezioni della Home",
    visible: "Visibile", hidden: "Nascosto",
    restaurantPhone: "Telefono Ristorante", phoneForReservations: "Numero per prenotazioni",
    tapToCall: "Tocca per chiamare", phoneNotSet: "Numero non configurato",
    settingsGeneral: "Impostazioni Generali"
  },
  en: {
    home: "Home", menu: "Menu", cart: "Cart", staff: "Kitchen", admin: "Admin",
    welcome: "Welcome", discover: "Discover our dishes", orderNow: "Order Now",
    viewMenu: "View Menu", categories: "Categories", all: "All", allergens: "Allergens",
    addToCart: "Add", total: "Total", checkout: "Checkout",
    emptyCart: "Your cart is empty", orderType: "Order Type", takeaway: "Takeaway",
    dineIn: "Dine In", table: "Table", notes: "Notes", send: "Send Order",
    newOrders: "New", preparing: "Preparing", ready: "Ready",
    accept: "Accept", markReady: "Ready", delivered: "Delivered",
    dashboard: "Dashboard", revenue: "Revenue", menuMgmt: "Menu Management",
    staffMgmt: "Staff Management", daily: "Daily", monthly: "Monthly",
    editItem: "Edit", deleteItem: "Delete", addItem: "Add Dish",
    price: "Price", name: "Name", description: "Description", save: "Save",
    cancel: "Cancel", search: "Search...", popular: "Popular", chef: "Chef's Choice",
    today: "Today", orders: "Orders", avgOrder: "Avg Order", topDish: "Top Dish",
    glutenFree: "Gluten Free", vegan: "Vegan", vegetarian: "Vegetarian",
    lactoseFree: "Lactose Free", spicy: "Spicy", quantity: "Quantity",
    orderPlaced: "Order Placed!", back: "Back", currency: "Currency",
    language: "Language", tableNum: "Table Number", orderSuccess: "Order sent successfully!",
    staffName: "Staff Name", role: "Role", active: "Active", addStaff: "Add Staff",
    totalRevenue: "Total Revenue", ordersToday: "Orders Today", itemsSold: "Items Sold",
    heroSubtitle: "Authentic Italian cuisine with fresh, seasonal ingredients",
    heroTitle: "La Bella Tavola", specialToday: "Today's Special",
    openHours: "Opening Hours", location: "Find Us", callUs: "Call Us",
    ourStory: "Our Story", storyText: "Since 1985, we bring Italian tradition to the table with passion and genuine ingredients.",
    reserved: "Reserve a Table", contact: "Contact Us", followUs: "Follow Us",
    rights: "All rights reserved", madeWith: "Made with",
    filterByAllergens: "Filter by allergens", clearFilters: "Clear filters",
    mins: "min", preparing_label: "Preparing", orderFor: "Order for",
    reviews: "Customer Reviews", uploadImage: "Upload Image", changeImage: "Change Image",
    noImage: "No image", homeContent: "Home Content", reviewsMgmt: "Reviews",
    addReview: "Add Review", editReview: "Edit Review",
    reviewText: "Review Text", reviewerName: "Reviewer Name", rating: "Rating",
    source: "Source", manual: "Manual", date: "Date",
    thirdPartyIntegration: "Third-Party Review Integration",
    googlePlaceId: "Google Place ID", apiKey: "API Key",
    connected: "Connected", disconnected: "Disconnected",
    connect: "Connect", disconnect: "Disconnect", syncNow: "Sync Now",
    lastSync: "Last sync", autoSync: "Auto Sync",
    syncInterval: "Sync interval", everyHour: "Every hour",
    every6Hours: "Every 6 hours", everyDay: "Every day",
    minRating: "Minimum rating to import",
    importedReviews: "Imported reviews",
    sectionTitle: "Section Title", sectionText: "Section Text", sectionImage: "Section Image",
    addSection: "Add Section", homeSections: "Home Sections",
    visible: "Visible", hidden: "Hidden",
    restaurantPhone: "Restaurant Phone", phoneForReservations: "Phone number for reservations",
    tapToCall: "Tap to call", phoneNotSet: "Phone not configured",
    settingsGeneral: "General Settings"
  }
};

const currencies = { EUR: { symbol: "\u20ac", rate: 1 }, USD: { symbol: "$", rate: 1.09 }, GBP: { symbol: "\u00a3", rate: 0.86 } };

// ============================================================
// MOCK DATA
// ============================================================
const categoryIcons = {
  "Antipasti": Salad, "Primi": Soup, "Secondi": Beef, "Pizza": Pizza,
  "Contorni": Leaf, "Dolci": Cake, "Bevande": Coffee, "Pesce": Fish,
  "Panini": Sandwich, "Vini": Wine, "Gelati": IceCream
};

const makePlaceholder = (text, hue) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="hsl(${hue},40%,92%)"/><text x="100" y="90" text-anchor="middle" font-size="48" fill="hsl(${hue},50%,55%)">${text}</text><text x="100" y="125" text-anchor="middle" font-size="12" font-family="sans-serif" fill="hsl(${hue},30%,65%)">foto piatto</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const makeSectionPlaceholder = (hue, label) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300"><rect width="600" height="300" fill="hsl(${hue},35%,90%)"/><text x="300" y="140" text-anchor="middle" font-size="20" font-family="sans-serif" fill="hsl(${hue},40%,60%)">${label}</text><text x="300" y="170" text-anchor="middle" font-size="14" font-family="sans-serif" fill="hsl(${hue},30%,70%)">Carica una foto</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const initialMenuItems = [
  { id: 1, name: { it: "Bruschetta al Pomodoro", en: "Tomato Bruschetta" }, category: "Antipasti", price: 8, image: makePlaceholder("\ud83c\udf45", 10), desc: { it: "Pane tostato con pomodorini freschi, basilico e olio EVO", en: "Toasted bread with fresh cherry tomatoes, basil and EVO oil" }, allergens: ["glutine"], popular: true, rating: 4.8, time: 10 },
  { id: 2, name: { it: "Carpaccio di Manzo", en: "Beef Carpaccio" }, category: "Antipasti", price: 14, image: makePlaceholder("\ud83e\udd69", 0), desc: { it: "Carpaccio di manzo con rucola, parmigiano e limone", en: "Beef carpaccio with arugula, parmesan and lemon" }, allergens: ["latticini"], popular: false, rating: 4.6, time: 15 },
  { id: 3, name: { it: "Tagliatelle al Rag\u00f9", en: "Tagliatelle Bolognese" }, category: "Primi", price: 13, image: makePlaceholder("\ud83c\udf5d", 35), desc: { it: "Tagliatelle fresche con rag\u00f9 della tradizione bolognese", en: "Fresh tagliatelle with traditional Bolognese rag\u00f9" }, allergens: ["glutine", "uova"], popular: true, rating: 4.9, time: 20 },
  { id: 4, name: { it: "Risotto ai Funghi Porcini", en: "Porcini Mushroom Risotto" }, category: "Primi", price: 15, image: makePlaceholder("\ud83c\udf5a", 45), desc: { it: "Risotto cremoso con funghi porcini freschi", en: "Creamy risotto with fresh porcini mushrooms" }, allergens: ["latticini"], popular: true, rating: 4.7, time: 25 },
  { id: 5, name: { it: "Spaghetti alle Vongole", en: "Spaghetti with Clams" }, category: "Primi", price: 16, image: makePlaceholder("\ud83e\uddea", 200), desc: { it: "Spaghetti con vongole veraci, aglio e prezzemolo", en: "Spaghetti with fresh clams, garlic and parsley" }, allergens: ["glutine", "molluschi"], popular: false, rating: 4.5, time: 20 },
  { id: 6, name: { it: "Margherita DOC", en: "Margherita DOC" }, category: "Pizza", price: 10, image: makePlaceholder("\ud83c\udf55", 25), desc: { it: "Mozzarella di bufala, pomodoro San Marzano, basilico", en: "Buffalo mozzarella, San Marzano tomatoes, basil" }, allergens: ["glutine", "latticini"], popular: true, rating: 4.9, time: 12 },
  { id: 7, name: { it: "Pizza Diavola", en: "Diavola Pizza" }, category: "Pizza", price: 12, image: makePlaceholder("\ud83c\udf36\ufe0f", 5), desc: { it: "Salame piccante, mozzarella, pomodoro", en: "Spicy salami, mozzarella, tomato" }, allergens: ["glutine", "latticini"], popular: false, rating: 4.4, time: 12, spicy: true },
  { id: 8, name: { it: "Filetto alla Griglia", en: "Grilled Fillet" }, category: "Secondi", price: 24, image: makePlaceholder("\ud83e\udd69", 350), desc: { it: "Filetto di manzo alla griglia con patate arrosto", en: "Grilled beef fillet with roasted potatoes" }, allergens: [], popular: true, rating: 4.8, time: 25 },
  { id: 9, name: { it: "Branzino al Forno", en: "Baked Sea Bass" }, category: "Pesce", price: 22, image: makePlaceholder("\ud83d\udc1f", 190), desc: { it: "Branzino al forno con olive, capperi e pomodorini", en: "Baked sea bass with olives, capers and cherry tomatoes" }, allergens: ["pesce"], popular: false, rating: 4.6, time: 30 },
  { id: 10, name: { it: "Tiramis\u00f9", en: "Tiramisu" }, category: "Dolci", price: 8, image: makePlaceholder("\ud83c\udf70", 30), desc: { it: "Il classico tiramis\u00f9 con mascarpone e caff\u00e8", en: "Classic tiramisu with mascarpone and coffee" }, allergens: ["glutine", "uova", "latticini"], popular: true, rating: 4.9, time: 5 },
  { id: 11, name: { it: "Panna Cotta", en: "Panna Cotta" }, category: "Dolci", price: 7, image: makePlaceholder("\ud83c\udf6e", 50), desc: { it: "Panna cotta alla vaniglia con frutti di bosco", en: "Vanilla panna cotta with mixed berries" }, allergens: ["latticini"], popular: false, rating: 4.7, time: 5 },
  { id: 12, name: { it: "Insalata Mista", en: "Mixed Salad" }, category: "Contorni", price: 6, image: makePlaceholder("\ud83e\udd57", 120), desc: { it: "Insalata mista di stagione", en: "Seasonal mixed salad" }, allergens: [], popular: false, rating: 4.2, time: 5, vegan: true },
  { id: 13, name: { it: "Acqua Minerale", en: "Mineral Water" }, category: "Bevande", price: 3, image: makePlaceholder("\ud83d\udca7", 210), desc: { it: "Acqua minerale naturale o frizzante", en: "Still or sparkling mineral water" }, allergens: [], popular: false, rating: 4.0, time: 1 },
  { id: 14, name: { it: "Vino Rosso della Casa", en: "House Red Wine" }, category: "Vini", price: 18, image: makePlaceholder("\ud83c\udf77", 340), desc: { it: "Chianti Classico DOCG - bottiglia 0.75L", en: "Chianti Classico DOCG - 0.75L bottle" }, allergens: ["solfiti"], popular: true, rating: 4.5, time: 2 },
  { id: 15, name: { it: "Gelato Artigianale", en: "Artisan Gelato" }, category: "Gelati", price: 5, image: makePlaceholder("\ud83c\udf68", 180), desc: { it: "Tre gusti a scelta del nostro gelato artigianale", en: "Three flavors of our artisan gelato" }, allergens: ["latticini", "uova"], popular: true, rating: 4.8, time: 3 },
];

const allergenMap = {
  glutine: { it: "Glutine", en: "Gluten", icon: "\ud83c\udf3e" },
  latticini: { it: "Latticini", en: "Dairy", icon: "\ud83e\udd5b" },
  uova: { it: "Uova", en: "Eggs", icon: "\ud83e\udd5a" },
  pesce: { it: "Pesce", en: "Fish", icon: "\ud83d\udc1f" },
  molluschi: { it: "Molluschi", en: "Shellfish", icon: "\ud83e\udd90" },
  solfiti: { it: "Solfiti", en: "Sulfites", icon: "\ud83c\udf47" },
};

const initialReviews = [
  { id: 1, name: "Maria G.", rating: 5, text: { it: "La migliore carbonara che abbia mai mangiato! Ambiente fantastico e personale gentilissimo.", en: "The best carbonara I've ever had! Amazing atmosphere and very kind staff." }, date: "2 giorni fa", avatar: "MG", source: "manual", visible: true },
  { id: 2, name: "John S.", rating: 5, text: { it: "Autenticamente italiano. Il tiramis\u00f9 \u00e8 divino, ci torneremo sicuramente!", en: "Authentically Italian. The tiramisu is divine, we'll definitely come back!" }, date: "1 settimana fa", avatar: "JS", source: "google", visible: true },
  { id: 3, name: "Francesca R.", rating: 4, text: { it: "Ottima pizza margherita, croccante e saporita. Servizio rapido e cortese.", en: "Excellent margherita pizza, crispy and flavorful. Quick and courteous service." }, date: "3 giorni fa", avatar: "FR", source: "manual", visible: true },
  { id: 4, name: "Thomas K.", rating: 5, text: { it: "Un vero gioiello nascosto! Il risotto ai porcini \u00e8 incredibile. Consigliatissimo.", en: "A real hidden gem! The porcini risotto is incredible. Highly recommended." }, date: "5 giorni fa", avatar: "TK", source: "tripadvisor", visible: true },
  { id: 5, name: "Elena V.", rating: 4, text: { it: "Ingredienti freschissimi e porzioni generose. Il branzino era perfetto!", en: "Very fresh ingredients and generous portions. The sea bass was perfect!" }, date: "1 settimana fa", avatar: "EV", source: "yelp", visible: true },
];

const initialHomeSections = [
  {
    id: 1,
    title: { it: "I Nostri Ingredienti", en: "Our Ingredients" },
    text: { it: "Selezioniamo ogni giorno i migliori ingredienti dai produttori locali. Dalla mozzarella di bufala campana DOP al pomodoro San Marzano, ogni piatto racconta la storia del nostro territorio.", en: "Every day we select the finest ingredients from local producers. From DOP buffalo mozzarella to San Marzano tomatoes, every dish tells the story of our land." },
    image: makeSectionPlaceholder(25, "Ingredienti Freschi"),
    visible: true, layout: "image-left"
  },
  {
    id: 2,
    title: { it: "La Nostra Cantina", en: "Our Wine Cellar" },
    text: { it: "Una selezione curata di oltre 200 etichette italiane, dalle bollicine del Trentino ai rossi strutturati della Toscana. Il nostro sommelier sar\u00e0 lieto di consigliarvi l'abbinamento perfetto.", en: "A curated selection of over 200 Italian labels, from Trentino sparkling wines to full-bodied Tuscan reds. Our sommelier will be happy to suggest the perfect pairing." },
    image: makeSectionPlaceholder(340, "Vini Pregiati"),
    visible: true, layout: "image-right"
  }
];

const initialOrders = [
  { id: 1001, items: [{ name: "Margherita DOC", qty: 2 }, { name: "Tiramis\u00f9", qty: 1 }], status: "new", type: "dineIn", table: 5, time: "12:35", total: 28 },
  { id: 1002, items: [{ name: "Tagliatelle al Rag\u00f9", qty: 1 }, { name: "Acqua Minerale", qty: 2 }], status: "new", type: "takeaway", table: null, time: "12:38", total: 19 },
  { id: 1003, items: [{ name: "Risotto ai Funghi", qty: 2 }, { name: "Filetto alla Griglia", qty: 1 }], status: "preparing", type: "dineIn", table: 3, time: "12:20", total: 54 },
  { id: 1004, items: [{ name: "Bruschetta", qty: 3 }, { name: "Vino Rosso", qty: 1 }], status: "preparing", type: "dineIn", table: 7, time: "12:15", total: 42 },
  { id: 1005, items: [{ name: "Pizza Diavola", qty: 1 }, { name: "Gelato", qty: 2 }], status: "ready", type: "takeaway", table: null, time: "12:00", total: 22 },
];

const revenueData = [
  { day: "Lun", revenue: 1250, orders: 45 }, { day: "Mar", revenue: 980, orders: 38 },
  { day: "Mer", revenue: 1420, orders: 52 }, { day: "Gio", revenue: 1100, orders: 41 },
  { day: "Ven", revenue: 1850, orders: 68 }, { day: "Sab", revenue: 2200, orders: 82 },
  { day: "Dom", revenue: 1950, orders: 73 },
];

const monthlyData = [
  { month: "Gen", revenue: 28500 }, { month: "Feb", revenue: 31200 },
  { month: "Mar", revenue: 34800 }, { month: "Apr", revenue: 29600 },
  { month: "Mag", revenue: 38200 }, { month: "Giu", revenue: 42100 },
];

const pieData = [
  { name: "Pizza", value: 35, color: "#f97316" }, { name: "Primi", value: 28, color: "#eab308" },
  { name: "Secondi", value: 18, color: "#ef4444" }, { name: "Dolci", value: 12, color: "#a855f7" },
  { name: "Bevande", value: 7, color: "#3b82f6" },
];

const initialStaff = [
  { id: 1, name: "Marco Rossi", role: "Chef", active: true, avatar: "\ud83d\udc68\u200d\ud83c\udf73" },
  { id: 2, name: "Laura Bianchi", role: "Sous Chef", active: true, avatar: "\ud83d\udc69\u200d\ud83c\udf73" },
  { id: 3, name: "Giuseppe Verde", role: "Cameriere", active: true, avatar: "\ud83e\uddd1\u200d\ud83d\udcbc" },
  { id: 4, name: "Anna Neri", role: "Cameriere", active: false, avatar: "\ud83d\udc69\u200d\ud83d\udcbc" },
];

// Source icons/colors for reviews
const sourceConfig = {
  manual: { label: "Manuale", color: "bg-gray-100 text-gray-600", icon: Pen },
  google: { label: "Google", color: "bg-blue-100 text-blue-700", icon: Star },
  tripadvisor: { label: "TripAdvisor", color: "bg-green-100 text-green-700", icon: ExternalLink },
  yelp: { label: "Yelp", color: "bg-red-100 text-red-700", icon: Star },
};

// ============================================================
// UTILITY COMPONENTS
// ============================================================
const Badge = ({ children, color = "orange", className = "" }) => {
  const colors = {
    orange: "bg-orange-100 text-orange-700", green: "bg-emerald-100 text-emerald-700",
    red: "bg-red-100 text-red-700", blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700", gray: "bg-gray-100 text-gray-600",
    yellow: "bg-yellow-100 text-yellow-700"
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors[color]} ${className}`}>{children}</span>;
};

const StatCard = ({ icon: Icon, label, value, trend, color = "orange" }) => {
  const colors = { orange: "from-orange-500 to-amber-500", green: "from-emerald-500 to-teal-500", blue: "from-blue-500 to-indigo-500", purple: "from-purple-500 to-pink-500" };
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-lg`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        {trend && <p className="text-xs text-emerald-500 font-medium">{trend}</p>}
      </div>
    </div>
  );
};

const DishImage = ({ item, size = "md", className = "" }) => {
  const sizes = { sm: "w-12 h-12", md: "w-16 h-16", lg: "w-24 h-24", xl: "w-32 h-32" };
  return (
    <div className={`${sizes[size]} rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 ${className}`}>
      <img src={item.image} alt={item.name?.it || ""} className="w-full h-full object-cover" />
    </div>
  );
};

const renderStars = (count, size = 14) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={size} className={i < count ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
    ))}
  </div>
);

// ============================================================
// HOME PAGE
// ============================================================
const HomePage = () => {
  const { t, lang, setPage, reviews, homeSections, restaurantPhone } = useContext(AppContext);
  const [currentSpecial, setCurrentSpecial] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const visibleReviews = reviews.filter(r => r.visible);
  const visibleSections = homeSections.filter(s => s.visible);

  const specials = [
    { name: { it: "Tagliatelle al Tartufo", en: "Truffle Tagliatelle" }, price: 18, color: "from-amber-500 to-orange-600" },
    { name: { it: "Orata al Sale", en: "Salt-Crusted Sea Bream" }, price: 22, color: "from-blue-500 to-cyan-600" },
    { name: { it: "Semifreddo al Pistacchio", en: "Pistachio Semifreddo" }, price: 9, color: "from-green-500 to-emerald-600" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSpecial(p => (p + 1) % specials.length), 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (visibleReviews.length > 0) {
      const timer = setInterval(() => setCurrentReview(p => (p + 1) % visibleReviews.length), 4500);
      return () => clearInterval(timer);
    }
  }, [visibleReviews.length]);

  const avgRating = visibleReviews.length > 0 ? (visibleReviews.reduce((s, r) => s + r.rating, 0) / visibleReviews.length).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        </div>
        <div className="relative px-6 pt-16 pb-20 text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Utensils size={14} />
            <span className="text-sm font-medium">Ristorante Italiano</span>
          </div>
          <h1 className="text-5xl font-black mb-4 leading-tight tracking-tight">{t.heroTitle}</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">{t.heroSubtitle}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={() => setPage("menu")} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/30 flex items-center gap-2">
              <Utensils size={18} /> {t.viewMenu}
            </button>
            {restaurantPhone ? (
              <a href={`tel:${restaurantPhone.replace(/\s/g, "")}`} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-xl transition-all border border-white/20 flex items-center gap-2 cursor-pointer no-underline">
                <Phone size={18} /> {t.reserved}
              </a>
            ) : (
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-xl transition-all border border-white/20 flex items-center gap-2 opacity-60 cursor-not-allowed" title={t.phoneNotSet}>
                <Phone size={18} /> {t.reserved}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Today's Special */}
      <div className="px-6 -mt-8 max-w-lg mx-auto relative z-10">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Star size={18} className="text-orange-500 fill-orange-500" />
            <h3 className="font-bold text-gray-800">{t.specialToday}</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${specials[currentSpecial].color} flex items-center justify-center shadow-lg`}>
              <Utensils size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg text-gray-800">{specials[currentSpecial].name[lang]}</p>
              <p className="text-orange-500 font-bold text-lg">\u20ac{specials[currentSpecial].price}</p>
            </div>
            <button onClick={() => setPage("menu")} className="bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600 transition-all shadow-md">
              <Plus size={20} />
            </button>
          </div>
          <div className="flex gap-1.5 mt-4 justify-center">
            {specials.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentSpecial ? "w-6 bg-orange-500" : "w-1.5 bg-gray-200"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Admin-editable Image + Text Sections */}
      {visibleSections.length > 0 && (
        <div className="px-6 mt-8 max-w-lg mx-auto space-y-4">
          {visibleSections.map(section => (
            <div key={section.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className={`${section.layout === "image-right" ? "flex flex-col-reverse sm:flex-row-reverse" : "flex flex-col sm:flex-row"}`}>
                <div className="sm:w-2/5 h-48 sm:h-auto">
                  <img src={section.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="sm:w-3/5 p-5 flex flex-col justify-center">
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{section.title[lang]}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{section.text[lang]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reviews Section */}
      {visibleReviews.length > 0 && (
        <div className="px-6 mt-8 max-w-lg mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle size={20} className="text-orange-500" />
            <h3 className="font-bold text-gray-800 text-lg">{t.reviews}</h3>
            <div className="ml-auto flex items-center gap-1">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-sm font-bold text-gray-700">{avgRating}</span>
              <span className="text-xs text-gray-400">({visibleReviews.length})</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-3 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-10">
              <Quote size={40} className="text-orange-500" />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                {visibleReviews[currentReview % visibleReviews.length]?.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm text-gray-800">{visibleReviews[currentReview % visibleReviews.length]?.name}</p>
                  {visibleReviews[currentReview % visibleReviews.length]?.source !== "manual" && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${sourceConfig[visibleReviews[currentReview % visibleReviews.length]?.source]?.color || "bg-gray-100 text-gray-500"}`}>
                      {sourceConfig[visibleReviews[currentReview % visibleReviews.length]?.source]?.label}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {renderStars(visibleReviews[currentReview % visibleReviews.length]?.rating || 0)}
                  <span className="text-xs text-gray-400">{visibleReviews[currentReview % visibleReviews.length]?.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed italic">
              "{visibleReviews[currentReview % visibleReviews.length]?.text[lang]}"
            </p>
            <div className="flex gap-1.5 mt-4 justify-center">
              {visibleReviews.map((_, i) => (
                <button key={i} onClick={() => setCurrentReview(i)}
                  className={`h-1.5 rounded-full transition-all ${i === (currentReview % visibleReviews.length) ? "w-6 bg-orange-500" : "w-1.5 bg-gray-200 hover:bg-gray-300"}`} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {visibleReviews.slice(0, 4).map((rev, idx) => (
              idx !== (currentReview % visibleReviews.length) && (
                <div key={rev.id} className="bg-white rounded-xl p-3 border border-gray-100 cursor-pointer hover:shadow-sm transition-all"
                  onClick={() => setCurrentReview(idx)}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-500">{rev.avatar}</div>
                    <span className="text-xs font-semibold text-gray-700 flex-1 truncate">{rev.name}</span>
                    {rev.source !== "manual" && <span className={`px-1 py-0.5 rounded text-[7px] font-bold ${sourceConfig[rev.source]?.color || ""}`}>{sourceConfig[rev.source]?.label?.charAt(0)}</span>}
                  </div>
                  {renderStars(rev.rating, 10)}
                  <p className="text-[11px] text-gray-500 mt-1 leading-tight" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {rev.text[lang]}
                  </p>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="px-6 mt-8 max-w-lg mx-auto space-y-4 pb-28">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center"><Clock size={22} className="text-orange-600" /></div>
          <div><h4 className="font-bold text-gray-800">{t.openHours}</h4><p className="text-sm text-gray-500">Lun-Dom: 12:00 - 23:00</p></div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center"><MapPin size={22} className="text-emerald-600" /></div>
          <div><h4 className="font-bold text-gray-800">{t.location}</h4><p className="text-sm text-gray-500">Via Roma 42, 00184 Roma</p></div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><Phone size={22} className="text-blue-600" /></div>
          <div><h4 className="font-bold text-gray-800">{t.callUs}</h4><p className="text-sm text-gray-500">+39 06 1234 5678</p></div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
          <h3 className="font-bold text-gray-800 text-lg mb-2 flex items-center gap-2">
            <Heart size={18} className="text-orange-500 fill-orange-500" /> {t.ourStory}
          </h3>
          <p className="text-gray-600 leading-relaxed">{t.storyText}</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// CUSTOMER MENU (unchanged logic)
// ============================================================
const MenuPage = () => {
  const { t, lang, currency, menuItems, cart, setCart, setPage } = useContext(AppContext);
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [allergenFilter, setAllergenFilter] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = useMemo(() => [...new Set(menuItems.map(i => i.category))], [menuItems]);
  const cx = currencies[currency];

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      if (selectedCat !== "all" && item.category !== selectedCat) return false;
      if (searchTerm && !item.name[lang].toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (allergenFilter.length > 0 && allergenFilter.some(a => item.allergens.includes(a))) return false;
      return true;
    });
  }, [menuItems, selectedCat, searchTerm, allergenFilter, lang]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="px-4 py-3 flex items-center justify-between max-w-lg mx-auto">
          <button onClick={() => setPage("home")} className="p-2 hover:bg-gray-100 rounded-xl"><ArrowLeft size={20} /></button>
          <h1 className="font-bold text-lg">{t.menu}</h1>
          <button onClick={() => setPage("cart")} className="relative p-2 hover:bg-gray-100 rounded-xl">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
          </button>
        </div>
      </div>
      <div className="max-w-lg mx-auto px-4 pt-4">
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={t.search} className="w-full pl-10 pr-12 py-3 bg-white rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm" />
          <button onClick={() => setShowFilters(!showFilters)} className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${allergenFilter.length > 0 ? "bg-orange-100 text-orange-600" : "text-gray-400 hover:bg-gray-100"}`}><Filter size={16} /></button>
        </div>
        {showFilters && (
          <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-semibold text-gray-700">{t.filterByAllergens}</p>
              {allergenFilter.length > 0 && <button onClick={() => setAllergenFilter([])} className="text-xs text-orange-500 font-medium">{t.clearFilters}</button>}
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(allergenMap).map(([key, val]) => (
                <button key={key} onClick={() => setAllergenFilter(prev => prev.includes(key) ? prev.filter(a => a !== key) : [...prev, key])}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${allergenFilter.includes(key) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  <span>{val.icon}</span> {val[lang]}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          <button onClick={() => setSelectedCat("all")} className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedCat === "all" ? "bg-orange-500 text-white shadow-md shadow-orange-200" : "bg-white text-gray-600 border border-gray-200"}`}>{t.all}</button>
          {categories.map(cat => { const Icon = categoryIcons[cat] || Utensils; return (
            <button key={cat} onClick={() => setSelectedCat(cat)} className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedCat === cat ? "bg-orange-500 text-white shadow-md shadow-orange-200" : "bg-white text-gray-600 border border-gray-200"}`}><Icon size={14} /> {cat}</button>
          ); })}
        </div>
        <div className="space-y-3">
          {filteredItems.map(item => {
            const inCart = cart.find(c => c.id === item.id);
            return (
              <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedItem(item)}>
                <div className="flex gap-4">
                  <DishImage item={item} size="md" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-sm leading-tight">{item.name[lang]}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.desc[lang]}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      {item.popular && <Badge color="orange">{t.popular}</Badge>}
                      {item.spicy && <Badge color="red">\ud83c\udf36\ufe0f</Badge>}
                      {item.vegan && <Badge color="green">\ud83c\udf31</Badge>}
                      <span className="text-xs text-gray-400 flex items-center gap-0.5"><Clock size={10} /> {item.time}{t.mins}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-orange-600">{cx.symbol}{(item.price * cx.rate).toFixed(2)}</span>
                      {inCart ? (
                        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                          <button onClick={() => setCart(prev => prev.map(c => c.id === item.id ? { ...c, qty: Math.max(0, c.qty - 1) } : c).filter(c => c.qty > 0))} className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200"><Minus size={14} /></button>
                          <span className="text-sm font-bold w-5 text-center">{inCart.qty}</span>
                          <button onClick={() => addToCart(item)} className="w-7 h-7 bg-orange-500 text-white rounded-lg flex items-center justify-center hover:bg-orange-600"><Plus size={14} /></button>
                        </div>
                      ) : (
                        <button onClick={e => { e.stopPropagation(); addToCart(item); }} className="bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-orange-600 transition-all">{t.addToCart}</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-lg animate-slideUp" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <div className="flex justify-center mb-4"><DishImage item={selectedItem} size="xl" className="rounded-2xl" /></div>
            <h2 className="text-xl font-bold text-gray-800 text-center">{selectedItem.name[lang]}</h2>
            <p className="text-gray-500 text-center mt-2">{selectedItem.desc[lang]}</p>
            <div className="flex justify-center gap-2 mt-3 flex-wrap">
              {selectedItem.allergens.map(a => (<span key={a} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">{allergenMap[a]?.icon} {allergenMap[a]?.[lang]}</span>))}
            </div>
            <div className="flex items-center justify-between mt-6">
              <span className="text-2xl font-bold text-orange-600">{cx.symbol}{(selectedItem.price * cx.rate).toFixed(2)}</span>
              <button onClick={() => { addToCart(selectedItem); setSelectedItem(null); }} className="bg-orange-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">{t.addToCart}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// CART PAGE (unchanged)
// ============================================================
const CartPage = () => {
  const { t, lang, currency, cart, setCart, setPage } = useContext(AppContext);
  const [orderType, setOrderType] = useState("dineIn");
  const [tableNum, setTableNum] = useState("");
  const [notes, setNotes] = useState("");
  const [orderSent, setOrderSent] = useState(false);
  const cx = currencies[currency];
  const total = cart.reduce((s, c) => s + c.price * c.qty * cx.rate, 0);
  const sendOrder = () => { setOrderSent(true); setTimeout(() => { setCart([]); setOrderSent(false); setPage("menu"); }, 2000); };

  if (orderSent) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={40} className="text-emerald-500" /></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.orderSuccess}</h2>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="px-4 py-3 flex items-center gap-3 max-w-lg mx-auto">
          <button onClick={() => setPage("menu")} className="p-2 hover:bg-gray-100 rounded-xl"><ArrowLeft size={20} /></button>
          <h1 className="font-bold text-lg">{t.cart}</h1>
        </div>
      </div>
      <div className="max-w-lg mx-auto px-4 pt-4">
        {cart.length === 0 ? (
          <div className="text-center py-16"><ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400 font-medium">{t.emptyCart}</p></div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                  <DishImage item={item} size="sm" />
                  <div className="flex-1"><h4 className="font-semibold text-sm text-gray-800">{item.name[lang]}</h4><p className="text-orange-500 font-bold text-sm">{cx.symbol}{(item.price * cx.rate).toFixed(2)}</p></div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCart(prev => prev.map(c => c.id === item.id ? { ...c, qty: Math.max(0, c.qty - 1) } : c).filter(c => c.qty > 0))} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"><Minus size={14} /></button>
                    <span className="font-bold w-5 text-center">{item.qty}</span>
                    <button onClick={() => setCart(prev => prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c))} className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center"><Plus size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">{t.orderType}</p>
              <div className="flex gap-3">
                <button onClick={() => setOrderType("dineIn")} className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${orderType === "dineIn" ? "bg-orange-500 text-white shadow-md" : "bg-gray-100 text-gray-600"}`}>{t.dineIn}</button>
                <button onClick={() => setOrderType("takeaway")} className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${orderType === "takeaway" ? "bg-orange-500 text-white shadow-md" : "bg-gray-100 text-gray-600"}`}>{t.takeaway}</button>
              </div>
              {orderType === "dineIn" && <input value={tableNum} onChange={e => setTableNum(e.target.value)} placeholder={t.tableNum} type="number" min="1" max="30" className="w-full mt-3 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" />}
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">{t.notes}</p>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Es: senza cipolla, cottura media..." className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none" />
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-lg">
              <div className="flex justify-between items-center mb-4"><span className="text-gray-600 font-medium">{t.total}</span><span className="text-2xl font-bold text-gray-800">{cx.symbol}{total.toFixed(2)}</span></div>
              <button onClick={sendOrder} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2 text-lg">{t.send} <ChevronRight size={20} /></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================
// STAFF DASHBOARD (unchanged)
// ============================================================
const StaffPage = () => {
  const { t } = useContext(AppContext);
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("new");
  const updateStatus = (id, ns) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status: ns } : o));
  const filtered = orders.filter(o => o.status === activeTab);
  const counts = { new: orders.filter(o => o.status === "new").length, preparing: orders.filter(o => o.status === "preparing").length, ready: orders.filter(o => o.status === "ready").length };
  const statusColors = {
    new: { bg: "bg-blue-50 border-blue-200", badge: "blue", icon: Bell, action: t.accept, nextStatus: "preparing" },
    preparing: { bg: "bg-yellow-50 border-yellow-200", badge: "yellow", icon: Clock, action: t.markReady, nextStatus: "ready" },
    ready: { bg: "bg-emerald-50 border-emerald-200", badge: "green", icon: CheckCircle, action: t.delivered, nextStatus: "delivered" },
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="px-4 py-3 max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center"><ChefHat size={20} className="text-white" /></div>
            <div><h1 className="font-bold text-lg">Cucina Dashboard</h1><p className="text-xs text-gray-500">{orders.filter(o => o.status !== "delivered").length} {t.orders} attivi</p></div>
          </div>
          <div className="flex gap-2">
            {["new", "preparing", "ready"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === tab ? "bg-orange-500 text-white shadow-md" : "bg-gray-100 text-gray-600"}`}>
                {tab === "new" ? t.newOrders : tab === "preparing" ? t.preparing : t.ready}
                {counts[tab] > 0 && <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${activeTab === tab ? "bg-white/30" : "bg-orange-100 text-orange-600"}`}>{counts[tab]}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-lg mx-auto px-4 pt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16"><CheckCircle size={48} className="text-gray-300 mx-auto mb-3" /><p className="text-gray-400">Nessun ordine in questa sezione</p></div>
        ) : filtered.map(order => {
          const cfg = statusColors[order.status]; const StatusIcon = cfg.icon;
          return (
            <div key={order.id} className={`rounded-2xl p-4 border-2 ${cfg.bg} transition-all`}>
              <div className="flex justify-between items-start mb-3"><div><div className="flex items-center gap-2"><span className="font-bold text-gray-800">#{order.id}</span><Badge color={cfg.badge}><StatusIcon size={10} className="inline mr-1" />{order.status === "new" ? t.newOrders : order.status === "preparing" ? t.preparing_label : t.ready}</Badge></div><p className="text-xs text-gray-500 mt-1">{order.type === "dineIn" ? `${t.table} ${order.table}` : t.takeaway} \u00b7 {order.time}</p></div></div>
              <div className="space-y-1.5 mb-3">{order.items.map((item, i) => (<div key={i} className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-1.5"><span className="text-sm font-medium text-gray-700 flex-1">{item.name}</span><span className="text-sm font-bold text-gray-800">x{item.qty}</span></div>))}</div>
              <button onClick={() => updateStatus(order.id, cfg.nextStatus)} className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${order.status === "new" ? "bg-blue-500 text-white hover:bg-blue-600" : order.status === "preparing" ? "bg-yellow-500 text-white hover:bg-yellow-600" : "bg-emerald-500 text-white hover:bg-emerald-600"}`}>{cfg.action} \u2192</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// IMAGE UPLOAD COMPONENT
// ============================================================
const ImageUploader = ({ currentImage, onImageChange, label, wide = false }) => {
  const fileInputRef = useRef(null);
  const { t } = useContext(AppContext);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => onImageChange(ev.target.result);
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 block mb-1">{label || t.uploadImage}</label>
      <div className={`flex items-center gap-3 ${wide ? "flex-col" : ""}`}>
        <div className={`${wide ? "w-full h-32" : "w-20 h-20"} rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0`}>
          {currentImage ? <img src={currentImage} alt="" className="w-full h-full object-cover" /> : <Image size={24} className="text-gray-300" />}
        </div>
        <div className={wide ? "flex gap-2" : "flex-1"}>
          <button onClick={() => fileInputRef.current?.click()} className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-orange-600 transition-all flex items-center gap-1.5">
            <Camera size={14} /> {currentImage ? t.changeImage : t.uploadImage}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          {currentImage && <button onClick={() => onImageChange(null)} className="text-xs text-red-400 mt-1 hover:text-red-500 flex items-center gap-1"><Trash2 size={10} /> Rimuovi</button>}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ADMIN PANEL
// ============================================================
const AdminPage = () => {
  const { t, lang, currency, menuItems, setMenuItems, reviews, setReviews, homeSections, setHomeSections, restaurantPhone, setRestaurantPhone } = useContext(AppContext);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [editingItem, setEditingItem] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [staff, setStaff] = useState(initialStaff);
  const [revenueView, setRevenueView] = useState("daily");
  const cx = currencies[currency];

  // Third-party integration state
  const [integrations, setIntegrations] = useState({
    google: { enabled: false, placeId: "", apiKey: "", lastSync: null, autoSync: true, interval: "every6Hours", minRating: 4, importCount: 0 },
    tripadvisor: { enabled: false, restaurantId: "", apiKey: "", lastSync: null, autoSync: true, interval: "everyDay", minRating: 4, importCount: 0 },
    yelp: { enabled: false, businessId: "", apiKey: "", lastSync: null, autoSync: true, interval: "every6Hours", minRating: 4, importCount: 0 },
  });
  const [syncingService, setSyncingService] = useState(null);

  const totalToday = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = revenueData.reduce((s, d) => s + d.orders, 0);

  const simulateSync = (service) => {
    setSyncingService(service);
    setTimeout(() => {
      const fakeReviews = [
        { id: Date.now(), name: service === "google" ? "Marco P." : service === "tripadvisor" ? "Sarah L." : "Alex M.", rating: 5, text: { it: `Recensione importata da ${sourceConfig[service]?.label}. Ristorante eccellente, cibo fantastico!`, en: `Imported review from ${sourceConfig[service]?.label}. Excellent restaurant, amazing food!` }, date: "Appena importata", avatar: service === "google" ? "MP" : service === "tripadvisor" ? "SL" : "AM", source: service, visible: true },
      ];
      setReviews(prev => [...prev, ...fakeReviews]);
      setIntegrations(prev => ({ ...prev, [service]: { ...prev[service], lastSync: new Date().toLocaleString("it-IT"), importCount: prev[service].importCount + fakeReviews.length } }));
      setSyncingService(null);
    }, 2000);
  };

  const sections = [
    { id: "dashboard", icon: BarChart3, label: t.dashboard },
    { id: "menu", icon: Utensils, label: t.menuMgmt },
    { id: "homeContent", icon: LayoutList, label: t.homeContent },
    { id: "reviews", icon: MessageCircle, label: t.reviewsMgmt },
    { id: "staff", icon: Users, label: t.staffMgmt },
    { id: "revenue", icon: TrendingUp, label: t.revenue },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 pt-6 pb-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center"><LayoutDashboard size={20} /></div>
            <div><h1 className="font-bold text-lg">Admin Panel</h1><p className="text-xs text-gray-400">La Bella Tavola</p></div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {sections.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)} className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${activeSection === s.id ? "bg-orange-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}>
                <s.icon size={13} /> {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4">

        {/* ==================== DASHBOARD ==================== */}
        {activeSection === "dashboard" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard icon={DollarSign} label={t.totalRevenue} value={`\u20ac${totalToday.toLocaleString()}`} trend="+12.5%" color="orange" />
              <StatCard icon={Package} label={t.ordersToday} value={totalOrders} trend="+8%" color="blue" />
              <StatCard icon={TrendingUp} label={t.avgOrder} value="\u20ac26.40" color="green" />
              <StatCard icon={Star} label={t.topDish} value="Margherita" color="purple" />
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">{t.revenue} - {t.daily}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="day" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Bar dataKey="revenue" fill="#f97316" radius={[6, 6, 0, 0]} /></BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">Vendite per Categoria</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>{pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}</Pie><Tooltip /></PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ==================== REVENUE ==================== */}
        {activeSection === "revenue" && (
          <div className="space-y-4">
            <div className="flex gap-2 mb-2">
              <button onClick={() => setRevenueView("daily")} className={`px-4 py-2 rounded-xl text-sm font-semibold ${revenueView === "daily" ? "bg-orange-500 text-white" : "bg-white text-gray-600 border"}`}>{t.daily}</button>
              <button onClick={() => setRevenueView("monthly")} className={`px-4 py-2 rounded-xl text-sm font-semibold ${revenueView === "monthly" ? "bg-orange-500 text-white" : "bg-white text-gray-600 border"}`}>{t.monthly}</button>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">{revenueView === "daily" ? "Incassi Settimanali" : "Incassi Mensili"}</h3>
              <ResponsiveContainer width="100%" height={250}>
                {revenueView === "daily" ? (
                  <BarChart data={revenueData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="day" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip formatter={(v) => [`\u20ac${v}`, "Incasso"]} /><Bar dataKey="revenue" fill="#f97316" radius={[6, 6, 0, 0]} /></BarChart>
                ) : (
                  <LineChart data={monthlyData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip formatter={(v) => [`\u20ac${v}`, "Incasso"]} /><Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} dot={{ r: 5, fill: "#f97316" }} /></LineChart>
                )}
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatCard icon={DollarSign} label="Incasso Totale" value="\u20ac10,750" trend="+15%" color="orange" />
              <StatCard icon={Package} label="Ordini Totali" value="399" trend="+8%" color="blue" />
            </div>
          </div>
        )}

        {/* ==================== MENU MANAGEMENT ==================== */}
        {activeSection === "menu" && (
          <div className="space-y-3">
            <button onClick={() => setEditingItem({ id: Date.now(), name: { it: "", en: "" }, category: "Antipasti", price: 0, image: null, desc: { it: "", en: "" }, allergens: [], popular: false, rating: 0, time: 15 })} className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-md"><Plus size={18} /> {t.addItem}</button>
            {menuItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                <DishImage item={item} size="sm" />
                <div className="flex-1"><h4 className="font-semibold text-sm">{item.name[lang]}</h4><p className="text-xs text-gray-500">{item.category} \u00b7 \u20ac{item.price}</p></div>
                <button onClick={() => setEditingItem({ ...item })} className="p-2 hover:bg-gray-100 rounded-lg"><Edit3 size={16} className="text-gray-500" /></button>
                <button onClick={() => setMenuItems(prev => prev.filter(m => m.id !== item.id))} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-400" /></button>
              </div>
            ))}
            {editingItem && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setEditingItem(null)}>
                <div className="bg-white rounded-t-3xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-4">{editingItem.name.it ? t.editItem : t.addItem}</h3>
                  <div className="space-y-3">
                    <ImageUploader currentImage={editingItem.image} onImageChange={(img) => setEditingItem({ ...editingItem, image: img || makePlaceholder("\ud83c\udf7d\ufe0f", Math.random() * 360) })} />
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">Nome (IT)</label><input value={editingItem.name.it} onChange={e => setEditingItem({ ...editingItem, name: { ...editingItem.name, it: e.target.value } })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" /></div>
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">Name (EN)</label><input value={editingItem.name.en} onChange={e => setEditingItem({ ...editingItem, name: { ...editingItem.name, en: e.target.value } })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">{t.price} (\u20ac)</label><input type="number" value={editingItem.price} onChange={e => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" /></div>
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Categoria</label><select value={editingItem.category} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400">{["Antipasti","Primi","Secondi","Pizza","Pesce","Contorni","Dolci","Bevande","Vini","Gelati"].map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                    </div>
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">Descrizione (IT)</label><textarea value={editingItem.desc.it} onChange={e => setEditingItem({ ...editingItem, desc: { ...editingItem.desc, it: e.target.value } })} rows={2} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none" /></div>
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">Description (EN)</label><textarea value={editingItem.desc.en} onChange={e => setEditingItem({ ...editingItem, desc: { ...editingItem.desc, en: e.target.value } })} rows={2} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none" /></div>
                    <div><label className="text-xs font-semibold text-gray-600 block mb-2">Allergeni</label><div className="flex flex-wrap gap-2">{Object.entries(allergenMap).map(([key, val]) => (<button key={key} type="button" onClick={() => setEditingItem(prev => ({ ...prev, allergens: prev.allergens.includes(key) ? prev.allergens.filter(a => a !== key) : [...prev.allergens, key] }))} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${editingItem.allergens.includes(key) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>{val.icon} {val.it}</button>))}</div></div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setEditingItem(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm">{t.cancel}</button>
                      <button onClick={() => { const item = { ...editingItem, image: editingItem.image || makePlaceholder("\ud83c\udf7d\ufe0f", Math.random() * 360) }; setMenuItems(prev => { const exists = prev.find(m => m.id === item.id); return exists ? prev.map(m => m.id === item.id ? item : m) : [...prev, item]; }); setEditingItem(null); }} className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm">{t.save}</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== HOME CONTENT MANAGEMENT ==================== */}
        {activeSection === "homeContent" && (
          <div className="space-y-3">
            {/* Phone Number for Reservations */}
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center"><Phone size={14} className="text-white" /></div>
                <div><h4 className="font-semibold text-sm">{t.phoneForReservations}</h4><p className="text-[10px] text-gray-400">"{t.reserved}" nella Home</p></div>
              </div>
              <div className="flex gap-2">
                <input value={restaurantPhone} onChange={e => setRestaurantPhone(e.target.value)} placeholder="+39 06 1234 5678" className="flex-1 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" />
                {restaurantPhone && (
                  <a href={`tel:${restaurantPhone.replace(/\s/g, "")}`} className="bg-emerald-500 text-white px-3 py-2.5 rounded-xl flex items-center gap-1 text-xs font-bold hover:bg-emerald-600 transition-all no-underline">
                    <Phone size={12} /> Test
                  </a>
                )}
              </div>
              {restaurantPhone && <p className="text-[10px] text-emerald-500 mt-1.5 flex items-center gap-1"><CheckCircle size={10} /> I clienti potranno chiamare {restaurantPhone} toccando "{t.reserved}"</p>}
              {!restaurantPhone && <p className="text-[10px] text-amber-500 mt-1.5 flex items-center gap-1"><AlertCircle size={10} /> Inserisci un numero per attivare il pulsante prenotazione nella Home</p>}
            </div>

            <div className="border-t border-gray-200 pt-3">
              <h4 className="font-semibold text-sm text-gray-700 mb-3">{t.homeSections}</h4>
            </div>

            <button onClick={() => setEditingSection({ id: Date.now(), title: { it: "", en: "" }, text: { it: "", en: "" }, image: null, visible: true, layout: "image-left" })}
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-md">
              <Plus size={18} /> {t.addSection}
            </button>

            {homeSections.map(section => (
              <div key={section.id} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {section.image && <img src={section.image} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{section.title[lang] || "Senza titolo"}</h4>
                    <p className="text-xs text-gray-500 truncate">{section.text[lang]?.substring(0, 50)}...</p>
                  </div>
                  <button onClick={() => setHomeSections(prev => prev.map(s => s.id === section.id ? { ...s, visible: !s.visible } : s))}
                    className={`p-1.5 rounded-lg ${section.visible ? "text-emerald-500" : "text-gray-300"}`}>
                    {section.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => setEditingSection({ ...section })} className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit3 size={16} className="text-gray-500" /></button>
                  <button onClick={() => setHomeSections(prev => prev.filter(s => s.id !== section.id))} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-400" /></button>
                </div>
              </div>
            ))}

            {editingSection && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setEditingSection(null)}>
                <div className="bg-white rounded-t-3xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-4">{editingSection.title.it ? t.editItem : t.addSection}</h3>
                  <div className="space-y-3">
                    <ImageUploader wide currentImage={editingSection.image} onImageChange={(img) => setEditingSection({ ...editingSection, image: img })} label={t.sectionImage} />
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">Titolo (IT)</label><input value={editingSection.title.it} onChange={e => setEditingSection({ ...editingSection, title: { ...editingSection.title, it: e.target.value } })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" /></div>
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">Title (EN)</label><input value={editingSection.title.en} onChange={e => setEditingSection({ ...editingSection, title: { ...editingSection.title, en: e.target.value } })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" /></div>
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">Testo (IT)</label><textarea value={editingSection.text.it} onChange={e => setEditingSection({ ...editingSection, text: { ...editingSection.text, it: e.target.value } })} rows={3} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none" /></div>
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">Text (EN)</label><textarea value={editingSection.text.en} onChange={e => setEditingSection({ ...editingSection, text: { ...editingSection.text, en: e.target.value } })} rows={3} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none" /></div>
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">Layout</label>
                      <div className="flex gap-2">
                        {["image-left", "image-right"].map(l => (
                          <button key={l} onClick={() => setEditingSection({ ...editingSection, layout: l })} className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${editingSection.layout === l ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                            {l === "image-left" ? "Immagine a Sinistra" : "Immagine a Destra"}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setEditingSection(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm">{t.cancel}</button>
                      <button onClick={() => { const s = { ...editingSection, image: editingSection.image || makeSectionPlaceholder(Math.random() * 360, "Sezione") }; setHomeSections(prev => { const exists = prev.find(x => x.id === s.id); return exists ? prev.map(x => x.id === s.id ? s : x) : [...prev, s]; }); setEditingSection(null); }} className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm">{t.save}</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== REVIEWS MANAGEMENT ==================== */}
        {activeSection === "reviews" && (
          <div className="space-y-4">
            {/* Manual reviews CRUD */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">{t.reviewsMgmt}</h3>
                <span className="text-xs text-gray-400">{reviews.length} totali</span>
              </div>
              <button onClick={() => setEditingReview({ id: Date.now(), name: "", rating: 5, text: { it: "", en: "" }, date: new Date().toLocaleDateString("it-IT"), avatar: "??", source: "manual", visible: true })}
                className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-md mb-3">
                <Plus size={18} /> {t.addReview}
              </button>

              <div className="space-y-2">
                {reviews.map(rev => (
                  <div key={rev.id} className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-500 flex-shrink-0">{rev.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold truncate">{rev.name}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${sourceConfig[rev.source]?.color || "bg-gray-100 text-gray-500"}`}>{sourceConfig[rev.source]?.label || rev.source}</span>
                      </div>
                      <div className="flex items-center gap-1">{renderStars(rev.rating, 10)}</div>
                    </div>
                    <button onClick={() => setReviews(prev => prev.map(r => r.id === rev.id ? { ...r, visible: !r.visible } : r))}
                      className={`p-1.5 rounded-lg ${rev.visible ? "text-emerald-500" : "text-gray-300"}`}>
                      {rev.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button onClick={() => setEditingReview({ ...rev })} className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit3 size={14} className="text-gray-500" /></button>
                    <button onClick={() => setReviews(prev => prev.filter(r => r.id !== rev.id))} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={14} className="text-red-400" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Third-party Integration */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2"><Link2 size={18} /> {t.thirdPartyIntegration}</h3>
              <p className="text-xs text-gray-500 mb-4">Collega Google, TripAdvisor o Yelp per importare automaticamente le recensioni dei clienti.</p>

              {[
                { key: "google", label: "Google Reviews", color: "from-blue-500 to-blue-600", idLabel: "Google Place ID", idField: "placeId" },
                { key: "tripadvisor", label: "TripAdvisor", color: "from-green-500 to-emerald-600", idLabel: "Restaurant ID", idField: "restaurantId" },
                { key: "yelp", label: "Yelp", color: "from-red-500 to-rose-600", idLabel: "Business ID", idField: "businessId" },
              ].map(service => {
                const intg = integrations[service.key];
                return (
                  <div key={service.key} className="bg-white rounded-xl border border-gray-100 mb-3 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                            <Star size={14} className="text-white" />
                          </div>
                          <div>
                            <span className="font-bold text-sm">{service.label}</span>
                            <div className="flex items-center gap-1">
                              {intg.enabled ? <Wifi size={10} className="text-emerald-500" /> : <WifiOff size={10} className="text-gray-300" />}
                              <span className={`text-[10px] font-semibold ${intg.enabled ? "text-emerald-500" : "text-gray-400"}`}>{intg.enabled ? t.connected : t.disconnected}</span>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => setIntegrations(prev => ({ ...prev, [service.key]: { ...prev[service.key], enabled: !prev[service.key].enabled } }))}
                          className={`relative w-11 h-6 rounded-full transition-all ${intg.enabled ? "bg-emerald-500" : "bg-gray-300"}`}>
                          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${intg.enabled ? "left-5.5" : "left-0.5"}`} style={{ left: intg.enabled ? "22px" : "2px" }} />
                        </button>
                      </div>

                      {intg.enabled && (
                        <div className="space-y-2 pt-2 border-t border-gray-100">
                          <div>
                            <label className="text-[10px] font-semibold text-gray-500 uppercase">{service.idLabel}</label>
                            <input value={intg[service.idField]} onChange={e => setIntegrations(prev => ({ ...prev, [service.key]: { ...prev[service.key], [service.idField]: e.target.value } }))}
                              placeholder={`Es: ChIJN1t_tD...`} className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs outline-none focus:border-orange-400 mt-0.5" />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-gray-500 uppercase">{t.apiKey}</label>
                            <input value={intg.apiKey} onChange={e => setIntegrations(prev => ({ ...prev, [service.key]: { ...prev[service.key], apiKey: e.target.value } }))}
                              type="password" placeholder="AIza..." className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs outline-none focus:border-orange-400 mt-0.5" />
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <label className="text-[10px] font-semibold text-gray-500 uppercase">{t.syncInterval}</label>
                              <select value={intg.interval} onChange={e => setIntegrations(prev => ({ ...prev, [service.key]: { ...prev[service.key], interval: e.target.value } }))}
                                className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs outline-none mt-0.5">
                                <option value="everyHour">{t.everyHour}</option>
                                <option value="every6Hours">{t.every6Hours}</option>
                                <option value="everyDay">{t.everyDay}</option>
                              </select>
                            </div>
                            <div className="flex-1">
                              <label className="text-[10px] font-semibold text-gray-500 uppercase">{t.minRating}</label>
                              <select value={intg.minRating} onChange={e => setIntegrations(prev => ({ ...prev, [service.key]: { ...prev[service.key], minRating: parseInt(e.target.value) } }))}
                                className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs outline-none mt-0.5">
                                {[3, 4, 5].map(r => <option key={r} value={r}>{r}+ stelle</option>)}
                              </select>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <div className="text-[10px] text-gray-400">
                              {intg.lastSync && <span>{t.lastSync}: {intg.lastSync}</span>}
                              {intg.importCount > 0 && <span className="ml-2">({intg.importCount} {t.importedReviews})</span>}
                            </div>
                            <button onClick={() => simulateSync(service.key)} disabled={syncingService === service.key}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${syncingService === service.key ? "bg-gray-100 text-gray-400" : "bg-orange-500 text-white hover:bg-orange-600"}`}>
                              <RefreshCw size={12} className={syncingService === service.key ? "animate-spin" : ""} />
                              {syncingService === service.key ? "Sincronizzando..." : t.syncNow}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Review Edit Modal */}
            {editingReview && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setEditingReview(null)}>
                <div className="bg-white rounded-t-3xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-4">{editingReview.name ? t.editReview : t.addReview}</h3>
                  <div className="space-y-3">
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">{t.reviewerName}</label><input value={editingReview.name} onChange={e => setEditingReview({ ...editingReview, name: e.target.value, avatar: e.target.value.split(" ").map(w => w[0] || "").join("").toUpperCase().slice(0, 2) })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" /></div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 block mb-1">{t.rating}</label>
                      <div className="flex gap-1">{[1,2,3,4,5].map(s => (<button key={s} onClick={() => setEditingReview({ ...editingReview, rating: s })}><Star size={24} className={s <= editingReview.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"} /></button>))}</div>
                    </div>
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">{t.reviewText} (IT)</label><textarea value={editingReview.text.it} onChange={e => setEditingReview({ ...editingReview, text: { ...editingReview.text, it: e.target.value } })} rows={3} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none" /></div>
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">{t.reviewText} (EN)</label><textarea value={editingReview.text.en} onChange={e => setEditingReview({ ...editingReview, text: { ...editingReview.text, en: e.target.value } })} rows={3} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none" /></div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setEditingReview(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm">{t.cancel}</button>
                      <button onClick={() => { setReviews(prev => { const exists = prev.find(r => r.id === editingReview.id); return exists ? prev.map(r => r.id === editingReview.id ? editingReview : r) : [...prev, editingReview]; }); setEditingReview(null); }} className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm">{t.save}</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== STAFF MANAGEMENT ==================== */}
        {activeSection === "staff" && (
          <div className="space-y-3">
            <button onClick={() => setStaff(prev => [...prev, { id: Date.now(), name: "Nuovo Staff", role: "Cameriere", active: true, avatar: "\ud83e\uddd1\u200d\ud83d\udcbc" }])} className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-md"><UserPlus size={18} /> {t.addStaff}</button>
            {staff.map(member => (
              <div key={member.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                <span className="text-2xl">{member.avatar}</span>
                <div className="flex-1"><h4 className="font-semibold text-sm">{member.name}</h4><p className="text-xs text-gray-500">{member.role}</p></div>
                <button onClick={() => setStaff(prev => prev.map(s => s.id === member.id ? { ...s, active: !s.active } : s))} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${member.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{member.active ? "Attivo" : "Inattivo"}</button>
                <button onClick={() => setStaff(prev => prev.filter(s => s.id !== member.id))} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-400" /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// BOTTOM NAVIGATION
// ============================================================
const BottomNav = () => {
  const { page, setPage, t, lang, setLang, currency, setCurrency, cart } = useContext(AppContext);
  const [showSettings, setShowSettings] = useState(false);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const navItems = [
    { id: "home", icon: Home, label: t.home },
    { id: "menu", icon: Utensils, label: t.menu },
    { id: "cart", icon: ShoppingCart, label: t.cart, badge: cartCount },
    { id: "staff", icon: ChefHat, label: t.staff },
    { id: "admin", icon: LayoutDashboard, label: t.admin },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30">
        <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all relative ${page === item.id ? "text-orange-500" : "text-gray-400"}`}>
              <item.icon size={20} strokeWidth={page === item.id ? 2.5 : 1.5} />
              <span className="text-[10px] font-semibold">{item.label}</span>
              {item.badge > 0 && <span className="absolute -top-0.5 right-0.5 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{item.badge}</span>}
              {page === item.id && <div className="absolute -bottom-2 w-6 h-1 bg-orange-500 rounded-full" />}
            </button>
          ))}
          <button onClick={() => setShowSettings(!showSettings)} className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl text-gray-400">
            <Globe size={20} strokeWidth={1.5} /><span className="text-[10px] font-semibold">{lang.toUpperCase()}</span>
          </button>
        </div>
      </div>
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-end justify-center" onClick={() => setShowSettings(false)}>
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Globe size={20} /> {t.language} & {t.currency}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">{t.language}</p>
                <div className="flex gap-2">
                  {[{ code: "it", flag: "\ud83c\uddee\ud83c\uddf9", label: "Italiano" }, { code: "en", flag: "\ud83c\uddec\ud83c\udde7", label: "English" }].map(l => (
                    <button key={l.code} onClick={() => setLang(l.code)} className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${lang === l.code ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>{l.flag} {l.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">{t.currency}</p>
                <div className="flex gap-2">
                  {Object.entries(currencies).map(([code, c]) => (
                    <button key={code} onClick={() => setCurrency(code)} className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${currency === code ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>{c.symbol} {code}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("it");
  const [currency, setCurrency] = useState("EUR");
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [reviews, setReviews] = useState(initialReviews);
  const [homeSections, setHomeSections] = useState(initialHomeSections);
  const [restaurantPhone, setRestaurantPhone] = useState("+39 06 1234 5678");

  const t = translations[lang];

  const contextValue = useMemo(() => ({
    page, setPage, lang, setLang, currency, setCurrency, cart, setCart,
    menuItems, setMenuItems, reviews, setReviews, homeSections, setHomeSections,
    restaurantPhone, setRestaurantPhone, t
  }), [page, lang, currency, cart, menuItems, reviews, homeSections, restaurantPhone, t]);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage />;
      case "menu": return <MenuPage />;
      case "cart": return <CartPage />;
      case "staff": return <StaffPage />;
      case "admin": return <AdminPage />;
      default: return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="max-w-lg mx-auto bg-gray-50 min-h-screen relative font-sans">
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
          @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
          .animate-slideUp { animation: slideUp 0.3s ease-out; }
        `}</style>
        {renderPage()}
        <BottomNav />
      </div>
    </AppContext.Provider>
  );
}
