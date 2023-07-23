import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC } from 'src/lib/constant';

export const Public = () => SetMetadata(IS_PUBLIC, true);
