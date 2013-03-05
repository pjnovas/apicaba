![logo](https://raw.github.com/pjnovas/apicaba/master/public/images/logo.png)  
La información de [Buenos Aires Data](http://data.buenosaires.gob.ar) transformada en Web API

## Vista del proyecto

Se compone de 2 procesos `server.js` y `admin.js`, siendo el servidor API y el Administrador de Trabajos (o Jobs Scheduler)
Ambos procesos acceden a una base de datos MongoDB, la cual contiene la información de los recursos, como de los Trabajos (o Jobs)

![apicabaDesign](https://raw.github.com/pjnovas/apicaba/master/design.png)

## Contribuir

**[NodeJS](http://nodejs.org/) v0.8.x es requerido**

### Instalar [GruntJS](http://gruntjs.com/)
Esto agregará el comando `grunt` a tu path de sistema.

#### Instalando GruntJS CLI
> Si ya tenes instalado Grunt global (versión 0.3.x) tenes que removerlo antes de instalar el cliente (esto no afecta a otros proyectos que funcionen con tu versión actual de Grunt)

```bash
npm uninstall -g grunt
npm install -g grunt-cli
```

**Mas Info en [GruntJS: Getting Started](https://github.com/gruntjs/grunt/wiki/Getting-started)**

## Instalar dependencias desde NPM

```bash
npm install
```

## Compilar el proyecto (javascripts de cliente)

```bash
grunt
```

> Esto compilara todos los archivos JS y LESS que se encuentran en la carpeta `./client` y los ubicará en `./dist`

### Observador de archivos
De está manera no vas a tener que correr `grunt` cada vez que cambias un archivo

```bash
grunt watch
```

> Cada vez que guardes un archivo dentro de la carpera `./client` compilará nuevamente. 

## Configuraciones

En el root del proyecto se encuentra el archivo `secrets.json`:

```javascript
{
  "mongodb": {
    "connectionString": "apicaba" // conexión a la base de datos MongoDB
  },
  "APIhost": "http://localhost:3000", //root de la API
  "session": "no le digas a nadie", // secreto de session para ExpressJS
  "request_retries": 10 //cantidad de intentos del Job en caso de respuesta fallida desde BA Data
}
```

Para correr los proceso, luego de compilar con grunt:

### Web API
```bash
node server.js
```
Por defecto estará ubicado en `http://localhost:3000`

### Administrador

```bash
node admin.js
```

Por defecto estará ubicado en `http://localhost:3050`

**Para configurar el usuario y password del Adminsitrador, insertar un registro en la base de datos**

```bash
mongo
use apicaba
db.apicaba.insert({"username" : "usuario", "password" : "pa$$w0rd" })
```

## Tests

Los tests de la API se encuentran en el directorio `./test` y para correrlos configurar el archivo `./secrets_test.json` ejecutar:

```bash
make test
```

> Los tests están hechos con Mocha, por lo que si estas en Windows, podes correrlos con viendo el Makefile.

Para generar el CodeCoverage:
```bash
make coverage
```
Y abrir el archivo `./coverage.html`


## License 

(The MIT License)

Copyright (c) 2013 Pablo Novas &lt;pjnovas@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




