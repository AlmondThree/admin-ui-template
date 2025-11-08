  // middleware.ts
    import { middlewareChain } from './middlewares/middlewareChain';
    import { authHandler } from './middlewares/authHandler'
    import { logsHandler } from './middlewares/logsHandler';

    export default middlewareChain([logsHandler, authHandler]);

    export const config = {
      matcher: ['/((?!unauthorized|not-found|images/*|_next/static|_next/image|favicon.ico).*)'], // Apply middleware to all paths except static assets
    };