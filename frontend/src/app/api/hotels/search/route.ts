import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { destination, destId, checkIn, checkOut, guests } = await request.json();

    // Default dates if not provided (for demonstration)
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + 7);
    
    const cin = checkIn || today.toISOString().split('T')[0];
    const cout = checkOut || future.toISOString().split('T')[0];

    let targetDestId = destId;

    // 1. If no destId, fetch it first
    if (!targetDestId && destination) {
      const locRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/locations/search?query=${encodeURIComponent(destination)}`);
      const locData = await locRes.json();
      if (locData && locData.length > 0) {
        targetDestId = locData[0].id;
      }
    }

    if (!targetDestId) {
      return NextResponse.json({ success: false, message: "Destination not found" }, { status: 404 });
    }

    // 2. Fetch Hotels from Booking.com (Taxonomy & Content)
    const bookingUrl = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${targetDestId}&search_type=city&arrival_date=${cin}&departure_date=${cout}&adults_number=${guests || 2}&units=metric&room_number=1`;
    
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        'x-rapidapi-host': process.env.RAPIDAPI_HOST || ''
      }
    };

    const bookingRes = await fetch(bookingUrl, options);
    const bookingResult = await bookingRes.json();

    if (!bookingResult.status || !bookingResult.data?.hotels) {
      return NextResponse.json({ success: false, message: "Failed to fetch hotels from provider" }, { status: 500 });
    }

    // 3. Transform & Merge with "Webbeds" Logic
    // In a real scenario, we'd call Webbeds API here. 
    // The user mentioned: Webbeds price < Booking price, then add profit.
    
    const transformedHotels = bookingResult.data.hotels.map((hotel: any) => {
      const bookingPrice = hotel.property?.priceBreakdown?.grossAmount?.value || 500;
      
      // Simulating Webbeds: Typically 15-20% lower than retail (Booking.com)
      const webbedsWholesalePrice = bookingPrice * 0.85; 
      
      // Adding Weekend Go Profit (e.g., 5%)
      const finalPrice = Math.round(webbedsWholesalePrice * 1.05);

      return {
        id: hotel.hotel_id,
        name: hotel.property?.name,
        location: hotel.property?.wishlistName || destination,
        image: hotel.property?.photoUrls?.[0]?.replace('square60', 'max1280x900') || '/dest-dubai.png',
        rating: hotel.property?.reviewScore || 4.5,
        reviews: hotel.property?.reviewCount || 120,
        price: finalPrice,
        originalPrice: bookingPrice,
        isExclusive: hotel.property?.reviewScore > 8.5, // Simulate exclusive status for high rated hotels
        amenities: ['Wifi', 'Pool', 'Breakfast'] // Booking search usually doesn't return full amenities, would need hotelDetails call
      };
    });

    return NextResponse.json({
      success: true,
      count: transformedHotels.length,
      data: transformedHotels
    });

  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
