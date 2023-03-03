import axios from 'axios';
const Axios = axios.create({ baseURL: 'http://localhost:3001' });

const setDataToRender = (
  setDonationUsersFilters,
  setDonationVdVFilters,
  setFeedbackUsersFilters,
  setFeedbackVdVFilters
) => {
  let feedbackVdVs = [];
  let feedbackUsers = [];
  Axios.get(`/feedback`).then((res) => {
    res.data.forEach((feed) => {
      if (!feedbackUsers.some((f) => f.User.name === feed.User.name))
        feedbackUsers.push(feed);
      if (!feedbackVdVs.some((f) => f.VdV.name === feed.VdV.name))
        feedbackVdVs.push(feed);
    });
    setFeedbackUsersFilters([...feedbackUsers]);
    setFeedbackVdVFilters([...feedbackVdVs]);
  });
  let donationVdVs = [];
  let donationUsers = [];
  Axios.get(`/donation`).then((res) => {
    res.data.forEach((don) => {
      if (!donationUsers.some((f) => f.User.name === don.User.name))
        donationUsers.push(don);
      if (!donationVdVs.some((f) => f.VdV.name === don.VdV.name))
        donationVdVs.push(don);
    });
    setDonationUsersFilters([...donationUsers]);
    setDonationVdVFilters([...donationVdVs]);
  });
};

const userSearchFeedback = (event, setFeedbackType, setFeedbackId) => {
  if (event.target.value === 'none') {
    setFeedbackType('feedback');
  } else {
    setFeedbackType('userFeedback');
    setFeedbackId(event.target.value);
  }
};

const vdvSearchFeedback = (event, setFeedbackType, setFeedbackId) => {
  if (event.target.value === 'none') {
    setFeedbackType('feedback');
  } else {
    setFeedbackType('vdvFeedback');
    setFeedbackId(event.target.value);
  }
};

const userSearchDonation = (event, setDonationType, setDonationId) => {
  if (event.target.value === 'none') {
    setDonationType('donation');
  } else {
    setDonationType('userDonation');
    setDonationId(event.target.value);
  }
};

const vdvSearchDonation = (event, setDonationType, setDonationId) => {
  if (event.target.value === 'none') {
    setDonationType('donation');
  } else {
    setDonationType('vdvDonation');
    setDonationId(event.target.value);
  }
};

const optionsSelectArray = (arr, type) => {
  if (type === 'vdv') {
    return arr?.map((vdv, i) => {
      return (
        <option key={i} value={vdv.VdVId}>
          {vdv.VdV.name}
        </option>
      );
    });
  } else {
    return arr?.map((vdv, i) => {
      return (
        <option key={i} value={vdv.UserId}>
          {vdv.User.name}
        </option>
      );
    });
  }
};

export {
  setDataToRender,
  userSearchFeedback,
  vdvSearchFeedback,
  userSearchDonation,
  vdvSearchDonation,
  optionsSelectArray,
};
