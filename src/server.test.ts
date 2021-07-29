import {resolvers} from './server'
const testFun= ()=>{
  return 1
}
// const resolvers = require("./server")


test('todoCreate', async () => {
  expect(await resolvers.Mutation.todoCreate({},{content:"content"})).toMatch(/.{36}/);
});

