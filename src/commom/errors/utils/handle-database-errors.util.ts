import { DataBaseError } from './../types/DataBaseError';
import { UniqueConstraintError } from '../types/UniqueConstraintError';
import { PrismaClientError } from './../types/PrismaClientError';
//Enum para tratativa de errros do prisma
enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
}

export const handleDataBaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);
    default:
      return new DataBaseError(e.message);
  }
};
