import axios from 'axios';
const Axios = axios.create({ baseURL: 'http://localhost:3001' });

const typeOfDataToRender = (
  type,
  id,
  setArrayToRender,
  setdeleteFeedbackIcon
) => {
  switch (type) {
    case 'userDonation':
      Axios.get(`/donation/user/${id}`).then((res) => {
        res.data.forEach((obj) => (obj.User = false));
        setArrayToRender(res.data);
      });
      break;
    case 'userService':
      Axios.get(`/service/user/${id}`).then((res) => {
        res.data.forEach((obj) => (obj.User = false));
        setArrayToRender(res.data);
      });
      break;
    case 'entityDonation':
      Axios.get(`/donation/vdv/${id}`).then((res) => {
        res.data.forEach((obj) => (obj.VdV = false));
        setArrayToRender(res.data);
      });
      break;
    case 'donation':
      Axios.get(`/donation`).then((res) => {
        res.data.forEach((obj) => (obj.VdV = false));
        setArrayToRender(res.data);
      });
      break;
    case 'userDonation':
      Axios.get(`/donation/user/${id}`).then((res) => {
        setdeleteFeedbackIcon(true);
        setArrayToRender(res.data);
      });
      break;
    case 'vdvDonation':
      Axios.get(`/donation/vdv/${id}`).then((res) => {
        setdeleteFeedbackIcon(true);
        setArrayToRender(res.data);
      });
      break;
    case 'feedback':
      Axios.get(`/feedback`).then((res) => {
        setdeleteFeedbackIcon(true);
        setArrayToRender(res.data);
      });
      break;
    case 'userFeedback':
      Axios.get(`/feedback/user/${id}`).then((res) => {
        setdeleteFeedbackIcon(true);
        setArrayToRender(res.data);
      });
      break;
    case 'vdvFeedback':
      Axios.get(`/feedback/vdv/${id}`).then((res) => {
        setdeleteFeedbackIcon(true);
        setArrayToRender(res.data);
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
