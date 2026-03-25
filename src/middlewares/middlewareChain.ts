import { NextRequest, NextResponse } from 'next/server';

export type MiddlewareFunction = (
  request: NextRequest,
  getResponse: () => NextResponse
) => 
  | NextResponse 
  | Promise<NextResponse> 
  | void 
  | Promise<void>
  | Promise<NextResponse | void>;

export function middlewareChain(middlewares: MiddlewareFunction[]) {
  return async (request: NextRequest) => {
    let response = NextResponse.next();

    for (const middleware of middlewares) {
      const result = await middleware(request, () => response);

      if (result instanceof NextResponse) {
        response = result;

        if (
          response.headers.get('x-middleware-rewrite') || 
          response.headers.get('x-middleware-redirect')
        ) {
          return response;
        }
      }
    }

    return response;
  };
}