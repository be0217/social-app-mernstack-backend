const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

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

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid Input Passed please check the value', 422)
    );
  }
  const { name, email, password, places } = req.body;

  const hasUser = DUMMY_USER.find(user => user.email === email);

  if (hasUser) {
    throw new HttpError('User is already exits', 422);
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      'Singing Failed please try again later, Or check the details',
      500
    );

    return next(error);
  }
  if (existingUser) {
    const error = new HttpError('User Exist already, Please login', 422);
    return next(error);
  }

  const createUser = new User({
    name,
    email,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    password,
    places
  });

  try {
    await createUser.save();
  } catch (err) {
    const error = new HttpError('Singing Up user failed, Try again later');
    return next(error);
  }

  res.status(201).json({ users: createUser.toObject({ getters: true }) });
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
