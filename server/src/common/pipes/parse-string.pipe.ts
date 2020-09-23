import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseStringPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      throw new BadRequestException(
        `Validation failed. "${value}" is not a String.`,
      );
    }
    return value;
  }
}