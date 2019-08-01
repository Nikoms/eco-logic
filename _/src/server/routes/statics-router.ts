import * as path from 'path';
import * as express from 'express';
import { Router } from 'express';
import { IS_DEV, WEBPACK_PORT } from '../config';

export function staticsRouter() {
  const router = Router();

  if (IS_DEV) {
    const proxy = require('http-proxy-middleware');
    // All the assets are hosted by Webpack on localhost:${config.WEBPACK_PORT} (Webpack-dev-server)
    router.use(
      '/statics',
      proxy({
        target: `http://localhost:${WEBPACK_PORT}/`,
      }),
    );
  } else {
    const staticsPath = path.join(process.cwd(), 'dist', 'statics');

    // All the assets are in "statics" folder (Done by Webpack during the build phase)
    router.use('/statics', express.static(staticsPath));
  }
  return router;
}
