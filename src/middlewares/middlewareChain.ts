import { NextRequest, NextResponse } from 'next/server';

export function middlewareChain(middlewares: Function[]) {
  return async (request: NextRequest) => {
    let response = NextResponse.next();
    for (const middleware of middlewares) {
      const result = await middleware(request, (req: NextRequest) => response);
      if (result instanceof NextResponse) {
        response = result;
        if (response.headers.get('x-middleware-rewrite') || response.headers.get('x-middleware-redirect')) {
          // If a rewrite or redirect occurred, stop the chain
          return response;
        }
      }
    }
    return response;
  };
}