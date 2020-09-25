import { GourmetCategory } from '../../../generated/graphql';

export const gourmetCategoryOptions = [
  { value: 'ALL', label: 'ALL' },
  { value: GourmetCategory.Rice, label: GourmetCategory.Rice },
  { value: GourmetCategory.Meat, label: GourmetCategory.Meat },
  { value: GourmetCategory.Noodle, label: GourmetCategory.Noodle },
  { value: GourmetCategory.Bread, label: GourmetCategory.Bread },
];

export const gourmetScoreOptions = [
  { value: 1, label: '⭐' },
  { value: 2, label: '⭐⭐' },
  { value: 3, label: '⭐⭐⭐' },
  { value: 4, label: '⭐⭐⭐⭐' },
  { value: 5, label: '⭐⭐⭐⭐⭐' },
];
