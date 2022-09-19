import httpClient from "../http-common1";
let jwt = localStorage.getItem("jwt");

const auth = (data) => {
  const p = httpClient.post("security/authenticate", data);
  return p;
};
const getUser = (username) => {
  return httpClient.get(`security/user/getbyusername/${username}`,
   {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }
  );
};
const logout = () => {
  localStorage.removeItem(jwt);
};

// const getAdmin = (username) => {
//   return httpClient.get(`security/admin/getbyusername/${username}`, {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     }
//   });
// };

export default { auth, getUser,logout };