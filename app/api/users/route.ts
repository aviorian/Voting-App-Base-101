import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fid = searchParams.get('fid');

  if (!fid) {
    return NextResponse.json({ error: 'FID is required' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_NEYNAR_API_KEY; // Or just NEYNAR_API_KEY if you move it to server-only env
  
  if (!apiKey) {
    return NextResponse.json({ error: 'Server configuration error: API Key missing' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
      {
        headers: {
          accept: 'application/json',
          api_key: apiKey,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Neynar API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
