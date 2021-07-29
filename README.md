# wuyuan-apollo

安装
```
npm install
```
启动
```
npm run start
```
启动服务后可以看到url，请按照如下配置测试graphql CRUD

type格式
```graphql
  type Todo{
    id:String
    content:String
  }
```

graphql示例
```graphql
query{
  todoList {
    id
    content
  }
}

mutation($content:String) {
  todoCreate(content:$content)
}

mutation($id:String,$content:String) {
  todoUpdate(id:$id,content:$content)
}

mutation($id:String) {
  todoDelete(id:$id) 
}
```

variables示例
```json
{
  "id":"b5cfc577-605f-493e-9b0a-ef5d10cf141f",
  "content":"内容内容内容内容内容"
}
```

请添加请求头如下，用以校验权限
```
Authorization:wuyuan
```
