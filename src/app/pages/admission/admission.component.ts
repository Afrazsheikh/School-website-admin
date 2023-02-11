
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {

  isAdmUpdating: boolean;
  admData: any;
  admissionForm: FormGroup;
  content: any;


  constructor(private api: ApiService,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.admissionForm = new FormGroup({
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
      this.admData = resp.data.admission;
      this.patchForm();
    },
    (err: HttpErrorResponse) => {
      console.error(err);
      this.toaster.error(null, err.statusText);
    })
  }

  patchForm()
  {

    this.admissionForm.patchValue({
      title1: this.admData.step1Title,
      description1: this.admData.step1Desc,
      title2: this.admData.step2Title,
      description2: this.admData.step2Desc,
      title3: this.admData.step3Title,
      description3: this.admData.step3Desc,
      title4: this.admData.step4Title,
      description4: this.admData.step4Desc
    });
  }

  updateAdmmision()
  {
    this.isAdmUpdating = true;
    this.api.updateAdmission(this.admissionForm.value).subscribe((resp) => {
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

  setContentData(event) {
    console.log(event);
  }


}
