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

- `nest g class cats/entities/flavor.entity --no-spec //创建flavor表`
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
