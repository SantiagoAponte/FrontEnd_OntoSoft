// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // llamado a url que hace comunicacion con el back en la nube
  urlBack: 'https://ontosoft.herokuapp.com',
  tempUrlBack: 'http://localhost:5000/api',
  // Declaracion de endpoints Login/Register
  loginEndpoint: '/api/user/login', 
  registerEndpoint: '/api/user/register',
  // Declaracion endpoint recuperar contraseña
  missingEndpoint: '/api/user/forgetpassword',
  //Declaracion endpoint cambia contraseña
  passwordEndpoint: '/api/user/resetpassword'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
