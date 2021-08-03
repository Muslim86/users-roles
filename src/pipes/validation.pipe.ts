import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { ValidationException } from "../exceptions/validate.exception";
import { validate } from "class-validator";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errorsValidate = await validate(obj)

    if (errorsValidate.length) {
      let errors = errorsValidate.map(err =>{
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`
      })

      throw new ValidationException({ success: false, errors })
    }

    return value;
  }
}