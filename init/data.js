const sampleListings = [
  {
    title: 'My homeVilla',
    description: 'by the beach',
    image: {
      url: 'https://images.unsplash.com/photo-1722551988333-f8bdb7394553?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1200,
    location: 'Bangalore',
    country: 'India'
  },
  {
    title: 'Seaside Paradise',
    description: 'Oceanfront villa with scenic views',
    image: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2000,
    location: 'Goa',
    country: 'India'
  },
  {
    title: 'Mountain Cabin',
    description: 'Rustic cabin nestled in the mountains',
    image: {
      url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1800,
    location: 'Manali',
    country: 'India'
  },
  {
    title: 'City Lights Apartment',
    description: 'Modern apartment with city views',
    image: {
      url: 'https://images.unsplash.com/photo-1614162887536-589cbcd2a1cd?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2500,
    location: 'Mumbai',
    country: 'India'
  },
  {
    title: 'Luxury Villa Retreat',
    description: 'Private villa with pool and garden',
    image: {
      url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 3200,
    location: 'Udaipur',
    country: 'India'
  },
  {
    title: 'Countryside Farmhouse',
    description: 'Relax in the open fields and fresh air',
    image: {
      url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1500,
    location: 'Punjab',
    country: 'India'
  },
  {
    title: 'Hilltop Mansion',
    description: 'Breathtaking views from a luxury mansion',
    image: {
      url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 5000,
    location: 'Shimla',
    country: 'India'
  },
  {
    title: 'Lakeview Cottage',
    description: 'Peaceful cottage near the lake',
    image: {
      url: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b9629?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1700,
    location: 'Nainital',
    country: 'India'
  },
  {
    title: 'Desert Camp',
    description: 'Stay in luxury tents under the stars',
    image: {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1400,
    location: 'Jaisalmer',
    country: 'India'
  },
  {
    title: 'Tropical Beach House',
    description: 'Steps away from the sandy beach',
    image: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2100,
    location: 'Kerala',
    country: 'India'
  },
  {
    title: 'Modern Loft',
    description: 'Chic loft in the city center',
    image: {
      url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2600,
    location: 'Delhi',
    country: 'India'
  },
  {
    title: 'Jungle Retreat',
    description: 'Stay in a treehouse surrounded by wildlife',
    image: {
      url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2200,
    location: 'Jim Corbett',
    country: 'India'
  },
  {
    title: 'Royal Palace Stay',
    description: 'Experience heritage in a royal palace',
    image: {
      url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 3500,
    location: 'Jaipur',
    country: 'India'
  },
  {
    title: 'Island Hut',
    description: 'Beach hut on a private island',
    image: {
      url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 4000,
    location: 'Andaman',
    country: 'India'
  },
  {
    title: 'Skyline Condo',
    description: 'Condo with spectacular skyline view',
    image: {
      url: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b9629?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2800,
    location: 'Kolkata',
    country: 'India'
  },
  {
    title: 'Forest Escape',
    description: 'A peaceful stay surrounded by tall trees',
    image: {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1400,
    location: 'Coorg',
    country: 'India'
  },
  {
    title: 'Skyline Apartment',
    description: 'Modern living with a panoramic view',
    image: {
      url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2100,
    location: 'Mumbai',
    country: 'India'
  },
  {
    title: 'Heritage Palace Stay',
    description: 'Experience royal living in Jaipur',
    image: {
      url: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2600,
    location: 'Jaipur',
    country: 'India'
  },
  {
    title: 'Lake View Resort',
    description: 'Tranquil stay with beautiful lake view',
    image: {
      url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1800,
    location: 'Nainital',
    country: 'India'
  },
  {
    title: 'Riverside Cabin',
    description: 'Cosy wooden cabin by the river',
    image: {
      url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1250,
    location: 'Rishikesh',
    country: 'India'
  },
  {
    title: 'Luxury Business Hotel',
    description: 'Perfect for business travellers',
    image: {
      url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 4000,
    location: 'Gurgaon',
    country: 'India'
  },
  {
    title: 'Hilltop Bungalow',
    description: 'Private bungalow with stunning valley view',
    image: {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2300,
    location: 'Munnar',
    country: 'India'
  },
  {
    title: 'Garden Villa',
    description: 'Beautiful villa with a private garden',
    image: {
      url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1700,
    location: 'Pune',
    country: 'India'
  },
  {
    title: 'Countryside Farmhouse',
    description: 'Perfect weekend retreat in the countryside',
    image: {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1450,
    location: 'Ahmedabad',
    country: 'India'
  },
  {
    title: 'Cliffside Stay',
    description: 'Stay above the clouds with mesmerizing views',
    image: {
      url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2800,
    location: 'Darjeeling',
    country: 'India'
  },
  {
    title: 'City Hostel',
    description: 'Affordable stay with modern amenities',
    image: {
      url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 600,
    location: 'Delhi',
    country: 'India'
  },
  {
    title: 'Desert Camp',
    description: 'Luxury tents in the middle of the desert',
    image: {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1900,
    location: 'Jaisalmer',
    country: 'India'
  },
  {
    title: 'Eco Treehouse',
    description: 'Stay in a sustainable eco-friendly treehouse',
    image: {
      url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2100,
    location: 'Kerala',
    country: 'India'
  },
  {
    title: 'Coastal Retreat',
    description: 'Perfect for a beachside holiday',
    image: {
      url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1600,
    location: 'Goa',
    country: 'India'
  },
  {
    title: 'Royal Haveli',
    description: 'Stay like royalty in Rajasthan',
    image: {
      url: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 3000,
    location: 'Udaipur',
    country: 'India'
  },
  {
    title: 'Backwater Houseboat',
    description: 'Unique stay on Kerala backwaters',
    image: {
      url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 3500,
    location: 'Alleppey',
    country: 'India'
  },
  {
    title: 'Studio Apartment',
    description: 'Compact and stylish apartment',
    image: {
      url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1200,
    location: 'Hyderabad',
    country: 'India'
  },
  {
    title: 'Island Hut',
    description: 'Secluded hut perfect for a quiet getaway',
    image: {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 1350,
    location: 'Andaman',
    country: 'India'
  },
  {
    title: 'Mountain Lodge',
    description: 'Cozy lodge surrounded by mountains',
    image: {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2200,
    location: 'Shimla',
    country: 'India'
  },
  {
    title: 'Boutique Stay',
    description: 'Unique interiors with luxury comfort',
    image: {
      url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=60',
      filename: 'listingimage'
    },
    price: 2500,
    location: 'Chennai',
    country: 'India'
  }
];

module.exports = { data: sampleListings };

