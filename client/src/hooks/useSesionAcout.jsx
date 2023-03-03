const setSessionAcount = ({ mail, token }) => {
  sessionStorage.setItem('LogedUser', JSON.stringify(mail, token));
};

const getSessionAcount = () => {
  const user = sessionStorage.getItem('LogedUser');
  return JSON.parse(user);
};

const removeSessionAcount = () => {
  sessionStorage.removeItem('LogedUser');
};

export default () => {
  return {
    setSessionAcount: (mail, token) => setSessionAcount({ mail, token }),
    getSessionAcount,
    removeSessionAcount,
  };
};
