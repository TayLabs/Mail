import env from './types/env';
import app from './app';

const port = env.PORT || 7212;
const server = app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

// Gracefully shutdown server
process.on('SIGTERM', async () => {
  await server.close();
  process.exit(0);
});
