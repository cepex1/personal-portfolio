// api/hello.js
module.exports = async function (context, req) {
    context.res = {
      status: 200,
      body: {
        message: "¡Hola desde tu Azure Function integrada!"
      }
    };
  };