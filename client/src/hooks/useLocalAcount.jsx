const setLocalAcount = ({ mail, token }) => {
  localStorage.setItem('LogedUser', JSON.stringify(mail, token));
};

const getLocalAcount = () => {
  const user = localStorage.getItem('LogedUser');
  return JSON.parse(user);
};

const removeLocalAcount = () => {
  localStorage.removeItem('LogedUser');
};

export default () => {
  return {
    setLocalAcount: (mail, token) => setLocalAcount({ mail, token }),
    getLocalAcount,
    removeLocalAcount,
  };
};
