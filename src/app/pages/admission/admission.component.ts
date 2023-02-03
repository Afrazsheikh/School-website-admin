
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {
 


  isAdmUpdating: boolean;
  AdmData: any;
  AdmissionForm: FormGroup;


  constructor(private api: ApiService,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.AdmissionForm = new FormGroup({
      title1: new FormControl(null, [Validators.required]),
      description1: new FormControl(null, [Validators.required]),
      title2: new FormControl(null, [Validators.required]),
      description2: new FormControl(null, [Validators.required]),
      title3: new FormControl(null, [Validators.required]),
      description3: new FormControl(null, [Validators.required]),
      title4: new FormControl(null, [Validators.required]),
      description4: new FormControl(null, [Validators.required]),
    });

    this.getAdmissions();
  }
  
  getAdmissions()
  {
    this.api.getAdmission().subscribe((resp) => {
      this.AdmData = resp.data.studCorner;
      this.getAdmissions();
    },
    (err: HttpErrorResponse) => {
      console.error(err);
      this.toaster.error(null, err.statusText);
    })
  }

  patchForm()
  {
    
    this.AdmissionForm.patchValue({
      title1: this.AdmData.title1,
      description1: this.AdmData.description1,
      title2: this.AdmData.title2,
      description2: this.AdmData.description2,
      title3: this.AdmData.title3,
      description3: this.AdmData.description3,
      title4: this.AdmData.title4,
      description4: this.AdmData.description4
    });
  }

  updateAdmmision()
  {
    this.isAdmUpdating = true;
    this.api.updateAdmission(this.AdmissionForm.value).subscribe((resp) => {
      this.isAdmUpdating = false;
      this.toaster.success(null, resp.message);
      console.log(resp);
    },
    (err: HttpErrorResponse) => {
      this.isAdmUpdating = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }


}
