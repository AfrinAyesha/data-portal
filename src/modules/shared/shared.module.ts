import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedMaterialModule } from './shared-material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageBannerComponent } from './components/message-banner/message-banner.component';
import { UnauthHeaderComponent } from './components/unauth-header/unauth-header.component';

@NgModule({
  declarations: [LoaderComponent, MessageBannerComponent, UnauthHeaderComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, SharedMaterialModule],
  exports: [LoaderComponent, MessageBannerComponent, UnauthHeaderComponent],
})
export class SharedModule {}
