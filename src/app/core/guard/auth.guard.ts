import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../features/auth/services/auth.service";
import {UserService} from "../../shared/services/userService/user.service";



export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  if(authService.isAuthenticated()) {
    const userRole = userService.getUser()?.role || '';
    const allowedRoles = route.data['roles'] as Array<String>;
    if(!allowedRoles || allowedRoles.includes(userRole)) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
