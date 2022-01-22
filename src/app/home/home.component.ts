import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { LocalRepository } from 'src/shared/helper/local-repository';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[SocialAuthService]
})
export class HomeComponent implements OnInit {

  currentUser: SocialUser = new SocialUser();

  defalutAvatar: string = '';
  initUser: boolean = false;

  constructor(
    private localRepo: LocalRepository,
    private socialAuthService: SocialAuthService,
  ) { }

  ngOnInit(): void {
    this.socialAuthService.initState.subscribe(user => {
      if(user){
        this.initUser = true;
        if(this.localRepo.IsInBrowser){
          this.socialAuthService.authState.subscribe(res => {
            if(res.id){
              this.currentUser = res;
              this.currentUser.photoUrl = 'asdfasd'
              this.defalutAvatar = `https://eu.ui-avatars.com/api/?name=${this.currentUser.firstName}+${this.currentUser.lastName}`;
            }
          })
        }
      }
    })
  }

  errorHandler(event: any){
    event.target.src = this.defalutAvatar;
  }

}
