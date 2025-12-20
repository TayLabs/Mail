import { config } from '@taylabs/keys-express';

const { authenticateKey } = config({
	baseUrl: 'http://localhost:7212',
	serviceName: 'mail',
	apiKeyHeader: 'x-api-key',
});

export { authenticateKey };
