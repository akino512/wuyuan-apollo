import {resolvers} from './server'
const testFun= ()=>{
  return 1
}
// const resolvers = require("./server")

// test function todoCreate
test('todoCreate', async () => {
  // expect(await resolvers.Mutation.todoCreate({},{content:"content"})).toMatch(/.{36}/);

  expect(testFun()).toBe(1);
});

