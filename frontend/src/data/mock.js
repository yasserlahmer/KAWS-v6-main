// Mock data for KAWS CAR - Location de Voiture

export const cars = [
  {
    id: "clio-5-2025",
    model: "Clio 5",
    brand: "Renault",
    year: 2025,
    price_per_day: 300,
    currency: "DH",
    seats: 5,
    transmission: "manual",
    fuel: "essence",
    category: "compact",
    quantity: 2,
    image: "/cars/clio-megane.jpg",
    gallery: ["/cars/clio-megane.jpg"],
    features: ["Climatisation", "Bluetooth", "USB", "Direction assistée"],
    description: {
      fr: "La Renault Clio 5 est la voiture citadine parfaite pour vos déplacements urbains. Économique et confortable.",
      en: "The Renault Clio 5 is the perfect city car for your urban trips. Economical and comfortable.",
      ar: "رينو كليو 5 هي السيارة المثالية للتنقل في المدينة. اقتصادية ومريحة."
    }
  },
  {
    id: "accent-2025",
    model: "Accent",
    brand: "Hyundai",
    year: 2025,
    price_per_day: 350,
    currency: "DH",
    seats: 5,
    transmission: "auto",
    fuel: "essence",
    category: "berline",
    quantity: 4,
    image: "/cars/accent-new.jpg",
    gallery: ["/cars/accent-new.jpg", "/cars/accent.jpg"],
    features: ["Climatisation", "Bluetooth", "Caméra de recul", "Régulateur de vitesse"],
    description: {
      fr: "La Hyundai Accent allie élégance et praticité. Idéale pour les trajets quotidiens et les voyages.",
      en: "The Hyundai Accent combines elegance and practicality. Ideal for daily commutes and travel.",
      ar: "هيونداي أكسنت تجمع بين الأناقة والعملية. مثالية للتنقل اليومي والسفر."
    }
  },
  {
    id: "megane-2025",
    model: "Megane",
    brand: "Renault",
    year: 2025,
    price_per_day: 450,
    currency: "DH",
    seats: 5,
    transmission: "auto",
    fuel: "diesel",
    category: "berline",
    quantity: 1,
    image: "/cars/megane2.jpg",
    gallery: ["/cars/megane2.jpg", "/cars/megane.jpg"],
    features: ["Climatisation bi-zone", "GPS intégré", "Sièges chauffants", "Bluetooth"],
    description: {
      fr: "La Renault Megane offre confort et technologie avancée. Parfaite pour les longs trajets.",
      en: "The Renault Megane offers comfort and advanced technology. Perfect for long journeys.",
      ar: "رينو ميغان توفر الراحة والتكنولوجيا المتقدمة. مثالية للرحلات الطويلة."
    }
  },
  {
    id: "touareg-vw",
    model: "Touareg",
    brand: "Volkswagen",
    year: 2024,
    price_per_day: 800,
    currency: "DH",
    seats: 5,
    transmission: "auto",
    fuel: "diesel",
    category: "suv",
    quantity: 1,
    image: "/cars/touareg.jpg",
    gallery: ["/cars/touareg.jpg"],
    features: ["4x4", "Toit panoramique", "Cuir", "GPS", "Caméra 360°"],
    description: {
      fr: "Le Volkswagen Touareg est le SUV premium par excellence. Puissance et luxe réunis.",
      en: "The Volkswagen Touareg is the ultimate premium SUV. Power and luxury combined.",
      ar: "فولكس فاجن طوارق هي السيارة الرياضية الفاخرة بامتياز. القوة والفخامة معاً."
    }
  },
  {
    id: "golf-8",
    model: "Golf 8",
    brand: "Volkswagen",
    year: 2024,
    price_per_day: 600,
    currency: "DH",
    seats: 5,
    transmission: "auto",
    fuel: "diesel",
    category: "compact",
    quantity: 1,
    image: "/cars/golf8.png",
    gallery: ["/cars/golf8.png"],
    features: ["Système multimédia", "LED Matrix", "Aide au stationnement", "ACC"],
    description: {
      fr: "La Golf 8 représente l'excellence allemande. Sportive, élégante et technologique.",
      en: "The Golf 8 represents German excellence. Sporty, elegant and technological.",
      ar: "غولف 8 تمثل التميز الألماني. رياضية وأنيقة وتكنولوجية."
    }
  },
  {
    id: "q8-2024",
    model: "Q8",
    brand: "Audi",
    year: 2024,
    price_per_day: 1600,
    currency: "DH",
    seats: 5,
    transmission: "auto",
    fuel: "diesel",
    category: "suv-premium",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1655284615415-b52cb3c2f8aa?w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1655284615415-b52cb3c2f8aa?w=800&auto=format&fit=crop"],
    features: ["Quattro", "Virtual Cockpit", "Bang & Olufsen", "Massage", "Night Vision"],
    description: {
      fr: "L'Audi Q8 incarne le luxe absolu. Une expérience de conduite exceptionnelle.",
      en: "The Audi Q8 embodies absolute luxury. An exceptional driving experience.",
      ar: "أودي Q8 تجسد الفخامة المطلقة. تجربة قيادة استثنائية."
    }
  },
  {
    id: "peugeot-2008",
    model: "2008",
    brand: "Peugeot",
    year: 2024,
    price_per_day: 350,
    currency: "DH",
    seats: 5,
    transmission: "auto",
    fuel: "diesel",
    category: "suv-compact",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1566421740474-8456c6840c71?w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1566421740474-8456c6840c71?w=800&auto=format&fit=crop"],
    features: ["i-Cockpit", "Caméra de recul", "CarPlay", "Android Auto"],
    description: {
      fr: "Le Peugeot 2008 combine style et polyvalence. Un SUV compact idéal pour la ville.",
      en: "The Peugeot 2008 combines style and versatility. An ideal compact SUV for the city.",
      ar: "بيجو 2008 تجمع بين الأناقة والتنوع. سيارة SUV مثالية للمدينة."
    }
  },
  {
    id: "evoque",
    model: "Evoque",
    brand: "Range Rover",
    year: 2024,
    price_per_day: 1200,
    currency: "DH",
    seats: 5,
    transmission: "auto",
    fuel: "diesel",
    category: "suv-premium",
    quantity: 1,
    image: "/cars/evoque.jpg",
    gallery: ["/cars/evoque.jpg"],
    features: ["Terrain Response", "Toit panoramique", "Meridian Sound", "Cuir Windsor"],
    description: {
      fr: "Le Range Rover Evoque allie luxe britannique et capacités tout-terrain.",
      en: "The Range Rover Evoque combines British luxury with off-road capabilities.",
      ar: "رينج روفر إيفوك تجمع بين الفخامة البريطانية وقدرات الطرق الوعرة."
    }
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Mohammed A.",
    rating: 5,
    comment: {
      fr: "Service impeccable ! Voiture propre et en excellent état. Je recommande vivement KAWS CAR.",
      en: "Impeccable service! Clean car in excellent condition. I highly recommend KAWS CAR.",
      ar: "خدمة لا تشوبها شائبة! سيارة نظيفة وفي حالة ممتازة. أنصح بشدة بـ KAWS CAR."
    },
    date: "2025-01-15"
  },
  {
    id: 2,
    name: "Sophie L.",
    rating: 5,
    comment: {
      fr: "Équipe très professionnelle et prix compétitifs. Ma location s'est parfaitement déroulée.",
      en: "Very professional team and competitive prices. My rental went perfectly.",
      ar: "فريق محترف للغاية وأسعار تنافسية. إيجاري سار بشكل مثالي."
    },
    date: "2025-01-10"
  },
  {
    id: 3,
    name: "Ahmed K.",
    rating: 5,
    comment: {
      fr: "J'ai loué l'Audi Q8 pour un mariage. Expérience exceptionnelle du début à la fin.",
      en: "I rented the Audi Q8 for a wedding. Exceptional experience from start to finish.",
      ar: "استأجرت أودي Q8 لحفل زفاف. تجربة استثنائية من البداية إلى النهاية."
    },
    date: "2025-01-05"
  }
];

export const galleryImages = [
  { id: 1, src: "/cars/touareg.jpg", alt: "Volkswagen Touareg" },
  { id: 2, src: "/cars/accent-new.jpg", alt: "Hyundai Accent" },
  { id: 3, src: "/cars/megane2.jpg", alt: "Renault Megane" },
  { id: 4, src: "/cars/evoque.jpg", alt: "Range Rover Evoque" },
  { id: 5, src: "/cars/clio-megane.jpg", alt: "Renault Clio" },
  { id: 6, src: "/cars/golf8.png", alt: "Volkswagen Golf 8" }
];

export const siteConfig = {
  name: "KAWS CAR",
  tagline: {
    fr: "Location de Voiture",
    en: "Car Rental",
    ar: "تأجير السيارات"
  },
  phone: "+212666505795",
  whatsapp: "212666505795",
  email: "kawscars.supp@gmail.com",
  address: {
    fr: "Casablanca, Maroc",
    en: "Casablanca, Morocco",
    ar: "الدار البيضاء، المغرب"
  },
  deliveryZone: {
    fr: "Livraison disponible dans tout le Maroc",
    en: "Delivery available throughout Morocco",
    ar: "التوصيل متاح في جميع أنحاء المغرب"
  },
  hours: "24/7",
  social: {
    instagram: "https://www.instagram.com/kaws_car_rentals?utm_source=qr&igsh=MWRxZHVpZXV1OTIxNA==",
    facebook: "#"
  }
};

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      fleet: "Nos Voitures",
      gallery: "Galerie",
      about: "À Propos",
      contact: "Contact",
      booking: "Réserver"
    },
    hero: {
      title: "Louez la voiture de vos rêves",
      subtitle: "Des véhicules premium au meilleur prix - Livraison dans tout le Maroc",
      cta: "Voir nos voitures",
      ctaSecondary: "Nous contacter"
    },
    fleet: {
      title: "Nos Voitures",
      subtitle: "Découvrez notre sélection de véhicules premium",
      filter: "Filtrer",
      all: "Toutes",
      pricePerDay: "/ jour",
      seats: "places",
      book: "Réserver",
      details: "Détails"
    },
    booking: {
      title: "Réservation",
      subtitle: "Réservez votre véhicule en quelques clics",
      form: {
        fullName: "Nom complet",
        email: "Email",
        phone: "Téléphone",
        pickupDate: "Date de prise en charge",
        returnDate: "Date de retour",
        pickupLocation: "Lieu de prise en charge",
        message: "Message (optionnel)",
        submit: "Envoyer la demande",
        whatsapp: "Réserver via WhatsApp"
      },
      success: "Votre demande a été envoyée avec succès !",
      total: "Total estimé"
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Notre équipe est à votre disposition 24h/24, 7j/7",
      phone: "Téléphone",
      email: "Email",
      address: "Adresse",
      hours: "Disponible 24h/24, 7j/7",
      delivery: "Livraison dans tout le Maroc"
    },
    about: {
      title: "À Propos de KAWS CAR",
      subtitle: "Votre partenaire de confiance pour la location de voiture",
      story: "KAWS CAR est une entreprise de location de véhicules basée à Casablanca. Nous proposons une flotte variée de véhicules allant de la citadine économique au SUV de luxe. Livraison disponible dans tout le Maroc.",
      values: {
        title: "Nos Valeurs",
        quality: "Qualité",
        qualityDesc: "Des véhicules entretenus et en parfait état",
        service: "Service",
        serviceDesc: "Une équipe disponible 24h/24, 7j/7",
        price: "Prix",
        priceDesc: "Des tarifs compétitifs et transparents"
      }
    },
    gallery: {
      title: "Galerie",
      subtitle: "Découvrez nos voitures en images"
    },
    footer: {
      rights: "Tous droits réservés",
      terms: "CGV",
      privacy: "Confidentialité",
      delivery: "Livraison dans tout le Maroc"
    },
    carDetail: {
      specifications: "Caractéristiques",
      features: "Équipements",
      transmission: "Transmission",
      fuel: "Carburant",
      seats: "Places",
      year: "Année",
      bookNow: "Réserver maintenant",
      priceNote: "Prix par jour, hors assurance"
    }
  },
  en: {
    nav: {
      home: "Home",
      fleet: "Our Cars",
      gallery: "Gallery",
      about: "About",
      contact: "Contact",
      booking: "Book Now"
    },
    hero: {
      title: "Rent Your Dream Car",
      subtitle: "Premium vehicles at the best prices - Delivery throughout Morocco",
      cta: "View Our Cars",
      ctaSecondary: "Contact Us"
    },
    fleet: {
      title: "Our Cars",
      subtitle: "Discover our selection of premium vehicles",
      filter: "Filter",
      all: "All",
      pricePerDay: "/ day",
      seats: "seats",
      book: "Book",
      details: "Details"
    },
    booking: {
      title: "Booking",
      subtitle: "Book your vehicle in a few clicks",
      form: {
        fullName: "Full Name",
        email: "Email",
        phone: "Phone",
        pickupDate: "Pickup Date",
        returnDate: "Return Date",
        pickupLocation: "Pickup Location",
        message: "Message (optional)",
        submit: "Send Request",
        whatsapp: "Book via WhatsApp"
      },
      success: "Your request has been sent successfully!",
      total: "Estimated Total"
    },
    contact: {
      title: "Contact Us",
      subtitle: "Our team is at your service 24/7",
      phone: "Phone",
      email: "Email",
      address: "Address",
      hours: "Available 24/7",
      delivery: "Delivery throughout Morocco"
    },
    about: {
      title: "About KAWS CAR",
      subtitle: "Your trusted partner for car rental",
      story: "KAWS CAR is a vehicle rental company based in Casablanca. We offer a varied fleet of vehicles ranging from economical city cars to luxury SUVs. Delivery available throughout Morocco.",
      values: {
        title: "Our Values",
        quality: "Quality",
        qualityDesc: "Well-maintained vehicles in perfect condition",
        service: "Service",
        serviceDesc: "A team available 24/7",
        price: "Pricing",
        priceDesc: "Competitive and transparent rates"
      }
    },
    gallery: {
      title: "Gallery",
      subtitle: "Discover our cars in pictures"
    },
    footer: {
      rights: "All rights reserved",
      terms: "Terms",
      privacy: "Privacy",
      delivery: "Delivery throughout Morocco"
    },
    carDetail: {
      specifications: "Specifications",
      features: "Features",
      transmission: "Transmission",
      fuel: "Fuel",
      seats: "Seats",
      year: "Year",
      bookNow: "Book Now",
      priceNote: "Price per day, insurance not included"
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      fleet: "سياراتنا",
      gallery: "معرض الصور",
      about: "من نحن",
      contact: "اتصل بنا",
      booking: "احجز الآن"
    },
    hero: {
      title: "استأجر سيارة أحلامك",
      subtitle: "سيارات فاخرة بأفضل الأسعار - توصيل في جميع أنحاء المغرب",
      cta: "عرض سياراتنا",
      ctaSecondary: "اتصل بنا"
    },
    fleet: {
      title: "سياراتنا",
      subtitle: "اكتشف مجموعتنا من السيارات الفاخرة",
      filter: "تصفية",
      all: "الكل",
      pricePerDay: "/ يوم",
      seats: "مقاعد",
      book: "احجز",
      details: "التفاصيل"
    },
    booking: {
      title: "الحجز",
      subtitle: "احجز سيارتك بنقرات قليلة",
      form: {
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        pickupDate: "تاريخ الاستلام",
        returnDate: "تاريخ الإرجاع",
        pickupLocation: "مكان الاستلام",
        message: "رسالة (اختياري)",
        submit: "إرسال الطلب",
        whatsapp: "احجز عبر واتساب"
      },
      success: "تم إرسال طلبك بنجاح!",
      total: "المجموع التقديري"
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "فريقنا في خدمتكم على مدار الساعة",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      address: "العنوان",
      hours: "متاح 24/7",
      delivery: "توصيل في جميع أنحاء المغرب"
    },
    about: {
      title: "عن KAWS CAR",
      subtitle: "شريكك الموثوق لتأجير السيارات",
      story: "KAWS CAR هي شركة تأجير سيارات مقرها الدار البيضاء. نقدم مجموعة متنوعة من السيارات من السيارات الاقتصادية إلى السيارات الفاخرة. توصيل متاح في جميع أنحاء المغرب.",
      values: {
        title: "قيمنا",
        quality: "الجودة",
        qualityDesc: "سيارات في حالة ممتازة",
        service: "الخدمة",
        serviceDesc: "فريق متاح على مدار الساعة",
        price: "الأسعار",
        priceDesc: "أسعار تنافسية وشفافة"
      }
    },
    gallery: {
      title: "معرض الصور",
      subtitle: "اكتشف سياراتنا بالصور"
    },
    footer: {
      rights: "جميع الحقوق محفوظة",
      terms: "الشروط",
      privacy: "الخصوصية",
      delivery: "توصيل في جميع أنحاء المغرب"
    },
    carDetail: {
      specifications: "المواصفات",
      features: "المميزات",
      transmission: "ناقل الحركة",
      fuel: "الوقود",
      seats: "المقاعد",
      year: "السنة",
      bookNow: "احجز الآن",
      priceNote: "السعر لليوم الواحد، بدون التأمين"
    }
  }
};
