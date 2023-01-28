import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stud-corner',
  templateUrl: './stud-corner.component.html',
  styleUrls: ['./stud-corner.component.css']
})
export class StudCornerComponent implements OnInit {

  url1: any;
  url2: any;
  url3: any;
  url4: any;
  imageFile1: any;
  imageFile2: any;
  imageFile3: any;
  imageFile4: any;
  isImgUpdating: boolean;
  isStudUpdating: boolean;
  studData: any;
  studForm: FormGroup;

  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.studForm = new FormGroup({
      mainTitle: new FormControl(null, [Validators.required]),
      title1: new FormControl(null, [Validators.required]),
      desc1: new FormControl(null, [Validators.required]),
      title2: new FormControl(null, [Validators.required]),
      desc2: new FormControl(null, [Validators.required]),
      title3: new FormControl(null, [Validators.required]),
      desc3: new FormControl(null, [Validators.required]),
      title4: new FormControl(null, [Validators.required]),
      desc4: new FormControl(null, [Validators.required])
    });

    this.getStudData();
  }

  getStudData()
  {
    this.api.getStudentData().subscribe((resp) => {
      this.studData = resp.data.studCorner;
      this.patchForm();
    },
    (err: HttpErrorResponse) => {
      console.error(err);
      this.toaster.error(null, err.statusText);
    })
  }

  patchForm()
  {
    this.url1 = environment.imageBaseUrl + this.studData.img1;
    this.url2 = environment.imageBaseUrl + this.studData.img2;
    this.url3 = environment.imageBaseUrl + this.studData.img3;
    this.url4 = environment.imageBaseUrl + this.studData.img4;

    this.studForm.patchValue({
      mainTitle: this.studData.mainTitle,
      title1: this.studData.title1,
      desc1: this.studData.desc1,
      title2: this.studData.title2,
      desc2: this.studData.desc2,
      title3: this.studData.title3,
      desc3: this.studData.desc3,
      title4: this.studData.title4,
      desc4: this.studData.desc4
    });
  }

  onSelectFile(event, imgInd)
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      if(imgInd == 1) {
        this.imageFile1 = event.target.files[0];
      }
      else if(imgInd == 2) {
        this.imageFile2 = event.target.files[0];
      }
      else if(imgInd == 3) {
        this.imageFile3 = event.target.files[0];
      }
      else {
        this.imageFile4 = event.target.files[0];
      }


      reader.onload = (event) => {
        if(imgInd == 1) {
          this.url1 = event.target.result;
        }
        else if(imgInd == 2) {
          this.url2 = event.target.result;
        }
        else if(imgInd == 3) {
          this.url3 = event.target.result;
        }
        else {
          this.url4 = event.target.result;
        }
      }
    }
  }

  saveImg(imgInd: number)
  {
    this.isImgUpdating = true;
    let postData = new FormData();

    if(imgInd == 1) {
      postData.append('imgType', 'img1');
      postData.append('file', this.imageFile1, this.studData.img1);
    }
    else if(imgInd == 2) {
      postData.append('imgType', 'img2');
      postData.append('file', this.imageFile2, this.studData.img2);
    }
    else if(imgInd == 3) {
      postData.append('imgType', 'img3');
      postData.append('file', this.imageFile3, this.studData.img3);
    }
    else {
      postData.append('imgType', 'img4');
      postData.append('file', this.imageFile4, this.studData.img4);
    }

    this.api.updateStudData(postData).subscribe((resp) => {
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

  updateStudData()
  {
    this.isStudUpdating = true;
    this.api.updateStudData(this.studForm.value).subscribe((resp) => {
      this.isStudUpdating = false;
      this.toaster.success(null, resp.message);
      console.log(resp);
    },
    (err: HttpErrorResponse) => {
      this.isStudUpdating = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }

}
