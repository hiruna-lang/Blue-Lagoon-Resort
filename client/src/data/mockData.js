export const mockRooms = [
  {
    _id: '1',
    roomName: 'Ocean Breeze Suite',
    roomType: 'Suite',
    price: 280,
    description: 'A spacious suite with panoramic sea views, a private lounge, and a calming coastal palette.',
    facilities: ['King Bed', 'Ocean View', 'Mini Bar', 'Wi-Fi'],
    maxGuests: 3,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    available: true
  },
  {
    _id: '2',
    roomName: 'Lagoon Deluxe Room',
    roomType: 'Deluxe',
    price: 190,
    description: 'Elegant room design with a private balcony and effortless access to the lagoon pool.',
    facilities: ['Balcony', 'Air Conditioning', 'Smart TV', 'Coffee Set'],
    maxGuests: 2,
    image:
      'https://images.unsplash.com/photo-1501117716987-c8e2a3c8f1b7?auto=format&fit=crop&w=1200&q=80',
    available: true
  },
  {
    _id: '3',
    roomName: 'Sunset Family Villa',
    roomType: 'Villa',
    price: 420,
    description: 'A private villa designed for families, featuring two bedrooms and a sunset terrace.',
    facilities: ['2 Bedrooms', 'Private Terrace', 'Kitchenette', 'Pool Access'],
    maxGuests: 5,
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    available: true
  }
];

export const mockFacilities = [
  {
    title: 'Infinity Pool',
    description: 'Relax by the lagoon-style infinity pool with a clear ocean horizon.',
    icon: 'pool'
  },
  {
    title: 'Private Beach',
    description: 'Enjoy a pristine shoreline reserved for guests of the resort.',
    icon: 'beach'
  },
  {
    title: 'Spa & Wellness',
    description: 'Rejuvenate with signature treatments and oceanfront yoga sessions.',
    icon: 'spa'
  },
  {
    title: 'Fine Dining',
    description: 'Taste coastal cuisine and crafted cocktails in our signature restaurant.',
    icon: 'dining'
  }
];

export const mockGallery = [
  {
    _id: 'g1',
    title: 'Blue Horizon',
    category: 'Views',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    _id: 'g2',
    title: 'Poolside Calm',
    category: 'Relaxation',
    image:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    _id: 'g3',
    title: 'Ocean Dining',
    category: 'Dining',
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
  }
];

export const mockReviews = [
  {
    name: 'Ava Thompson',
    role: 'Family Traveler',
    review: 'The service was exceptional, and the beach-facing suite felt like a dream.',
    rating: 5
  },
  {
    name: 'Daniel Cruz',
    role: 'Couples Retreat',
    review: 'Perfect for a quiet escape. The sunset views and dining were unforgettable.',
    rating: 5
  },
  {
    name: 'Maya Patel',
    role: 'Weekend Guest',
    review: 'Beautiful interiors, seamless booking, and very responsive staff throughout.',
    rating: 4
  }
];

export const resortHighlights = [
  { value: '120+', label: 'Luxury Rooms' },
  { value: '8', label: 'Resort Facilities' },
  { value: '24/7', label: 'Guest Support' },
  { value: '98%', label: 'Guest Satisfaction' }
];
