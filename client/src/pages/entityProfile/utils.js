import axios from 'axios';

const deleteMaterial = (mat, materials, setInput, setSaveButton) => {
  setSaveButton(true);
  const newMaterials = materials.filter((eachMat) => eachMat.name !== mat);
  setInput((prevObj) => {
    return { ...prevObj, Materials: newMaterials };
  });
};

const addMaterial = (e, materials, setInput, setSaveButton) => {
  setSaveButton(true);
  let newMaterials = [...materials];
  newMaterials.push({ name: e.target.value });
  const uniqueMaterials = [...new Set([...newMaterials])];
  setInput((prevObj) => {
    return { ...prevObj, Materials: uniqueMaterials };
  });
};

const updateVdV = (id, input) => {
  try {
    axios.get(`http://localhost:3001/material`).then((res) => {
      let numArray = [];
      res.data.forEach((mat) => {
        input.Materials.forEach((mat2) => {
          if (mat.name == mat2.name) numArray.push(mat.id);
        });
      });
      input.materials = numArray;
      axios.put(`http://localhost:3001/vdv/${id}`, input).then(() => {
        window.alert('Los cambios se han guardado exitosamente');
      });
    });
  } catch (error) {
    window.alert(error);
  }
};

// const deleteVdV = (id, navigate) => {
//   axios.put(`http://localhost:3001/vdv/deletePerfil/${id}`).then(() => {
//     window.alert('La entidad a sido borrada');
//     navigate('/home');
//   });
// };
const deleteVdV = (id, navigate) => {
  axios.delete(`http://localhost:3001/vdv/${id}`).then(() => {
    window.alert('La entidad a sido borrada');
    navigate('/home');
  });
};

export { deleteMaterial, addMaterial, updateVdV, deleteVdV };
