

import app from './app';
import config from './core/config';

export const server = app.listen(config.env_port, () => {
  console.log(`Server started at http://${config.host}:${config.env_port}. Environment: ${config.environment}`);
});