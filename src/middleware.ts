  // middleware.ts
    import { middlewareChain } from './middlewares/middlewareChain';
    import { authHandler } from './middlewares/authHandler'

    export default middlewareChain([authHandler]);

    export const config = {
      matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Apply middleware to all paths except static assets
    };