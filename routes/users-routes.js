// const express = require('express')

// const user = express.Router()

// const USERS = [
//   {
//     id: 'u1',
//     name: 'Ankit Sharma',
//     image:
//       'https://scontent.fhyd6-1.fna.fbcdn.net/v/t1.0-9/s960x960/37395355_999801846866030_2041513606373179392_o.jpg?_nc_cat=101&_nc_ohc=PSyz6lqP07cAQn0ebPXkHZ2IQN2SaBrzyatARWgNre79UoKXBhjNuUs0w&_nc_ht=scontent.fhyd6-1.fna&oh=e3c0e38e5114365bbe674263caea99f7&oe=5E6967D8',
//     places: 3
//   },
//   {
//     id: 'u2',
//     name: 'Amit Sharma',
//     image:
//       'https://scontent.fhyd6-1.fna.fbcdn.net/v/t1.0-9/s960x960/37395355_999801846866030_2041513606373179392_o.jpg?_nc_cat=101&_nc_ohc=PSyz6lqP07cAQn0ebPXkHZ2IQN2SaBrzyatARWgNre79UoKXBhjNuUs0w&_nc_ht=scontent.fhyd6-1.fna&oh=e3c0e38e5114365bbe674263caea99f7&oe=5E6967D8',
//     places: 3
//   }
// ]

// user.get('/:uid', (req, res, next) => {
//   const userId = req.params.userId

//   const user = USERS.find(u => {
//     return u.id === userId
//   })

//   res.json({ user })
// })

// module.exports = user
