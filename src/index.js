import express from 'express';
import entries from 'object.entries';

const router = express.Router();

function mapRoutes(routes, pathToController = '../../../app/controllers/') {
  let requestMethodPath;
  let requestMethod;
  let path;
  let controllerMethod;
  let controller;
  let handler;
  let Handler;
  let c;
  let myPathToController = pathToController;

  const routesArr = entries(routes);

  if (myPathToController[0] !== '.') {
    myPathToController = `../../../${pathToController}`;
  }

  routesArr.forEach((value) => {
    requestMethodPath = value[0].replace(/\s\s+/g, ' ');
    requestMethod = (requestMethodPath.split(' ')[0]).toLocaleLowerCase();
    path = requestMethodPath.split(' ')[1];
    controller = value[1].split('.')[0];
    controllerMethod = value[1].split('.')[1];

    try {
      // require babel-register, because import is not supported by node
      require('babel-register');
      Handler = require(`${myPathToController}${controller}`).default;
      c = new Handler();
    } catch (err) {
      handler = require(`${myPathToController}${controller}`);
      c = handler;
    }

    if (requestMethod === 'get') {
      router.route(path).get(c[controllerMethod]);
    } else if (requestMethod === 'post') {
      router.route(path).post(c[controllerMethod]);
    } else if (requestMethod === 'put') {
      router.route(path).put(c[controllerMethod]);
    } else if (requestMethod === 'delete') {
      router.route(path).delete(c[controllerMethod]);
    }
  });

  return router;
}

module.exports = mapRoutes;