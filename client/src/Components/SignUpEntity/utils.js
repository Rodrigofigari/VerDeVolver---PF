export default function validate(form, name, users, entities) {
  let isErrorObj = {
    isError: false,
    errorMsg: '',
  };

  if (name !== 'cbu' && form[name].length === 0) {
    isErrorObj = {
      isError: true,
      errorMsg: 'Requerido',
    };
    return isErrorObj;
  }
  if (name === 'mail') {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    isErrorObj = {
      isError: !regex.test(form.mail),
      errorMsg: 'Por favor ingresa un email válido.',
    };

    const userMails = users?.filter((element) => element.mail == form.mail);
    const vdvsMails = entities?.filter((element) => element.mail == form.mail);

    if (userMails !== undefined && vdvsMails !== undefined) {
      isErrorObj = {
        isError: userMails.length > 0 || vdvsMails.length > 0,
        errorMsg: 'El mail ingresado se encuentra asociado a otra cuenta',
      };
    }
  }
  if (name === 'cbu') {
    if (form.cbu !== undefined) {
      isErrorObj = {
        isError: form.cbu.length < 21 && form.cbu.length !== 0,
        errorMsg: 'El cbu debe ser de 22 digitos.',
      };
      const vdvsCbus = entities?.filter((element) => element.cbu == form.cbu);
      if (vdvsCbus !== undefined) {
        isErrorObj = {
          isError: vdvsCbus.length > 0,
          errorMsg: 'El cbu ingresado se encuentra asociado a otra cuenta',
        };
      }
    }
  }

  if (name === 'description') {
    isErrorObj = {
      isError: form.description.length < 70 || form.description.length > 450,
      errorMsg: 'La descripción debe contener entre 70 y 450 caracteres.',
    };
  }

  return isErrorObj;
}
