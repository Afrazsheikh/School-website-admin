import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent implements OnInit {
  url: any;
  imageFile: any;
  // isImgUpdating: boolean;
  isMessageUpdating: boolean;
  messageData: any;
  messageForm: FormGroup;

aboutUsData:  any
facilityForm: FormGroup;
url1: any;
url2: any;
url3: any;
url4: any;
imageFile1: any;
imageFile2: any;
imageFile3: any;
imageFile4: any;
imageFile5: any;
imageFile6: any;
imageFile7: any;
imageFile8: any;


isImgUpdating: boolean;
isStudUpdating: boolean;
  facilityData: any;
  url5: any;
  url6: any;
  url9: any;
  imageFile9: any;


  constructor(private api: ApiService,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      message: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
    

    this.facilityForm = new FormGroup({
      mainTitle: new FormControl(null, [Validators.required]),
      mainDesc: new FormControl(null, [Validators.required]),
      titleLeft: new FormControl(null, [Validators.required]),
      titleRight: new FormControl(null, [Validators.required]),
      titleSubLeft1: new FormControl(null, [Validators.required]),
      titleSubLeft2: new FormControl(null, [Validators.required]),
      titleSubLeft3: new FormControl(null, [Validators.required]),
      titleSubLeft4: new FormControl(null, [Validators.required]),
      titleSubLeft5: new FormControl(null, [Validators.required]),
    
      

      summaryL1: new FormControl(null, [Validators.required]),
      summaryL2: new FormControl(null, [Validators.required]),
      summaryL3: new FormControl(null, [Validators.required]),
      summaryL4: new FormControl(null, [Validators.required]),
      summaryL5: new FormControl(null, [Validators.required]),
      summary1: new FormControl(null, [Validators.required]),

      titleSubRight1: new FormControl(null, [Validators.required]),
      titleSubRight2: new FormControl(null, [Validators.required]),
      titleSubRight3: new FormControl(null, [Validators.required]),
      titleSubRight4: new FormControl(null, [Validators.required]),
      titleSubRight5: new FormControl(null, [Validators.required]),

      desc1: new FormControl(null, [Validators.required]),
      desc2: new FormControl(null, [Validators.required]),
      desc3: new FormControl(null, [Validators.required]),
      desc4: new FormControl(null, [Validators.required]),
      desc5: new FormControl(null, [Validators.required]),
    

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
console.log(this.imageFile, this.messageData.img);

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
    this.api.getFacility().subscribe((resp) => {
      this.facilityData = resp.data.facility;
      console.log(this.facilityData);
      
      this.patchForm();
    },
    (err: HttpErrorResponse) => {
      console.error(err);
      this.toaster.error(null, err.statusText);
    })
  }


  patchForm()
  {
    this.url1 = environment.imageBaseUrl + this.facilityData.imgF1;
    this.url2 = environment.imageBaseUrl + this.facilityData.imgF2;
    this.url3 = environment.imageBaseUrl + this.facilityData.imgF3;
    this.url4 = environment.imageBaseUrl + this.facilityData.imgF4;
    this.url5 = environment.imageBaseUrl + this.facilityData.imgF5;
    this.url6 = environment.imageBaseUrl + this.facilityData.imgF6;
    this.url9 = environment.imageBaseUrl + this.facilityData.imgFNew;

  


    this.facilityForm.patchValue({
    
      mainTitle:  this.facilityData.mainTitle,
      mainDesc:  this.facilityData.mainDesc,
      titleLeft: this.facilityData.titleLeft,
      titleRight: this.facilityData.titleRight,
      titleSubLeft1: this.facilityData.titleSubLeft1,
      titleSubLeft2: this.facilityData.titleSubLeft2,
      titleSubLeft3: this.facilityData.titleSubLeft3,
      titleSubLeft4: this.facilityData.titleSubLeft4,
      titleSubLeft5: this.facilityData.titleSubLeft5,

      summaryL1: this.facilityData.summaryL1,
      summaryL2: this.facilityData.summaryL2,
      summaryL3: this.facilityData.summaryL3,
      summaryL4: this.facilityData.summaryL4,
      summaryL5: this.facilityData.summaryL5,
     

      titleSubRight1: this.facilityData.titleSubRight1,
      titleSubRight2: this.facilityData.titleSubRight2,
      titleSubRight3: this.facilityData.titleSubRight3,
      titleSubRight4: this.facilityData.titleSubRight4,
      titleSubRight5: this.facilityData.titleSubRight5,

      desc1: this.facilityData.desc1,
      desc2: this.facilityData.desc2,
      desc3: this.facilityData.desc3,
      desc4: this.facilityData.desc4,
      desc5: this.facilityData.desc5,
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
      else if(imgInd == 4) {
        this.imageFile4 = event.target.files[0];
      }  else if(imgInd == 5) {
        this.imageFile5 = event.target.files[0];
      } 
      else if(imgInd == 7) {
        this.imageFile9 = event.target.files[0];
      } 
      else {
        this.imageFile6 = event.target.files[0];
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
        else if(imgInd == 4) {
          this.url4 = event.target.result;
        }  else if(imgInd == 5) {
          this.url5 = event.target.result;
        }
        else if(imgInd == 7) {
          this.url9 = event.target.result;
        }
        else {
          this.url6 = event.target.result;
        }
      }
    }
  }

  saveImg(imgInd: number)
  {
    this.isImgUpdating = true;
    let postData = new FormData();

    if(imgInd == 1) {
      postData.append('imgType', 'imgF1');
      postData.append('file', this.imageFile1, this.facilityData.imgF1);
    }
    else if(imgInd == 2) {
      postData.append('imgType', 'imgF2');
      postData.append('file', this.imageFile2, this.facilityData.imgF2);
    }

    else if(imgInd == 3) {
      postData.append('imgType', 'imgF3');
      postData.append('file', this.imageFile3, this.facilityData.imgF3);
    }
    else if(imgInd == 4) {
      postData.append('imgType', 'imgF4');
      postData.append('file', this.imageFile4, this.facilityData.imgF4);
      
    }
    else if(imgInd == 5) {
      postData.append('imgType', 'imgF5');
      postData.append('file', this.imageFile5, this.facilityData.imgF5);
    }
    else if(imgInd == 7) {
      postData.append('imgType', 'imgFNew');
      postData.append('file', this.imageFile9, this.facilityData.imgFNew);
    }
    else {
      postData.append('imgType', 'imgF6');
      postData.append('file', this.imageFile6, this.facilityData.imgF6);
    }

    this.api.addFacility(postData).subscribe((resp) => {
      console.log(resp);
      
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

  updateFacilites()
  {
    this.isStudUpdating = true;
    this.api.addFacility(this.facilityForm.value).subscribe((resp) => {
      this.isStudUpdating = false;
      this.toaster.success(null, resp.message);
      console.log(resp);
      this.getAboutUs()
    },
    (err: HttpErrorResponse) => {
      this.isStudUpdating = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }



}
