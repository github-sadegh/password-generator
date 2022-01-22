import { Component, OnInit } from '@angular/core';
import { LocalRepository } from 'src/shared/helper/local-repository';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

const ACCESS_TOKEN = 'acc_T';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SocialAuthService]
})
export class LoginComponent implements OnInit {
  accessToLoginWithGoogle: boolean = false;

  constructor(
    private router: Router,
    private localRepo: LocalRepository,
    private socialAuthService: SocialAuthService,
  ) {
  }

  ngOnInit(): void {

    if (this.localRepo.getItem(ACCESS_TOKEN)) {
      this.router.navigate(['/home']);
    }
    else {
      this.socialAuthService.initState.subscribe(res => {
        if (res) {
          this.accessToLoginWithGoogle = res;
        }
      });
    }
  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.socialAuthService.authState.subscribe(res => {
        if (this.localRepo.IsInBrowser) {
          this.localRepo.setItem(ACCESS_TOKEN, res.authToken);
        }
      });
    });
  }
}
