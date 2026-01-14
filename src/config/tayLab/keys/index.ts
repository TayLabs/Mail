import env from '@/types/env';
import { config } from '@taylabs/keys-express';

const { authenticateKey } = config({
  baseUrl: env.KEY_SERVICE_BASE_URL,
  serviceName: env.SERVICE_NAME,
});

export { authenticateKey };
