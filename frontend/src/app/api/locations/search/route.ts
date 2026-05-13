import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${encodeURIComponent(query)}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        'x-rapidapi-host': process.env.RAPIDAPI_HOST || ''
      }
    };

    const response = await fetch(url, options);
    const result = await response.json();

    if (result.status && result.data) {
      // Transforming the data to a uniform format
      const suggestions = result.data.map((item: any) => ({
        id: item.dest_id,
        name: item.label,
        type: item.dest_type,
        cityName: item.city_name,
        country: item.country,
        searchType: item.search_type
      }));
      return NextResponse.json(suggestions);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error("Location Search Error:", error);
    return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 });
  }
}
