// import { PartialType } from '@nestjs/mapped-types';

// 两者的区别在与clonePluginMetadataFactory，所以需要在nest-cli.json添加 "plugins": ["@nestjs/swagger/plugin"]
import { PartialType } from '@nestjs/swagger';

import { CreateDogDto } from './create-dog.dto';

export class UpdateDogDto extends PartialType(CreateDogDto) {}
