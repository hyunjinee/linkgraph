import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}
// const allowedOrigins =
//   process.env.NODE_ENV === 'production' ? ['https://linkgraph-admin.vercel.app/'] : ['http://localhost:3000'];

// export const middleware = (request: Request) => {
//   const origin = request.headers.get('origin');

//   if (origin && !allowedOrigins.includes(origin)) {
//     return new NextResponse(null, {
//       status: 400,
//       statusText: 'Bad Request',
//       headers: {
//         'Content-Type': 'text/plain',
//       },
//     });
//   }

//   // const regex = new RegExp('/api/*');
//   // if (regex.test(request.url)) {
//   // }

//   // console.log('Middleware Run');
//   // console.log(request.method);
//   // console.log(request.url);

//   // console.log(origin);

//   return NextResponse.next();
// };

// export const config = {
//   matcher: '/api/:path*',
// };

// export const middleware = () => {
//   return NextResponse.next();
// };
