const Hapi = require("@hapi/hapi");
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port : 8000, 
        host : process.env.NODE_ENV === "production" ? "172.31.32.182" : "127.0.0.1",
        routes : {
            cors: {
              origin: ['*'],
            },
        },
    });

    await server.start();

    server.route(routes);
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();