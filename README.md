# Code challenge Koibanx

Para poder inicializar correctamente esta app, primero se deben hacer unos ajustes. Este proyecto cuenta con un archivo ejemplo.env el cual contiene todas las variables de entorno que este proyecto puede tener, ya que no todas son necesarias, y un ejemplo.

- API_PORT (opcional): Esta variable recibe el puerto por el cual se quiere exponer la api. Por default se expone por el puerto 3000.
- DB_HOST (opcional): Esta variable recibe el host por el cual se desea conectar a una db de mongo. Por default tiene 'localhost'.
- DB_PORT (opcional): Esta variable recibe el puerto por el cual se expone la conexión a una db de mongo. Por default tiene el puerto 27017.
- DB_USER: Esta variable recibe el usuario con el cual se va a autentificar par acceder a la db.
- DB_PASSWORD: Esta variable recibe la password con la cual se va a autentificar eu usuario.
- DB: Esta variable recibe el nombre que de la db a la que se va acceder o que se desea crear si no existe.
- AUTH_SECRETKEY: Esta variable recibe una string que nos sirve para encriptar nuestros tokens. Puede ser una string cualquiera.

Contamos con que el authSource se va a sacar de 'admin'.

Una vez tengamos un archivo .env que contenga las variables minimas corremos lo siguiente: 
## Installation

```bash
$ npm install
```

Posteriormente a la instalación de las dependencias del proyecto podemos correr cualquiera de los siguientes comandos. Recomendamos usar el segundo.
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Debe salir un mensaje como este

```bash
[Nest] 2200  - 01/31/2023, 8:52:13 AM     LOG [NestApplication] Nest application successfully started +2ms
[Nest] 2200  - 01/31/2023, 8:52:13 AM     LOG [MongoConnectionService] Se conectó correctamente a la base de datos.
```

Una vez inicializada la app, en nuestro navegador deberemos ir a http://localhost:3000/api. Ahí encontraremos toda la documentación de los endpoints.

## Pasos para poder usar la api

1) Debemos generar un token usando el único endpoint que se encuentra en auth. 

Para poder usar los endpoints basta con dar en el botón que dice 'Try it out', llenar los campos que pide si es que tiene alguno y posteriormente el que dice 'Execute'.

2) Cuando hayamos obtenido este token, hasta arriba a la derecha veremos un botón de un candado, le damos click y se nos abrirá un alert donde debemos insertar el token que acabamos de generar.

3) Una vez declarado el token podremos usar el resto de los endpoints, por lo tanto tenemos que subir un archivo de excel con el endpoint correspondiente y usar los demas para obtener información de ese archivo.

