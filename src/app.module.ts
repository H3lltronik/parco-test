import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingModule } from './parking/parking.module';

const typeOrm = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [],
  synchronize: true,
});

@Module({
  imports: [ParkingModule, typeOrm],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
