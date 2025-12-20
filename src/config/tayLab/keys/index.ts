import { config } from '@taylabs/keys-express';

const { authenticateKey } = config({
	baseUrl: 'http://localhost:7212',
	serviceName: 'mail',
});

export { authenticateKey };
