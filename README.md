# Express.js sample REST API

## Run the REST API

```sh
npm run start
```

## How to create a new route

Register a new controller js file under the `routes/api/v1` directory. Take as example the `routes/api/v1/portfolio-controller.js` file. If the route needs to be a secure route validate that you are adding the `authorizationHeader` middleware to the controller with the following line:

```js
controllerRouter.use(authorizationHeader);
```

After defining the controller it needs to be registered in the `routes/api/v1/index.js` file.
