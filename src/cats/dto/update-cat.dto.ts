// import { PartialType } from '@nestjs/mapped-types';

// 两者的区别在与clonePluginMetadataFactory，所以需要在nest-cli.json添加 "plugins": ["@nestjs/swagger/plugin"]
import { PartialType } from '@nestjs/swagger';

import { CreateCatDto } from './create-cat.dto';

export class UpdateCatDto extends PartialType(CreateCatDto) {}
