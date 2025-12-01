import env from '@/types/env';
import { MailtrapClient } from 'mailtrap';

// Init Mailtrap client depending on your needs
const mailtrap = new MailtrapClient({
  token: env.MAILTRAP_API_KEY,
  bulk: false,
  sandbox: false,
  testInboxId: undefined,
});

export default mailtrap;
