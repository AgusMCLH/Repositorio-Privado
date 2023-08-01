import { Router } from 'express';

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {}

  getRouter() {
    return this.router;
  }

  get(path, policies, middlewares, ...callback) {
    this.router.get(
      path,
      this.handlerPolicies(policies),
      this.handelerMiddleware(middlewares),
      this.applyCallback(callback)
    );
  }

  post(path, policies, middlewares, ...callback) {
    this.router.post(
      path,
      this.handlerPolicies(policies),
      this.handelerMiddleware(middlewares),
      this.applyCallback(callback)
    );
  }

  put(path, policies, middlewares, ...callback) {
    this.router.put(
      path,
      this.handlerPolicies(policies),
      this.handelerMiddleware(middlewares),
      this.applyCallback(callback)
    );
  }

  delete(path, policies, middlewares, ...callback) {
    this.router.delete(
      path,
      this.handlerPolicies(policies),
      this.handelerMiddleware(middlewares),
      this.applyCallback(callback)
    );
  }

  applyCallback(callbacks) {
    if (callbacks.length > 1) {
      callbacks = [callbacks[callbacks.length - 1]];
    }
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].status(500).send({ status: 'Internal Server Error', error });
      }
    });
  }

  handlerPolicies = (policies) => (req, res, next) => {
    if (policies[0] === 'PUBLIC') {
      return next();
    }

    const user = req.session.user;

    if (!user) {
      return res.redirect('/users/signin');
    }

    let valid = false;
    policies.forEach((politic) => {
      if (politic === user.role?.toUpperCase()) {
        req.user = user;
        valid = true;
      }
    });

    valid
      ? next()
      : res.status(403).send({ status: 'Auth Error', error: 'Forbidden' });

    return;
  };

  handelerMiddleware = (middlewares) => (req, res, next) => {
    if (middlewares.length === 0) {
      next();
    }
    middlewares.forEach((middleware) => {
      middleware(req, res, next);
    });
  };
}
