import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Proxy request body:', body);
    
    const response = await fetch('https://pool.swypt.io/api/merchant-onramp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://geckhoboymerch.vercel.app'
      },
      body: JSON.stringify(body),
    });

    console.log('Swypt API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Swypt API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      return NextResponse.json(
        { error: 'Failed to process payment request', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Swypt API response data:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error ? error.stack : '';
    
    return NextResponse.json(
      { 
        error: 'Failed to process payment request',
        message: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    );
  }
} 