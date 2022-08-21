import jwt from 'jsonwebtoken';

const signToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({
          message: 'Token is not valid',
        });
      } else {
        // rootlara parametre olarak user ekledi ve bunu req.user olarak kullanabiliriz.
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: 'Token is not valid',
    });
  }
};

export { signToken, isAuth };
