import axios from 'axios';
const Axios = axios.create({ baseURL: 'http://localhost:3001' });

const typeOfDataToRender = (
  type,
  id,
  setArrayToRender,
  setdeleteFeedbackIcon
) => {
  switch (type) {
    case 'userService':
      Axios.get(`/service/user/${id}`).then((res) => {
        res.data.forEach((obj) => (obj.User = false));
        setArrayToRender(res.data);
      });
      break;
    case 'donation':
      Promise.all([
        id[0] === 'all'
          ? Axios.get('/donation')
          : Axios.get(`/donation/user/${id[0]}`),
        id[1] === 'all'
          ? Axios.get('/donation')
          : Axios.get(`/donation/vdv/${id[1]}`),
      ]).then(([res1, res2]) => {
        const render = [res1.data, res2.data];
        const toRender = render[0].filter((obj1) =>
          render[1].some((obj2) => obj2.id === obj1.id)
        );
        setdeleteFeedbackIcon(true);
        setArrayToRender(toRender);
      });
      break;
    case 'feedback':
      Promise.all([
        id[0] === 'all'
          ? Axios.get('/feedback')
          : Axios.get(`/feedback/user/${id[0]}`),
        id[1] === 'all'
          ? Axios.get('/feedback')
          : Axios.get(`/feedback/vdv/${id[1]}`),
      ]).then(([res1, res2]) => {
        const render = [res1.data, res2.data];
        const toRender = render[0].filter((obj1) =>
          render[1].some((obj2) => obj2.id === obj1.id)
        );
        setdeleteFeedbackIcon(true);
        setArrayToRender(toRender);
      });

      break;
    case 'allServices':
      Axios.get(`/service`).then((res) => {
        res.data.forEach((obj) => (obj.VdV = false));
        setArrayToRender(res.data);
      });
      break;
  }
};

export default typeOfDataToRender;
