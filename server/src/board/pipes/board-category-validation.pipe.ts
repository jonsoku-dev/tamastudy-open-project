import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { BoardCategory } from '../enum/board-category.enum';

export class BoardCategoryValidationPipe implements PipeTransform {
  readonly allowedCategories = [
    BoardCategory.TRADE,
    BoardCategory.FREE,
    BoardCategory.JOB,
    BoardCategory.FQ,
  ];
  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();
    if (!this.isCategoryValid(value)) {
      throw new BadRequestException(`"${value}"는 존재하지 않는 카테고리입니다. `);
    }
    return value;
  }

  private isCategoryValid(category: any) {
    const idx = this.allowedCategories.indexOf(category);
    return idx !== -1;
  }
}