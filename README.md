# nestjs project MINGZHI

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 命令行说明

- `docker-compose up -d //项目中docker-compose.yml文件用来启动pg数据库`

- `nest g class cats/entities/flavor.entity --no-spec //创建flavor表，--no-spec代表无测试文件`
- `nest g class common/dto/pagination-query.dto --no-spec //创建pagination分页实体类`
- `nest g class events/entities/event.entity --no-spec //创建event表`
- `npx typeorm migration:create CatRefactor` //创建 migration 记录
- `nest g filter common/filters/http-exception` //创建 filter http-exception
- `nest g guard common/guards/api-key` //创建 guard api-key
- `nest g mo common` //创建 common 公共模块
- `nest g interceptor common/interceptors/wrap-response` //创建 wrap-response 拦截器公共模块
- `nest g interceptor common/interceptors/timeout` //创建 timeout 拦截器公共模块
- `nest g pipe common/pipe/parse-int` //创建 parse-int 管道公共模块，目前 nestjs 8.2.5 已经内置了 ParseIntPipe 这类工具
- `nest g middleware common/middleware/logging` //创建 logging 公共模块

- exception filter
- pipes
- guards
- interceptors

- global
- controller
- method
- param
- jest 集成还是有点问题

- 配合 docker-compose.yml 文件中的 mongo 的 hostname
- 进入任意一个 mongo 容器中，目前这些容器都在一个主机网络中 `db = (new Mongo('localhost:27017')).getDB('test')`
- `config = { _id: 'tiny', members: [ { _id: 0, host: 'mongo0:27017', }, { _id: 1, host: 'mongo1:27018', }, { _id: 2, host: 'mongo2:27019', }, ], }`
- `rs.initiate(config)`
- `127.0.0.1 mongo0 127.0.0.1 mongo1 127.0.0.1 mongo2` // 修改本地的 host 文件，让本地应用的 mongodb 连接副本集能够正常连接
- `依次ping mongo0,ping mongo1,ping mongo2` //测试上一步的 host 设置是否成功
