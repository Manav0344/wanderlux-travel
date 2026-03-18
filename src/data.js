export const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    region: "Europe",
    category: "Islands",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    description: "Iconic white-washed villages perched on volcanic cliffs overlooking the Aegean Sea.",
    rating: 4.9,
    reviews: 2847,
    price: "$1,299",
    tags: ["Romantic", "Scenic", "Beaches"],
    featured: true
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    region: "Asia",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
    description: "Ancient temples, zen gardens, and geisha districts in Japan's cultural heart.",
    rating: 4.8,
    reviews: 3201,
    price: "$1,899",
    tags: ["Culture", "Temples", "Gardens"],
    featured: true
  },
  {
    id: 3,
    name: "Maldives",
    region: "Asia",
    category: "Islands",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
    description: "Overwater bungalows, crystal lagoons, and pristine coral reefs in paradise.",
    rating: 5.0,
    reviews: 1923,
    price: "$3,499",
    tags: ["Luxury", "Beaches", "Diving"],
    featured: true
  },
  {
    id: 4,
    name: "Patagonia, Argentina",
    region: "Americas",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1535910038928-e4ea9b52c1fc?w=800&q=80",
    description: "Dramatic landscapes of glaciers, mountains, and untamed wilderness at the end of the world.",
    rating: 4.9,
    reviews: 1456,
    price: "$2,199",
    tags: ["Adventure", "Hiking", "Wildlife"],
    featured: false
  },
  {
    id: 5,
    name: "Marrakech, Morocco",
    region: "Africa",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1597212720158-014da2d97474?w=800&q=80",
    description: "Vibrant souks, riads, and the intoxicating sights and scents of North Africa.",
    rating: 4.7,
    reviews: 2103,
    price: "$899",
    tags: ["Culture", "Shopping", "History"],
    featured: false
  },
  {
    id: 6,
    name: "Amalfi Coast, Italy",
    region: "Europe",
    category: "Scenic",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
    description: "Dramatic cliffs, colorful fishing villages, and legendary cuisine on the Italian Riviera.",
    rating: 4.9,
    reviews: 2567,
    price: "$1,599",
    tags: ["Scenic", "Food", "Beaches"],
    featured: true
  },
  {
    id: 7,
    name: "Bali, Indonesia",
    region: "Asia",
    category: "Islands",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    description: "Lush rice terraces, ancient temples, surf breaks, and a deeply spiritual culture.",
    rating: 4.8,
    reviews: 4102,
    price: "$1,099",
    tags: ["Culture", "Beaches", "Wellness"],
    featured: false
  },
  {
    id: 8,
    name: "Icelandic Highlands",
    region: "Europe",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80",
    description: "Northern lights, geysers, volcanic landscapes, and the midnight sun.",
    rating: 4.9,
    reviews: 1789,
    price: "$2,499",
    tags: ["Adventure", "Northern Lights", "Nature"],
    featured: false
  }
];

export const packages = [
  {
    id: 1,
    name: "Mediterranean Romance",
    duration: "10 Days",
    category: "Romantic",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80",
    destinations: ["Santorini", "Amalfi Coast", "Positano"],
    description: "A curated journey through the most romantic destinations in the Mediterranean.",
    price: "$4,299",
    originalPrice: "$5,199",
    includes: ["5-Star Hotels", "Private Transfers", "Guided Tours", "Most Meals"],
    rating: 4.9,
    reviews: 312,
    tag: "Bestseller"
  },
  {
    id: 2,
    name: "Asian Odyssey",
    duration: "14 Days",
    category: "Cultural",
    difficulty: "Moderate",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    destinations: ["Tokyo", "Kyoto", "Bali", "Singapore"],
    description: "An immersive cultural journey through Asia's most iconic cities and hidden gems.",
    price: "$5,899",
    originalPrice: "$7,299",
    includes: ["Boutique Hotels", "All Flights", "Cultural Experiences", "Local Guides"],
    rating: 4.8,
    reviews: 247,
    tag: "Popular"
  },
  {
    id: 3,
    name: "Luxury Maldives Escape",
    duration: "7 Days",
    category: "Luxury",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    destinations: ["North Malé Atoll", "Baa Atoll"],
    description: "An all-inclusive overwater villa experience in paradise. Complete relaxation guaranteed.",
    price: "$6,499",
    originalPrice: "$8,299",
    includes: ["Overwater Villas", "All-Inclusive", "Seaplane Transfer", "Water Sports"],
    rating: 5.0,
    reviews: 189,
    tag: "Luxury"
  },
  {
    id: 4,
    name: "Patagonia Expedition",
    duration: "12 Days",
    category: "Adventure",
    difficulty: "Challenging",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    destinations: ["Torres del Paine", "El Calafate", "Ushuaia"],
    description: "Trek through breathtaking wilderness, glaciers, and the famous Torres del Paine circuit.",
    price: "$4,899",
    originalPrice: "$5,999",
    includes: ["Eco-Lodges", "Expert Guides", "All Equipment", "Domestic Flights"],
    rating: 4.9,
    reviews: 178,
    tag: "Adventure"
  },
  {
    id: 5,
    name: "Morocco Imperial Cities",
    duration: "8 Days",
    category: "Cultural",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80",
    destinations: ["Marrakech", "Fez", "Chefchaouen"],
    description: "Journey through Morocco's ancient imperial cities, medinas, and Sahara desert.",
    price: "$2,799",
    originalPrice: "$3,499",
    includes: ["Riad Accommodation", "Camel Trek", "Cooking Class", "Desert Camp"],
    rating: 4.8,
    reviews: 263,
    tag: "Value"
  },
  {
    id: 6,
    name: "Northern Lights Quest",
    duration: "6 Days",
    category: "Adventure",
    difficulty: "Moderate",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    destinations: ["Reykjavik", "Golden Circle", "Jökulsárlón"],
    description: "Chase the aurora borealis across Iceland's otherworldly volcanic landscapes.",
    price: "$3,299",
    originalPrice: "$3,999",
    includes: ["Guesthouses", "Northern Lights Tour", "Glacier Walk", "Hot Springs"],
    rating: 4.9,
    reviews: 201,
    tag: "Seasonal"
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "The Art of Slow Travel: Why Less Is More",
    category: "Travel Tips",
    author: "Sofia Renard",
    authorRole: "Chief Travel Editor",
    authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80",
    date: "March 12, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    excerpt: "In a world obsessed with ticking off destinations, we explore the transformative power of staying longer, going deeper, and truly connecting with the places you visit.",
    tags: ["Philosophy", "Mindful Travel"],
    featured: true
  },
  {
    id: 2,
    title: "Hidden Temples of Southeast Asia",
    category: "Destinations",
    author: "Marcus Chen",
    authorRole: "Asia Correspondent",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    date: "March 5, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5?w=800&q=80",
    excerpt: "Beyond Angkor Wat and Borobudur lie hundreds of forgotten temples waiting to be rediscovered. A guide to finding spiritual solitude off the beaten path.",
    tags: ["Culture", "Asia"],
    featured: true
  },
  {
    id: 3,
    title: "Michelin Stars at Altitude: Best Mountain Restaurants",
    category: "Food & Drink",
    author: "Elena Vasseur",
    authorRole: "Culinary Explorer",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    date: "Feb 28, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    excerpt: "The world's most breathtaking dining experiences aren't in city centers—they're perched on mountainsides with views that match the food.",
    tags: ["Food", "Luxury"],
    featured: false
  },
  {
    id: 4,
    title: "Packing Light for a Year Abroad",
    category: "Travel Tips",
    author: "James Okonkwo",
    authorRole: "Long-term Traveler",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    date: "Feb 20, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    excerpt: "After 12 years of continuous travel, I've refined my packing system to a single carry-on. Here's everything I've learned.",
    tags: ["Practical", "Minimalism"],
    featured: false
  },
  {
    id: 5,
    title: "The Vanishing Islands: Travel Before They're Gone",
    category: "Sustainability",
    author: "Layla Hassan",
    authorRole: "Environmental Correspondent",
    authorImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    date: "Feb 14, 2025",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&q=80",
    excerpt: "Rising sea levels threaten some of the world's most beautiful island destinations. A call to responsible travel—and urgent action.",
    tags: ["Climate", "Islands"],
    featured: true
  },
  {
    id: 6,
    title: "Night Markets of Taiwan: A Culinary Guide",
    category: "Food & Drink",
    author: "Marcus Chen",
    authorRole: "Asia Correspondent",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    date: "Feb 8, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    excerpt: "From stinky tofu to bubble tea origins, Taiwan's night markets are a world unto themselves. A first-timer's complete guide.",
    tags: ["Food", "Asia"],
    featured: false
  }
];

export const team = [
  {
    name: "Alexandra Winters",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Former diplomat with 20 years of travel experience across 94 countries. Alexandra founded WanderLux to redefine what luxury travel means.",
    instagram: "#", linkedin: "#"
  },
  {
    name: "Rafael Montoya",
    role: "Head of Experiences",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio: "Culinary anthropologist and adventure guide who curates our most extraordinary on-the-ground experiences.",
    instagram: "#", linkedin: "#"
  },
  {
    name: "Yuki Tanaka",
    role: "Asia Specialist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "Born in Tokyo, raised between Kyoto and Singapore. Yuki is our resident expert on everything Asia.",
    instagram: "#", linkedin: "#"
  },
  {
    name: "Isabelle Fontaine",
    role: "Luxury Travel Designer",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    bio: "Former concierge at Paris's most exclusive hotels, Isabelle crafts flawless luxury itineraries for the most discerning travelers.",
    instagram: "#", linkedin: "#"
  }
];

export const testimonials = [
  {
    name: "Victoria & James Hartwell",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&q=80",
    text: "Our Maldives honeymoon was beyond anything we could have imagined. Every detail was perfect — from the seaplane arrival to the goodbye champagne. WanderLux didn't just plan a trip; they created memories we'll carry forever.",
    trip: "Luxury Maldives Escape",
    rating: 5
  },
  {
    name: "Michael Oduya",
    location: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    text: "The Asian Odyssey exceeded every expectation. What impressed me most was the local knowledge — hidden tea houses in Kyoto, a private cooking class in Bali. This wasn't tourism, it was discovery.",
    trip: "Asian Odyssey",
    rating: 5
  },
  {
    name: "Claire Beaumont",
    location: "Montreal, Canada",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    text: "Solo travel had always intimidated me, until WanderLux changed everything. The Morocco journey gave me the perfect balance of guided comfort and genuine independence. I've never felt so alive.",
    trip: "Morocco Imperial Cities",
    rating: 5
  }
];
