import axios from "axios";

export default function getInfo (setState) {

  const url = 'http://localhost:8080';
  const options = {
    headers: {
      'authorization': localStorage.getItem("token")
    }
  }

  Promise.all([
    axios.get(`${url}/api/getUsers`, options),
    axios.get(`${url}/api/getPosts`, options),
    axios.get(`${url}/api/getComments`, options)
  ]).then((all) => {
    setState((prev) => ({
      ...prev,
      users: all[0].data,
      posts: all[1].data,
      comments: all[2].data,
      isLoggedIn: true,
    }));
  });
};