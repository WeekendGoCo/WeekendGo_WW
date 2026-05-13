import { NextRequest, NextResponse } from 'next/server';

// Mock data - Replace with real API calls (Booking.com, WebBeds, Local DB)
const mockLocations = [
  // Cities
  { id: 'city_dubai', name: 'Dubai', type: 'City', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300', rating: 4.8 },
  { id: 'city_istanbul', name: 'Istanbul', type: 'City', country: 'Turkey', image: 'https://images.unsplash.com/photo-1541961017774-22e08e888e4d?w=300', rating: 4.7 },
  { id: 'city_paris', name: 'Paris', type: 'City', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300', rating: 4.9 },
  { id: 'city_maldives', name: 'Maldives', type: 'Country', country: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=300', rating: 4.9 },
  { id: 'city_bali', name: 'Bali', type: 'City', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537225228614-56cc30651b8e?w=300', rating: 4.8 },
  { id: 'city_tokyo', name: 'Tokyo', type: 'City', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9c1?w=300', rating: 4.8 },
  { id: 'city_london', name: 'London', type: 'City', country: 'UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300', rating: 4.7 },
  { id: 'city_newyork', name: 'New York', type: 'City', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300', rating: 4.8 },
  { id: 'city_santorini', name: 'Santorini', type: 'City', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300', rating: 4.9 },
  { id: 'city_miami', name: 'Miami', type: 'City', country: 'USA', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300', rating: 4.6 },
  
  // Hotels (samples)
  { id: 'hotel_burjalarab', name: 'Burj Al Arab - Dubai', type: 'Hotel', country: 'UAE', image: 'https://images.unsplash.com/photo-1543541338-794f5c6346b0?w=300', rating: 5.0 },
  { id: 'hotel_ritz', name: 'Ritz Carlton - Paris', type: 'Hotel', country: 'France', image: 'https://images.unsplash.com/photo-1521224519398-fdd2ba67dc6e?w=300', rating: 4.9 },
  { id: 'hotel_fourseasons', name: 'Four Seasons - Istanbul', type: 'Hotel', country: 'Turkey', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300', rating: 4.8 },
];

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('query')?.toLowerCase() || '';

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    // Filter locations based on query
    const results = mockLocations
      .filter(location => 
        location.name.toLowerCase().includes(query) ||
        location.country.toLowerCase().includes(query)
      )
      .sort((a, b) => {
        // Prioritize exact matches
        const aMatch = a.name.toLowerCase().startsWith(query) ? 1 : 0;
        const bMatch = b.name.toLowerCase().startsWith(query) ? 1 : 0;
        return bMatch - aMatch;
      })
      .slice(0, 8); // Limit to 8 results

    // Add slight delay to simulate API call (remove in production)
    await new Promise(resolve => setTimeout(resolve, 150));

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
