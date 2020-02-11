const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError('Could Not find place for the provided place ID', 404);
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter(u => {
    return u.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could Not find Places for the provided User ID', 404)
    );
  }
  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { creator, title, description, coordinates, address } = req.body;

  const createPlace = {
    id: uuid(),
    title,
    address,
    description,
    creator,
    location: coordinates
  };

  DUMMY_PLACES.push(createPlace);

  res.status(201).json({ place: createPlace });
};

const updataPlace = (req, res, next) => {
  const { title, description } = req.body;

  const placeId = req.params.pid;

  const updataPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };

  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);

  updataPlace.title = title;
  updataPlace.description = description;

  DUMMY_PLACES[placeIndex] = updataPlace;

  res.status(200).json({ place: updataPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);

  res.status(200).json({ message: 'Deleted place' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updataPlace = updataPlace;
exports.deletePlace = deletePlace;
