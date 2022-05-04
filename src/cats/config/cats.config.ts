import { registerAs } from '@nestjs/config';

export default registerAs('cats', () => ({
  foo: 'bar',
  foo2: 'bar2',
}));
