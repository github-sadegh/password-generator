import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

const ACCESS_TOKEN = 'acc_T';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
    ) {}

    async canActivate() {
        if (!localStorage.getItem(ACCESS_TOKEN))
        {
            this.router.navigate(['/login']);
            return false;
        }
        else
        {
            return true;
        }
    }

}
