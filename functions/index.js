const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.registrarServicio = functions.https.onRequest((req, res) => {
  if (req.method == "POST") {
    const nombre = req.body.nombre;
    const linkEndpoint = req.body.link_endpoint;
    const logo = req.body.logo;
    const phones = req.body.telefono;

    console.log(req.body);

    const primeLength = 60;
    const diffHell = crypto.createDiffieHellman(primeLength);

    diffHell.generateKeys("base64");

    const key = diffHell.getPublicKey("base64");

    admin
      .firestore()
      .collection("servicio")
      .add({
        nombre: nombre,
        link_endpoint: linkEndpoint,
        telefono: phones,
        logo: logo,
        token_auth: key,
      })
      .then((data) => {
        console.log("resultado: ", data.id);
        return res.status(200).type("application/json").send({
          status: true,
          nombre: nombre,
          mensaje: "Registro exitoso",
          token_auth: key,
          id: data.id,
        });
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(400)
          .type("application/json")
          .send({ status: false, mensaje: "Registro erroneo" });
      });
  }
});

exports.solicitarDatos = functions.https.onRequest((req, res) => {
  if (req.method == "POST") {
    const codUsuario = req.body.codigo_usuario;
    const descripcion = req.body.descripcion;
    const tipo = req.body.tipo;

    const idService = req.body.servicio.id_service;
    const token = req.body.servicio.token;

    admin
      .firestore()
      .doc("servicio/" + idService)
      .get()
      .then((servicio) => {
        console.log("entro :v", servicio);
        if (servicio.get("token_auth") === token) {
          admin
            .firestore()
            .doc("usuario/" + codUsuario)
            .get()
            .then((usuario) => {
              // console.log('entro :v', order)
              
              admin
                .firestore()
                .collection("solicitud")
                .add({
                  codigo_usuario: codUsuario,
                  descripcion: descripcion,
                  estado: "pendiente",
                  fecha_solicitud: new Date(),
                  tipo: Number(tipo),
                  servicio: {
                      nombre: servicio.get("nombre"),
                      logo: servicio.get("logo"),
                      link_endpoint: servicio.get("link_endpoint"),
                      token_auth: servicio.get("token_auth"),
                  },
                })
                .then((data) => {
                  sendNotification(
                    usuario.get("id_dispositivo"),
                    notification(
                      servicio.get("nombre") + " esta solicitando acceso",
                      "Abre la app para ver los detalles",
                      "id_solicitud",
                      ""
                    )
                  );
                  return res
                    .status(200)
                    .type("application/json")
                    .send({ status: true, mensaje: "Solicitud exitosa" });
                });
            });
        } else {
          return res
            .status(400)
            .type("application/json")
            .send({ status: false, mensaje: "Solicitud fallida" });
        }
      });

    // console.log(req.body);
  }
});

function sendNotification(registrationTokens, payload) {
  admin
    .messaging()
    .sendToDevice(registrationTokens, payload)
    .then((response) => {
      console.log("este es el mensaje ", response, payload, registrationTokens);
      return response;
    })
    .catch((e) => {});
}

function notification(title, body, type, value) {
  return {
    notification: {
      title: title,
      body: body,
    }
  };
}
