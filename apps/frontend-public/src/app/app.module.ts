import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { FrontendToolsModule, TokenInterceptor, WINDOW } from '@zuokin-photos/frontend-tools';
import { MaterialModule } from '@zuokin-photos/vendors';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    // IosInstallComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    // ServiceWorkerModule.register(environment.serviceWorkerScript),
    NgxWebstorageModule.forRoot(),
    // SwiperModule,
    AppRoutingModule,
    FrontendToolsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    // {
    //   provide: SWIPER_CONFIG,
    //   useValue: DEFAULT_SWIPER_CONFIG
    // },
    {
      provide: WINDOW,
      useFactory: () => window
    },
    // { provide: MAT_DATE_LOCALE,
    //   useValue: 'fr-FR'
    // },
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },
    // { provide: MAT_DATE_FORMATS,
    //   useValue: MAT_MOMENT_DATE_FORMATS
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
