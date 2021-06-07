const posts = function() {
  const posts = {
    1: {
      posterId: 1,
      content: 'this is a test post',
      comments: 12,
    },
    2: {
      posterId: 2,
      content: 'this is a post from angie',
      comments: 2,
    },
    3: {
      posterId: 1,
      content: 'this post is from josh',
      comments: 3,
    }
  }

  return posts;
}();

module.exports = { posts };