import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, EmailValidator} from '@angular/forms';
import { DemoService } from '../demo.service';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  form! : FormGroup;
  constructor(private router: Router, private _apiService: DemoService, private location: Location){}

  ngOnInit(): void {
    this.registerForm();
  }

  registerForm() {
    this.form = new FormGroup({
      username: new FormControl('',[Validators.required, this.noSpaceAllowed]),
      password: new FormControl('',[Validators.required, this.noSpaceAllowed]),
      password2: new FormControl('',[Validators.required, this.noSpaceAllowed]),
      email: new FormControl('',[Validators.required, this.noSpaceAllowed, Validators.email]),
      firstName: new FormControl('',[Validators.required, this.noSpaceAllowed]),
      lastName: new FormControl('',[Validators.required, this.noSpaceAllowed])
    },
    );
  }



  register() {


    const password = this.form.get('password')?.value;
    const password2 = this.form.get('password2')?.value;



    if (password !== password2) {
      alert('Passwords do not match!');
      return;
    }
    const newUsers = {
      username: this.form.value.username,
      password: this.form.value.password,
      password2: this.form.value.password2,
      email: this.form.value.email,
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,

    };

    this._apiService.register(newUsers)
    .subscribe({
      next:response => {
        console.log(response)
        alert("registeration successful");
        this.router.navigate(['/'])
    },

    error: (error: HttpErrorResponse) => {
      if (error.error && error.error.status === 400) {
        const errorMessages = Object.values(error.error).flat().join(", ");
        alert(errorMessages || "Read the instructions above the input fields and try again. TY");
      } else {
        alert("An error occurred. Please try again.");
      }
    }


    // error: (error: HttpErrorResponse) => {
    //   if(error.error && error.error.status == 400){
    //     alert(error.error.detail || "Read the instructions above the input fields and try again. TY");
    //   }
    //   else{
    //     alert(JSON.stringify(error) || "Please try again");
    //   }
    //   }

      }
    );
    }

    back() {
      this.location.back();
    }


    noSpaceAllowed(control: FormControl): ValidationErrors | null {
      if(control.value != null && control.value.indexOf(' ')!= -1){
        return {noSpaceAllowed:true}
      }
      return null;
    }


  }
