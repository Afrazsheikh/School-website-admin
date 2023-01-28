import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  url: any;
  imageFile: any;
  isImgUpdating: boolean;
  isCareerUpdating: boolean;
  careerData: any;
  careerForm: FormGroup;

  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.careerForm = new FormGroup({
      mainTitle: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });

    this.getCareerData();
  }

  getCareerData()
  {
    this.api.getCareerData().subscribe((resp) => {
      this.careerData = resp.data.careers;
      this.patchForm();
    },
    (err: HttpErrorResponse) => {
      console.error(err);
      this.toaster.error(null, err.statusText);
    })
  }

  patchForm()
  {
    this.url = environment.imageBaseUrl + this.careerData.img;
    this.careerForm.patchValue({
      mainTitle: this.careerData.mainTitle,
      description: this.careerData.description
    });
  }

  onSelectFile(event)
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      this.imageFile = event.target.files[0];

      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }

  saveImg()
  {
    this.isImgUpdating = true;
    let postData = new FormData();
    postData.append('file', this.imageFile, this.careerData.img);
    postData.append('imgType', 'img');

    this.api.updateCareers(postData).subscribe((resp) => {
      this.isImgUpdating = false;
      this.toaster.success(null, resp.message);
      console.log(resp);
    },
    (err: HttpErrorResponse) => {
      this.isImgUpdating = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }

  updateCareers()
  {
    this.isCareerUpdating = true;
    this.api.updateCareers(this.careerForm.value).subscribe((resp) => {
      this.isCareerUpdating = false;
      this.toaster.success(null, resp.message);
      console.log(resp);
    },
    (err: HttpErrorResponse) => {
      this.isCareerUpdating = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }

}
