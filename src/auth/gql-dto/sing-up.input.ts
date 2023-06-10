import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SingUpInput {
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacio' })
  @Field(() => String, { description: 'Nombre de usuario' })
  username: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacio' })
  @Field(() => String, { description: 'Contraseña' })
  password: string;
}
