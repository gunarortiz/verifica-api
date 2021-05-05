# Verifica
## _Una Forma de verificar_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Este es la API para utilizar la verificacion en dos pasos de verifica.
Las opciones disponibles son:

- Registrar el servicio
- Solicitar los datos del usuario

## Ventajas

- Datos mas privados
- Verificacion en 2 pasos
- API facil de consumir
- Gestion de usuarios


## Registrar el servicio

Para registrar el servicio se debe hacer un request por POST a:

https://us-central1-verifica-dev.cloudfunctions.net/registrarServicio

```
{
    "nombre": "bisa3",
    "link_endpoint": "https://endpoint",
    "telefono": "+591697889955",
    "logo": "https://logo"
}
```

Para recibir la respuesta exitosa:

```
{
    "status": true,
    "nombre": "bisa3",
    "mensaje": "Registro exitoso",
    "token_auth": "DRJ75iA5iAM=",
    "id": "H5gJ0cFoYykdSYjS6ts5"
}
```

## Solicitar los datos

Para solicitar sus datos al usuario se debe hacer un request por POST a:

https://us-central1-verifica-dev.cloudfunctions.net/solicitarDatos

```
{
    "codigo_usuario": "HK2NTX",
    "descripcion": "Esta es la primera vez",
    "tipo": "1",
    "servicio": {
        "id_service": "H5gJ0cFoYykdSYjS6ts5",
        "token": "DRJ75iA5iAM="
    }
}
```

Para recibir la respuesta exitosa:

```
{
    "status": true,
    "mensaje": "Solicitud exitosa"
}
```
Si el usuario acepta, los datos se enviaran al endpoint provisto de forma inmediata, estos estaran encriptados con AES 128 con el token generado al momento del registro del servicio. 

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
