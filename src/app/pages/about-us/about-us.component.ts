import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';





@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  url: any;
  imageFile: any;
  // isImgUpdating: boolean;
  isMessageUpdating: boolean;
  messageData: any;
  messageForm: FormGroup;

AboutUsData:  any
aboutUs: FormGroup;
url1: any;
url2: any;
url3: any;
imageFile1: any;
imageFile2: any;
imageFile3: any;
isImgUpdating: boolean;
isStudUpdating: boolean;

aboutUsData :  any

  constructor(private api: ApiService,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      message: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });

    this.aboutUs = new FormGroup({
      mainTitle: new FormControl(null, [Validators.required]),
      title1: new FormControl(null, [Validators.required]),
      desc1: new FormControl(null, [Validators.required]),
      title2: new FormControl(null, [Validators.required]),
      desc2: new FormControl(null, [Validators.required]),
      title3: new FormControl(null, [Validators.required]),
      desc3: new FormControl(null, [Validators.required]),
    });
    this.getAboutUs();
  }
  

 


  
  updateMessage()
  {
    this.isMessageUpdating = true;
    this.api.updateAbouUsMessage(this.messageForm.value).subscribe((resp) => {
      this.isMessageUpdating = false;
      this.toaster.success(null, resp.message);
      console.log(resp);
    },
    (err: HttpErrorResponse) => {
      this.isMessageUpdating = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }
  saveImgMessage(){
  
    this.isImgUpdating = true;
    let postData = new FormData();
    postData.append('file', this.imageFile, this.messageData.img);
    postData.append('imgType', 'img');

    this.api.updateAbouUsMessage(postData).subscribe((resp) => {
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

  
  patchFormData(){
    this.url = environment.imageBaseUrl + this.messageData.img;
    this.messageForm.patchValue({
      mainTitle: this.messageData.mainTitle,
      description: this.messageData.description
    });
  }

  onSelectFileMes(event)
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

  getAboutUs()
  {
    this.api.getStudentData().subscribe((resp) => {
      this.AboutUsData = resp.data.studCorner;
      this.getAboutUs();
    },
    (err: HttpErrorResponse) => {
      console.error(err);
      this.toaster.error(null, err.statusText);
    })
  }

  
  patchForm()
  {
    this.url1 = environment.imageBaseUrl + this.aboutUsData.img1;
    this.url2 = environment.imageBaseUrl + this.aboutUsData.img2;
    this.url3 = environment.imageBaseUrl + this.aboutUsData.img3;
   

    this.aboutUs.patchValue({
      mainTitle: this.aboutUsData.mainTitle,
      title1: this.aboutUsData.title1,
      desc1: this.aboutUsData.desc1,
      title2: this.aboutUsData.title2,
      desc2: this.aboutUsData.desc2,
      title3: this.aboutUsData.title3,
      desc3: this.aboutUsData.desc3,
    
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
    
      else {
        this.imageFile3 = event.target.files[0];
      }


      reader.onload = (event) => {
        if(imgInd == 1) {
          this.url1 = event.target.result;
        }
        else if(imgInd == 2) {
          this.url2 = event.target.result;
        }
      
        else {
          this.url3 = event.target.result;
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
      postData.append('file', this.imageFile1, this.aboutUsData.img1);
    }
    else if(imgInd == 2) {
      postData.append('imgType', 'img2');
      postData.append('file', this.imageFile2, this.aboutUsData.img2);
    }
   
    else {
      postData.append('imgType', 'img3');
      postData.append('file', this.imageFile3, this.aboutUsData.img3);
    }

    this.api.updateAboutUs(postData).subscribe((resp) => {
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

  updateAboutUS()
  {
    this.isStudUpdating = true;
    this.api.updateAboutUs(this.aboutUs.value).subscribe((resp) => {
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
