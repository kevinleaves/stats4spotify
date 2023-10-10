import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export default withAuth(
  function middleware(request: NextRequest) {
    if (!request.nextauth.token) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    } else {
      // move onto next subsequent middleware layers
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        /**
         * if this returns false, user will not be authorized regardless if they have a valid token
         */
        // console.log(token, 'token in authorized');
        return !!token?.accessToken;
      },
    },
  }
);
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/artists/top:path*', '/tracks/top/:path*'],
};
