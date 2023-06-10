import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SingUpOutput {
  @Field(() => String, { description: 'Nombre de usuario' })
  username: string;

  @Field(() => String, { description: 'Contraseña' })
  password: string;
}
