import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import config from '../../../utils/config';
import { signToken } from '../../../utils/auth';
import client from '../../../utils/client';
// https://www.sanity.io/docs/js-client
const handler = nc();

async function alreayExists(email) {
  let response = await client.fetch(`*[_type == "users" && email == $email]`, {
    email,
  });

  return response;
}

handler.post(async (req, res) => {
  let emailExists = await alreayExists(req.body.email);

  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: 'Please fill out all fields',
    });
  }
  if (emailExists.length > 0) {
    res.status(400).send('Email already exists');
  }

  //   client
  //     .delete(
  //       { query: '*[_type == "users"][0..100]' },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${process.env.SANITY_AUTH_TOKEN}`,
  //         },
  //       }
  //     )
  //     .then(() => {
  //       res.send('Deleted all users');
  //     })
  //     .catch((err) => {
  //       res.send(err);
  //     });

  try {
    const projectId = config.projectId;
    const dataset = config.dataset;

    const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;

    const createMutations = [
      {
        create: {
          _type: 'users',
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          isAdmin: false,
        },
      },
    ];

    const { data } = await axios.post(
      `https://${config.projectID}.api.sanity.io/v2021-06-07/data/mutate/${config.dataset}?returnIds=true`,
      {
        mutations: createMutations,
      },
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${tokenWithWriteAccess}`,
        },
      }
    );

    const userId = data.results[0]._id;

    const user = {
      _id: userId,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: false,
    };

    const token = signToken(user);

    res.send({ ...user, token });
  } catch (e) {
    res.send(e);
  }
});

export default handler;
