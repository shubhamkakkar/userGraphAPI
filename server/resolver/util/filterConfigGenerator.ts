import {FilterQuery} from 'mongoose';
import {TFilterDBSearch} from '../../types';
import regexYYYYMMDDFormatCheck from './regexYYYYMMDDFormatCheck';

type TErrorFilerConfigGenerator = {
  invalidArgs?: string;
  message?: string;
};

export default function filterConfigGenerator({
  createdAt,
  beforeCurrentData,
}: TFilterDBSearch): [FilterQuery<any>, TErrorFilerConfigGenerator] {
  let filterSearchConfig = {};
  let error: TErrorFilerConfigGenerator = {};
  if (createdAt) {
    const correctDateFormatCheckBool = regexYYYYMMDDFormatCheck(createdAt);
    if (correctDateFormatCheckBool) {
      const gtOrle = `$${beforeCurrentData ? 'l' : 'g'}te`;
      filterSearchConfig = {
        ...filterSearchConfig,
        createdAt: {
          [gtOrle]: createdAt,
        },
      };
    } else {
      error = {
        message: 'Date is invalid, the format should be YYYY-MM-DD and must also be valid',
        invalidArgs: createdAt,
      };
    }
  }

  return [filterSearchConfig, error];
}
