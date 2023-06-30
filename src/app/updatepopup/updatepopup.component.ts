import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.scss']
})
export class UpdatepopupComponent implements OnInit{

  constructor(private builder:FormBuilder, private service:AuthService, 
    @Inject(MAT_DIALOG_DATA) public data:any, private toast:ToastrService,
    private dialog:MatDialogRef<UpdatepopupComponent>){
  }

  editdata:any;
  rolelist:any;

  registerform = this.builder.group({
    id:this.builder.control(''),
    name:this.builder.control(''),
    password:this.builder.control(''),
    email:this.builder.control(''),
    gender:this.builder.control('male'),
    role:this.builder.control('',Validators.required),
    isactive:this.builder.control(false)
  });

  
  ngOnInit(): void {
    this.service.GetAllRole().subscribe(res=>{
      this.rolelist=res;
      console.log(res);
    })
    if(this.data.usercode!=null && this.data.usercode!=''){
      this.service.Getbycode(this.data.usercode).subscribe(res=>{
        // this.editdata = res;
        // this.registerform.setValue({id:this.editdata.id, name:this.editdata.name, email:this.editdata.email,
        //   password:this.editdata.password, role:this.editdata.role, gender:this.editdata.gender, 
        //   isactive:this.editdata.isactive})

        this.registerform.patchValue(res);
      })
    }
  }

  updateuser(){
    if(this.registerform.valid){
      this.service.Updateuser(this.registerform.value.id,this.registerform.value).subscribe(res=>{
        this.toast.success('Updated Successfully..');
        this.dialog.close();
      })
    }else{
      this.toast.warning('Please Select Role..');
    }
  }
}
