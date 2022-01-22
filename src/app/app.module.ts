import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { AuthGuard } from 'src/shared/guards/auth.guard';

const CLIENT_ID = '586890447297-idgsdp375v9m9sslutp8e507gh50m82j.apps.googleusercontent.com'
// const CLIENT_SECRET = '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'

export const AppRoutes: Routes = [
  {
    path:'login',
    loadChildren: ()=> import('../app/login/login.module').then(module => module.LoginModule)
  },
  {
    path:'home',
    canActivate:[AuthGuard],
    loadChildren: ()=> import('../app/home/home.module').then(module => module.HomeModule)
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch: 'full'
  },
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(CLIENT_ID) // ? your client id
          },
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
