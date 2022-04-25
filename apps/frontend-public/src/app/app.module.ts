import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { FrontendToolsModule, TokenInterceptor, WINDOW } from '@zuokin-photos/frontend-tools';
import { MaterialModule } from '@zuokin-photos/vendors';
import { AppComponent, NavigationService } from './app.component';
import { RetainScrollPolyfillModule } from './modules/retain-scroll-polyfill/retain-scroll-polyfill.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
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
    RetainScrollPolyfillModule.forRoot({
			// Tell the polyfill how long to poll the document after a route change in
			// order to look for elements that need to be restored to a previous offset.
			pollDuration: 3000,
			pollCadence: 50
		}),
    NgxWebstorageModule.forRoot(),
    // SwiperModule,
    AppRoutingModule,
    FrontendToolsModule,
    MaterialModule
  ],
  providers: [
    NavigationService,
    {
      provide: WINDOW,
      useFactory: () => window
    },
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
