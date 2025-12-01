import env from './types/env';
import app from './app';

const port = env.PORT || 7212;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
