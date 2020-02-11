const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

const DUMMY_USER = [
  {
    id: 'u1',
    name: 'ANkit Sharma',
    email: 'ankit@ankit.com',
    password: 'ankit'
  }
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USER });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USER.find(user => user.email === email);

  if (hasUser) {
    throw new HttpError('User is already exits', 422);
  }

  const createUser = {
    id: uuid(),
    name,
    email,
    password
  };

  DUMMY_USER.push(createUser);

  res.status(201).json({ users: createUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifyUser = DUMMY_USER.find(user => user.email === email);

  if (!identifyUser || identifyUser.password !== password) {
    throw new HttpError('CouldNot find the user fo the given email', 401);
  }

  res.json({ message: 'Logged In!!!' });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
