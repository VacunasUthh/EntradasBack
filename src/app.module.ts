import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RegistrosModule } from './registros/registros.module';
import { DocentesModule } from './docentes/docentes.module';
import { AlumnosModule } from './alumnos/alumnos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),    MongooseModule.forRoot(process.env.MONGODB_URI),
    RegistrosModule,
    DocentesModule,
    AlumnosModule,
  ],
})
export class AppModule {}
