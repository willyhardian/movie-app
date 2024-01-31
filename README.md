# RESTful API

## Resources

- [https://jestjs.io](https://jestjs.io)
- [https://www.npmjs.com/package/jest](https://www.npmjs.com/package/jest)
- [https://www.npmjs.com/package/supertest](https://www.npmjs.com/package/supertest)
- [https://www.npmjs.com/package/@jest/globals](https://www.npmjs.com/package/@jest/globals)
- [https://expressjs.com/en/starter/generator.html](https://expressjs.com/en/starter/generator.html)
- [https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface#instance-method-bulkDelete](https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface#instance-method-bulkDelete)
- [https://sequelize.org/api/v6/class/src/model.js~model#static-method-destroy](https://sequelize.org/api/v6/class/src/model.js~model#static-method-destroy)

## DEMO

### Assertion

- [ ] Assertion in Node.js

  ```js
  const assert = require("assert");

  try {
    console.log("Test 1");
    assert.equal(5, 5);
    console.log("SUCCESS\n");
  } catch (error) {
    console.log("Operator :", error.operator);
    console.log("Expected :", error.expected);
    console.log("Actual   :", error.actual);
    console.log("FAILED\n");
  }

  try {
    console.log("Test 2");
    assert.deepStrictEqual({ a: 1 }, { b: 1 });
    console.log("SUCCESS\n");
  } catch (error) {
    console.log("Operator :", error.operator);
    console.log("Expected :", error.expected);
    console.log("Actual   :", error.actual);
    console.log("FAILED\n");
  }
  ```

### Jest

- [ ] test file extension .test & .spec
- [ ] Writing test with Jest

### [Expect matcher](https://jestjs.io/docs/using-matchers)

- [ ] [toBe](https://jestjs.io/docs/expect#tobevalue)
- [ ] [not]()
- [ ] [toHaveLength](https://jestjs.io/docs/expect#tohavelengthnumber)
- [ ] [toHaveProperty](https://jestjs.io/docs/expect#tohavepropertykeypath-value)
- [ ] [toBeUndefined]()
- [ ] [toEqual](https://jestjs.io/docs/expect#toequalvalue)
- [ ] [toBeInstanceOf](https://jestjs.io/docs/expect#tobeinstanceofclass)
- [ ] [any]()

### Global Method

- [ ] [describe](https://jestjs.io/docs/api#describename-fn)
- [ ] [test](https://jestjs.io/docs/api#testname-fn-timeout)
- [ ] [test.only](https://jestjs.io/docs/api#testonlyname-fn-timeout)
- [ ] [test.skip](https://jestjs.io/docs/api#testskipname-fn)

### Supertest

- [ ] [SuperTest](https://www.npmjs.com/package/supertest)
- [ ] `send` (body) and `set` (headers) in SuperTest

### Create testing for endpoints movies

- [ ] **bin/www** in Express

- [ ] testing for GET /movies
- [ ] testing for POST /movies
- [ ] failure testing for POST /movies
- [ ] seeding data and clean up
- [ ] testing while running an app
- [ ] authentication testing

### Lifecycle Hooks

- [ ] [beforeAll](https://jestjs.io/docs/api#beforeallfn-timeout)
- [ ] [afterAll](https://jestjs.io/docs/api#afterallfn-timeout)
- [ ] [beforeEach](https://jestjs.io/docs/api#beforeeachfn-timeout)
- [ ] [afterEach](https://jestjs.io/docs/api#aftereachfn-timeout)

- [ ] [Jest setup and teardown](https://jestjs.io/docs/setup-teardown)
  - [ ] `beforeAll`
  - [ ] clear up data before/after test with bulkDelete and option
  - [ ] Generating access_token

## Notes

- [ ] Preparing test database with command `NODE_ENV=test npx sequelize <options>`

- [ ] change test script in package.json to `npx jest --verbose --detectOpenHandles --forceExit`
- [ ] before testing, create database and run migration

  ```bash
  npx sequelize-cli db:create --env test
  npx sequelize-cli db:migrate --env test
  ```
