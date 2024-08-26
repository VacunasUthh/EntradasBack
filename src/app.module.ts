import { Module,  MiddlewareConsumer, NestModule, RequestMethod} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrosModule } from './registros/registros.module';
import { DocentesModule } from './docentes/docentes.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { CorsMiddleware } from './cors.middleware';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Admin_1:CuXJllRmrroLBNHy@estadia.qahyork.mongodb.net/?retryWrites=true&w=majority&appName=Estadia'),
                            
    RegistrosModule,
    DocentesModule,
    AlumnosModule,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
