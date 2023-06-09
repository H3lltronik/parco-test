import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ParkingModule } from './parking/parking.module';
import { join } from 'path';

const typeOrm = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'database', // coming from docker-compose.yml
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
});

const graphQl = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  playground: true,
});

@Module({
  imports: [typeOrm, graphQl, ParkingModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
