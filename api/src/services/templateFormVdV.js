const createNodemailerTransport = require('./createTransport');

const sendVdVFormEmail = async (name, mail) => {
  const transporter = createNodemailerTransport();
  await transporter.sendMail(
    {
      from: 'verdevolver@gmail.com',
      to: `${mail}`,
      subject: 'Recibimos tu formulario!',
      text: 'Gracias por contactarte con nosotros',
      html: `
                    <h1>Hola ${name}, gracias por completar nuestro formulario.</h1>
                    <p>Los administradores revisarán tu solicitud cuidadosamente.</p>
                    <p>Recibirás una respuesta en los próximos días!</p>
                    <p>Que tengas muy buen día,</p>
                    <p>Equipo de Verde Volver</p>


                `,
    },
    (error, info) => {
      if (error) {
        throw Error('An error has ocurred');
      } else {
        console.log('Email sent: ', info.response);
      }
    }
  );
};

module.exports = {
  sendVdVFormEmail,
};
