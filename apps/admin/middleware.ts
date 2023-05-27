import { NextResponse } from 'next/server';

const allowedOrigins =
  process.env.NODE_ENV === 'production' ? ['https://linkgraph-admin.vercel.app/'] : ['http://localhost:3000'];

export const middleware = (request: Request) => {
  const origin = request.headers.get('origin');

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // const regex = new RegExp('/api/*');
  // if (regex.test(request.url)) {
  // }

  // console.log('Middleware Run');
  // console.log(request.method);
  // console.log(request.url);

  // console.log(origin);

  return NextResponse.next();
};

export const config = {
  matcher: '/api/:path*',
};
