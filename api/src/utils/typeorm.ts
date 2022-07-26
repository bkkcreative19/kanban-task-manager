import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { Task, Board, Subtask, ColumnType } from "../entities";
import { AppDataSource } from "../database/connection";
import { EntityNotFoundError, BadUserInputError } from "../errors";

import { generateErrors } from "./validation";

type EntityConstructor =
  | typeof Board
  | typeof Task
  | typeof Subtask
  | typeof ColumnType;
type EntityInstance = Board | Task | Subtask | ColumnType;

const entities: { [key: string]: EntityConstructor } = {
  Board,
  Task,
  Subtask,
  ColumnType,
};

export const findEntityOrThrow = async <T extends EntityConstructor>(
  Constructor: T,
  options: any
): Promise<any> => {
  const repository = AppDataSource.getRepository(Constructor);

  let instance = repository.find(options);

  if (!instance) {
    throw new EntityNotFoundError(Constructor.name);
  }

  return instance;
};

export const validateAndSaveEntity = async <T extends EntityInstance>(
  instance: T
): Promise<any> => {
  const Constructor = entities[instance.constructor.name];
  // console.log(Constructor);
  const repository = AppDataSource.getRepository(Constructor);

  if ("validations" in Constructor) {
    const errorFields = generateErrors(instance, Constructor["validations"]);

    if (Object.keys(errorFields).length > 0) {
      throw new BadUserInputError({ fields: errorFields });
    }
  }
  return repository.save(instance) as Promise<any>;
};

export const createEntity = async <T extends EntityConstructor>(
  Constructor: T,
  input: Partial<InstanceType<T>>
): Promise<any> => {
  const repository = AppDataSource.getRepository(Constructor);

  const instance = repository.create(input);
  const result = await validateAndSaveEntity(instance);

  return result;
};

export const updateEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  input: Partial<InstanceType<T>>
): Promise<any> => {
  const instance = await findEntityOrThrow(Constructor, {
    where: {
      id: Number(id),
    },
  });

  Object.assign(instance[0], input);
  // console.log(instance[0]);
  return validateAndSaveEntity(instance[0]);
};
