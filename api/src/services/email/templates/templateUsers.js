const { templateHeader } = require('./templateHeaders');

// TODO

const htmlUserRegisterEmailTemplate = (name) => `       
        ${templateHeader}
        <body>
          <div class="main_container">
            <div class="image_container">
              <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
            </div>
            <div class="text_container">
              <h1>Hola ${name}, </h1>
              <h2>Gracias por unirte a VerdeVolver!</h2>
              <p>Ingresa una nueva contraseña en el siguiente link...</p>              
              <p>Que tengas buen día!</p>
              <img alt="fondo-vdv" src="cid:vdv@Fondo" />
            </div>
          </div>
        </body>        
                `;

const htmlChangePasswordEmailTemplate = (name, token) => `       
        ${templateHeader}
        <body>
          <div class="main_container">
            <div class="image_container">
              <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
            </div>
            <div class="text_container">
              <h1>Hola ${name}, </h1>
              <p>Por favor ingresa tu nueva contraseña y haz click en aceptar.</p>
              <p>La misma tendrá validez por las próximas 24 horas.</p>
              <form action="http://localhost:3001/user/password"
              method="POST">
              <input type="password"
              placeholder= "Nueva contraseña..."
              name="password"
              required />
              <input type="hidden" name="token" value="${token}" />
              <input type="submit" value="Aceptar" />              
              </form>              
              <p>Que tengas buen día!</p>
              <p>Equipo de Verde Volver</p>
              <img alt="fondo-vdv" src="cid:vdv@Fondo" />
            </div>
          </div>
        </body>        
                `;

const htmlChangeCBUEmailTemplate = (name) => `       
        ${templateHeader}
        <body>
          <div class="main_container">
            <div class="image_container">
              <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
            </div>
            <div class="text_container">
              <h1>Hola ${name}, </h1>
              <p>Por favor ingresa tu nuevo CBU.</p>              
              <p>Que tengas buen día!</p>
              <p>Equipo de Verde Volver</p>
              <img alt="fondo-vdv" src="cid:vdv@Fondo" />
            </div>
          </div>
        </body>        
                `;

const htmlDeleteUserEmailTemplate = (name) => `       
        ${templateHeader}
        <body>
          <div class="main_container">
            <div class="image_container">
              <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
            </div>
            <div class="text_container">
              <h1>Hola ${name}, </h1>
              <p>Confirmamos que tu cuenta ha sido dada de baja.</p>              
              <p>Que tengas buen día!</p>
              <img alt="fondo-vdv" src="cid:vdv@Fondo" />
            </div>
          </div>
        </body>        
                `;

const htmlDonationOkEmailTemplate = (name, vdvEntityName) => `       
        ${templateHeader}
        <body>
          <div class="main_container">
            <div class="image_container">
              <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
            </div>
            <div class="text_container">
              <h1>Hola ${name}, </h1>
              <p>Hemos recibido la donación efectuada para ${vdvEntityName} de forma correcta.</p>              
              <p>Muchas gracias por tu aporte.</p>
              <p>Que tengas un gran día!</p>
              <p>Equipo de Verde Volver</p>
              <img alt="fondo-vdv" src="cid:vdv@Fondo" />
            </div>
          </div>
        </body>        
                `;

const updatePassword = `
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>VerdeVolver</title>
<style type="text/css">
                h1 {
                    color: #2c302c; 
                    font-size: 28px;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin-bottom: 20px;
                }
                
                a {
                    display: block; 
                    margin-top: 20px; 
                    text-align: center; 
                    font-size: 18px; 
                    color: #19a500;
                    text-decoration: none;
                    font-family: Arial, sans-serif; 
                }
                
                a:hover {
                    text-decoration: underline; 
                }
              </style>
              </head> 
              <body>        
              <h1>Tu contraseña ha sido actualizada.</h1>
              <a href="http://localhost:5173/login">Puedes volver a ingresar</a>
              </body>
              <html>`;

module.exports = {
  htmlUserRegisterEmailTemplate,
  htmlDeleteUserEmailTemplate,
  htmlChangePasswordEmailTemplate,
  htmlChangeCBUEmailTemplate,
  htmlDonationOkEmailTemplate,
  updatePassword,
};
