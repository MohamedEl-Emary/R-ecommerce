import { AbstractControl } from '@angular/forms';
import { AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, delay, map } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { environment } from 'src/environments/environment';
export function validateCode():AsyncValidatorFn{
   return (control:AbstractControl):Observable<ValidationErrors>=>{
    console.log(control);
    return check(control.value).pipe(
      map(res => {
        console.log(res,control.value);

          return res==0?{ codeNotExists: true }:{value:res};

      })
    );
  }

   function check(code:any):Observable<any>{
    return ajax.getJSON(environment.baseUrl+"User/CheckPromoCode?code="+code).pipe(delay(1000));
  }
}
