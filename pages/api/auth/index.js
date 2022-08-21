import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';

const handler = nc();

handler.use(isAuth);

handler.get(async (req, res) => {
  res.json({
    message: 'You are authenticated',
  });
});

export default handler;
