# PokeAPI
Creando el backend con Node JS.

# Intro

## CoinMarketCap

Esta es una API gratuíta (en parte). El link es coinmarketcap.com/api/.

### Documentación

Es una buena documentación que tiene una [guía de inicio](https://coinmarketcap.com/api/documentation/v1/#).

Lo primero que nos dicen es que necesitamos utilizar una _API Key_. Esto requiere un registro en la API y guardarse el token (API Key). A continuación tenemos el comando cURL para copiar
```bash
curl -H "X-CMC_PRO_API_KEY: b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c" -H "Accept: application/json" -d "start=1&limit=5000&convert=USD" -G https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
```
donde debemos sustituir nuestra _API Key_.

## PokéAPI

Otra API para obtener informacón de distintos pokémons.

### Documentación

Este es el enlace a la documentación (https://pokeapi.co/docs/graphql).

### Primer ejercicio

Para hacer la petición del primer ejercicio simplemente debemos ir hasta la documentación de pokeapi y dentro de Items/Item tenemos el ejemplo para pedir la master-ball

```
https://pokeapi.co/api/v2/item/{id or name}/
```

donde `{id or name}` es `master-ball`. Entonces el cURL es

```bash
curl "https://pokeapi.co/api/v2/item/master-ball/"
```

Para guardarlo en un archivo prettificado podemos hacer

```bash
curl "https://pokeapi.co/api/v2/item/master-ball/" | python -mjson.tool > master-ball.json
```

# Protocolo HTTP

## Operaciones del protocolo

También conocidas como verbos, son los siguientes
- GET
- HEAD
- POST
- PUT
- DELETE
- CONNECT
- OPTIONS
- TRACE
- PATCH

Estos tienen tres características importantes de las acciones:
- Seguras: son seguras aquellas acciones que se pueden realizar sin modificar ningún tipo del estado del servidor. Son seguras solo las operaciones de lectura porque al leer un dato no se modifica el estado.
- Indempotentes: Si leemos dos veces un dato y no se modifica nada, leeremos lo mismo ambas veces. Esto es una acción idempotente. Si realizamos un POST o una creación de un nuevo recurso dos veces de forma seguida estamos creando dos recursos, por lo tanto eso no es una acción idempotente. Podemos crear el recurso A, luego lo creamos otra vez ese recurso, entonces el estado final del servidor es que tengo dos recursos A y el servidor no está igual que cuando tenía solo un recurso A. Si son idempotentes, podemos realizar varias veces seguidas esa accion y el estado del servidor se queda igual que antes.
- Cacheables: El cliente se puede guardar el resultado de la acción. Si hacemos una lectura y guardamos el resultado para no tener que hacer más lecturas al servidor estamos haciendo una acción cacheable.


### GET

Es un método que hace una lectura de un recurso. Básicamente es seguro y cacheable. En teoría debería ser idempotente también. 

### HEAD

Es igual que el GET pero no da respuesta. No se suele utilizar en la propia creación de APIS.

### POST
Se utiliza para crear nuevos recursos. En el caso de los Poke se utilizaría para crear nuevos pokemos. Cambia el estado por lo tanto no es seguro ni idempotente. Crea un nuevo recurso.

### PUT

Es muy similar a POST pero este reemplaza los datos que hay en un recurso. Por ejemplo podemos hacer un POST de charizar a nivel 50, y si después volvemos a hacer un POST de lo mismo tendremos dos veces el mismo recurso. Pero si hacemos un PUT de charizar nivel 50 estamos modificando la identidad de charizar para ponerle nivel 50. Si no había charizar lo crea, y si estaba modifica el nivel (es un update). Machaca la información a diferencia de POST que la añade siempre.

Esto no cambia el estado del servidor porque no añade nuevos recursos. No es segura pero sí que es idempotente.

### DELETE

Elimina un recurso del servidor que se indica en la URL.

### CONNECT

Conecta o genera una conexion con el servidor (con el recurso que identifica).

### OPTIONS

Describe qué se puede hacer con el servidor, qué opciones de conexión hay.

### TRACE

REaliza el envío de un mensaje para ver por dónde pasa hacia un recurso concreto.

### PATCH

Se utliza mucho para hacer modificaciones. A diferencia del PUT, este nos permite hacer modificaciones parciales en los recursos especificados. Podríamos modificar solamente el nivel de charizar sin tener que reemplazar la entidad entera como con PUT. Hace una modificacion parcial.

### Ejemplos con estas llamadas

Si hacemos un GET debemos darle la siguiente información

```
GET https://pokeapi.co/api/v2/pokemon/ditto
```

pero sihacemos un PUT de lo mismo

```
PUT https://pokeapi.co/api/v2/pokemon/ditto
```

le estamos diciendo al servidor es que queremos poner todos los datos que le vamos a enviar en la URL descrita. Cuando leamos esa URL leeremos los datos que le pusimos con el PUT.

## Como se transfieren datos: Tipos de parámetros

Cómo se construye una petición HTTP y qué datos podemos enchufarle dentro.

### Query Params

En un GET se pueden enviar datos como Query Params/Query String para dar detalles de lo que pedimos. 

### Body 
En un POST si quisiéramos hacer esto la URI sería extremadamente larga, entonces hay otros métodos. Para esto se puede añadir un BODY que puede tener distintos formatos (texto plano, json, binario, x-www-form-urlencoded...).

### Headers

Podemos definir un objeto de headers en una petición HTTP. Se utiliza mucho para definir configuraciones del sistema o para dar información extra a nuestro servidor o cliente sobre tipos de datos que afecto. Sería por ejemplo para especificar la metadata de la información del contexto de nuestras peticiones como decir el tipo de contenido del body (especificar que es un json por ejemplo). "Oye, te estoy enviando texto y es un JSON".

Tambén se utiliza para enviar autorización (credenciales). Este es un header Autorization para identificar al usuario que está haciendo la petición.

## Códigos de error

El estado de una respuesta viene definido por números:
- Respuestas informativas (100-199).
- Respuestas satisfactorias (200-299).
- Redirecciones (300-399).
- Errores de los clientes (400-499).
- Errores de los servidores (500-599).

Descripción detallada en developer.mozilla.org/es/docs/Web/HTTP/Status.

Ejemplo gracioso
- 418 I'm a teapot: Es un meme, un easteregg. Significa que el servidor no quiere hacerte café con una tetera.

# Creando la API

## Preparaciones iniciales

En el directorio de trabajo ejecutamos `npm init` y a continuación instalamos `npm install express` que es la librer'ia que nos permite desarrollar utilizando el protocolo HTTP. Nos permite crear endpoints, permite también consultar el trafico que recibimos en esos endpoints con unas requests etc.

Con `node app.js` comenzamos a escuchar en el puerto 3000 de localhost.

## Definiendo las URL

### Objetivo
Nuestro objetivo es definir una API para gestionar nuestro equipo Pekémon.

### Acciones
- Identificarnos
- Añadir pokémon de nuestro equipo.
- Eliminar pokémon de nuestro equipo.
- Consultar información de nuestro equipo.
- Intercambiar el orden de nuestros Pokémon.

### REST Design
- Añadir Pokémon al equipo: POST /team/pokemons
- Consultar Equipo: GET /team
- Eliminar Pokémon: DELETE /team/pokemons/:id
- Intercambiar el orden de nuestros pokémon: PUT /team (Este es tricky porque REST se refiere solo a entidades, pero esto es una acción no una consulta).
- Sistema de credenciales


## Testing

Tenemos estas librerías:
- Mocha: https://mochajs.org/ Nos da el entorno sobre el que implementar los tests.
- Chai: https://www.chaijs.com/ Nos permite realizar las pruebas en sí mismas.

Para instalarlos usar `npm install -D mocha chai`. El `-D` es para que sea como dependendia en el entorno de desarrollo.

Tipos de tests:
- Un test unitario simplemente comprueba una funcionalidad concreta, una parte del programa
- End to End: Simula ser una persona externa, entonces se utiliza el código enter.

Una vez añadidos los tests y actualizado el package.json con la ruta a `mocha`, poedmos ejecutarlos todos con `npm run test`.

Para instalar chai-http usamos `npm install -D chai-http`. Esto nos hace falta para los tests e2e.

### Testeando la autenticación

La autenticación es el nombre que tiene todo el flujo de procesos de cualquier sistema informático para determinar cuál es el usuario que está haciendo la acción. No confundir con autorización, ya que esta determina si un usuario (autenticado) puede o no realizar una acción (si tiene permisos). La autenticación lo que hace es determinar quién es ese usuario. Van en conjunto.

Esto es necesario para definir qué usuarios tienen qué equipos pokémon y que estos puedan sólo modificar su propio equipo.

Para implementar la autenticación utilizaremos Passport. Se instala con `npm install -s passport-jwt` utilizando el flag `-s` para guardarla como dependencia normal.

Para codificar esta información de autenticación utilizaremos JWT (Json Web Token) que es un estándar que nos permite codificar información de usuario (nombre de usuario, correo...) en un string. Se puede ver un ejemplo visitando la web [jwt.io](https://jwt.io).

En esta función de ejemplo vemos que el GET va llamando a las diferentes funciones por orden en el ENDPOINT `/team`
```js
app.get('/team', // ENDPOINT
    passport.authenticate('jwt', {session: false}), // MIDDLEWAREs de la librería para autenticar
    (req, res) => { // HANDLER
        res.status(200).send('Hello GET!');
});
```
primero llama a la función authenticate de la librería passport que toma como parámetros `req, res, next`. El parámetro `next` es el que se recibe para pasar a la siguiente función. El HANDLER final está implementada por nosotros y también tiene esos tres parámetros, pero el `next` será `null` por eso puede obviarse.

### Autenticación

Para los identificadores de usuario necesitaríamos esta librería `npm install -s uuid` que sirve para crear identificadores únicos. Para encriptar las contraseñas de los usuarios utilizamos `npm install -s bcrypt`.