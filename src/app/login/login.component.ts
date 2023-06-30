import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private builder:FormBuilder, private toastr:ToastrService, private service:AuthService, private router: Router){
    sessionStorage.clear();
  }

  userdata:any;

  loginform = this.builder.group({
    username:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required),
  })

  proceedlogin(){
    if(this.loginform.valid){
    //   this.service.Proceedregister(this.loginform.value).subscribe(res=>{
    //     this.toastr.success('Please contact admin for enable access','Registered Successfully');
    //     this.router.navigate(['login']);
    //   })
    // }else{
    //   this.toastr.warning('please enter valid data');
    // }
    this.service.Getbycode(this.loginform.value.username).subscribe(res=>{
      this.userdata=res;
      console.log(this.userdata);
      if(this.userdata.password===this.loginform.value.password){
        if(this.userdata.isactive){
          sessionStorage.setItem('username',this.userdata.id),
          sessionStorage.setItem('userrole',this.userdata.role),
          this.router.navigate(['']);
        }else{
          this.toastr.error('Please Contact Admin','In Active User')
        }
      }else{
        this.toastr.error('invalid credentials')
      }
    });
  }
}

}
