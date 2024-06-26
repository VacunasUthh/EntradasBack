import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';
import { RegistrosModule } from './registros/registros.module';
import { DocentesModule } from './docentes/docentes.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Carlos:20221021@estadia.qahyork.mongodb.net/RegistroAsistencias?retryWrites=true&w=majority&appName=Estadia'),
    RegistrosModule,
    DocentesModule,
    AlumnosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
