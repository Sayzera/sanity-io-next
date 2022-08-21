import nc from 'next-connect';
import client from '../../../utils/client';

const handler = nc();

handler.get(async (req, res) => {
  const { id } = req.query;

  const product = await client.fetch(`*[_type == "product" && _id == $id][0]`, {
    id,
  });

  res.send(product);
});

export default handler;
