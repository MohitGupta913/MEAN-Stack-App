import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor (private authService:AuthService, private router:Router,private flashMessages:FlashMessagesService){

    }
    canActivate(){
        if(this.authService.loggedIn()){
            return true;
        }
        else {
            this.flashMessages.show('Please Login first', {cssClass:'alert-danger', timeout: 3000});
            this.router.navigate(['/login']);
            return false;
        }
    }
}