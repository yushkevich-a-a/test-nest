import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { NOT_VALID_ID } from './id-validator.constants';

export class IDValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return value;
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(NOT_VALID_ID);
    }
    return value;
  }
}
