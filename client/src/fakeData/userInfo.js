const users = function() {
  return {
    1: {
      name: 'josh',
      age: '24',
      email: 'josh@gmail.com',
      username: 'jbawt',
      notifications: 10,
      messages: 5
    },
    2: {
      name: 'angie',
      age: '25',
      email: 'angie@gmail.com',
      username: 'angie101',
      notifications: 13,
      messages: 9
    }
  }
}();

module.exports = { users }