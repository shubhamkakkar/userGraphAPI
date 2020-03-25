import {UserInputError} from 'apollo-server';
import {TFilterDBSearch} from './../../types';
import regexYYYYMMDDFormatCheck from './regexYYYYMMDDFormatCheck';
export default function filterConfigGenerator({createdAt, beforeCurrentData}: TFilterDBSearch) {
  let filterSearchConfig = {};
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
      throw new UserInputError('Date is invalid, the format should be YYYY-MM-DD and must also be valid', {
        invalidArgs: createdAt,
      });
    }
  }

  return filterSearchConfig;
}
