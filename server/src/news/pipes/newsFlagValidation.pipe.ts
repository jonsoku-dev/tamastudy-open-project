import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { NewsFlagEnum } from '../enum/news-flag.enum';

export class NewsFlagValidationPipe implements PipeTransform {
  readonly allowedFlags = [
    NewsFlagEnum.KR,
    NewsFlagEnum.JP,
    NewsFlagEnum.US,
  ];
  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();
    if (!this.isFlagValid(value)) {
      throw new BadRequestException(`"${value}"는 등록되지 않은 국가코드입니다. `);
    }
    return value;
  }

  private isFlagValid(value: any) {
    const idx = this.allowedFlags.indexOf(value);
    return idx !== -1;
  }
}