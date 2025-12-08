// src/app/shared/icons.module.ts
import { NgModule } from '@angular/core';
import {
  LucideAngularModule,
  Home, Users, FileText, Settings, Rocket, MessageCircle, Menu,
  FilePlus, User, Package, Bell, Truck, ClipboardList, Box
} from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      Home,
      Users,
      FileText,
      Settings,
      Rocket,
      MessageCircle,
      Menu,
      FilePlus,
      User,
      Package,
      Bell,
      Truck,
      ClipboardList,
      Box
    })
  ],
  exports: [
    LucideAngularModule
  ]
})
export class IconsModule {}
