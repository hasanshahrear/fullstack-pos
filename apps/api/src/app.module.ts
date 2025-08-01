import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BrandsModule } from './modules/brands/brands.module';
import { UnitsModule } from './modules/units/units.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { StockTransfersModule } from './modules/stock-transfers/stock-transfers.module';
import { ReturnsModule } from './modules/returns/returns.module';
import { ActivityLogsModule } from './modules/activity-logs/activity-logs.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    UnitsModule,
    SuppliersModule,
    PaymentsModule,
    StockTransfersModule,
    ReturnsModule,
    ActivityLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
