import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-sections',
  templateUrl: './home-sections.component.html',
  styleUrls: ['./home-sections.component.css']
})
export class HomeSectionsComponent implements OnInit {
  environment = environment;
  sec1Url1: any;
  sec1Url2: any;
  sec1File1: any;
  sec1File2: any;
  isSectionLoading: boolean;
  sec1Slides: any[] = [];


  selectedSlide: any;
  slideForm: FormGroup;

  section2Form: FormGroup;
  sec2Data: any;
  sec2Url1: any;
  sec2Url2: any;
  sec2Url3: any;
  sec2File1: any;
  sec2File2: any;
  sec2File3: any;

  section3Form: FormGroup;
  sec3Data: any;
  sec3Url1: any;
  sec3Url2: any;
  sec3File1: any;
  sec3File2: any;

  section7Form: FormGroup;
  sec7Data: any;
  sec7Url1: any;
  sec7Url2: any;
  sec7Url3: any;
  sec7Url4: any;
  sec7Url5: any;
  sec7File1: any;
  sec7File2: any;
  sec7File3: any;
  sec7File4: any;
  sec7File5: any;

  section4Form: FormGroup;
  sec4File1: any;
  slide4Form: FormGroup;
  sec4Url1: any;
  sec4Slides: any[] = [];

  section5Form : FormGroup;
  sec5Slides: any[] = [];
  sec5Url1: any;
  sec5File1: any;

  section6Form : FormGroup;
  sec6Slides: any[] = [];
  sec6Url1: any;
  sec6File1: any;


  constructor(private api: ApiService, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.getSection1();

    this.slideForm = new FormGroup({
      title: new FormControl(null, [Validators.required])
    })

    this.section2Form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      bottomText1: new FormControl(null, [Validators.required]),
      bottomText2: new FormControl(null, [Validators.required]),
      bottomText3: new FormControl(null, [Validators.required]),
      bottomSubText1: new FormControl(null, [Validators.required]),
      bottomSubText2: new FormControl(null, [Validators.required]),
      bottomSubText3: new FormControl(null, [Validators.required]),
    })

    this.section3Form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      videoUrl: new FormControl(null, [Validators.required]),
    })

    this.section2Form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      bottomText1: new FormControl(null, [Validators.required]),
      bottomText2: new FormControl(null, [Validators.required]),
      bottomText3: new FormControl(null, [Validators.required]),
      bottomSubText1: new FormControl(null, [Validators.required]),
      bottomSubText2: new FormControl(null, [Validators.required]),
      bottomSubText3: new FormControl(null, [Validators.required]),
    })

    this.slide4Form = new FormGroup ({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
    })

    this.section5Form =  new FormGroup({
      heading : new FormControl(null, [Validators.required]),
      newsDate: new FormControl(null, [Validators.required]),
    })

    this.section6Form = new FormGroup({
      fromYear: new FormControl(null, [Validators.required]),
      toYear: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      subTitle: new FormControl(null, [Validators.required]),
    })

    this.section7Form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      subTitle: new FormControl(null, [Validators.required]),
      topLeftText: new FormControl(null, [Validators.required]),
      bottomLeftText: new FormControl(null, [Validators.required]),
      topRightText: new FormControl(null, [Validators.required]),
      bottomRightText: new FormControl(null, [Validators.required]),
    })
  }

  onTabChange(event: any) {
    if(event.index == 0) {
      this.getSection1();
    }
    else if(event.index == 1) {
      this.getSection2();
    }
    else if(event.index == 2) {
      this.getSection3();
    }
    else if(event.index == 3) {
        this.getSection4();
    }
    else if(event.index == 4) {
      this.getSection5();
    }
    else if(event.index == 5) {
      this.getSection6();
    }
    else {
      this.getSection7();
    }

  }

  getSection1() {
    this.api.getSection1().subscribe((resp: any) => {
      console.log(resp);
      this.sec1Slides = resp.data.section1;
    },
    (err) => {
      console.error(err);
    })
  }

  onSelectFile(event, img: number)
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      if(img == 1) {
        this.sec1File1 = event.target.files[0];
      }
      else {
        this.sec1File2 = event.target.files[0];
      }

      reader.onload = (event) => {
        if(img == 1) {
          this.sec1Url1 = event.target.result;
        }
        else if(img == 2) {
          this.sec1Url2 = event.target.result;
        }
      }
    }
  }

  addSection1Slide()
  {
    this.isSectionLoading = true;
    let postData = new FormData();
    postData.append('file[]', this.sec1File1);
    postData.append('file[]', this.sec1File2);
    postData.append('title', this.slideForm.value.title);
    postData.append('secType', 'sec1');

    this.api.addHomeSlide(postData).subscribe((resp) => {
      this.isSectionLoading = false;
      document.getElementById('addClose')?.click();
      this.getSection1();
      console.log(resp);
    },
    (err) => {
      this.isSectionLoading = false;
      console.error(err);
    })
  }

  setEditedSlide(slide: any)
  {
    this.selectedSlide = slide;
    this.slideForm.patchValue({title: this.selectedSlide.title});
    this.sec1Url1 = environment.imageBaseUrl + this.selectedSlide.slideImg1;
    this.sec1Url2 = environment.imageBaseUrl + this.selectedSlide.slideImg2;
  }

  setDeletedSlide(slide: any) {
    this.selectedSlide = slide;
  }

  clearSlide()
  {
    this.selectedSlide = null;
    this.slideForm.patchValue({title: null});
    this.sec1Url1 = null;
    this.sec1Url2 = null;
    this.sec1File1 = null;
    this.sec1File2 = null;
    let file: any = document.getElementById('addSlide1');
    file.value = null;
    file = document.getElementById('addSlide2');
    file.value = null;
    file = document.getElementById('editSlide1');
    file.value = null;
    file = document.getElementById('editSlide2');
    file.value = null;
  }

  editSection1Slide()
  {
    this.isSectionLoading = true;
    let postData = new FormData();
    if(this.sec1File1) {
      postData.append('file[]', this.sec1File1, this.selectedSlide.slideImg1);
    }

    if(this.sec1File2) {
      postData.append('file[]', this.sec1File2, this.selectedSlide.slideImg2);
    }

    postData.append('id', this.selectedSlide._id);
    postData.append('title', this.slideForm.value.title);
    postData.append('secType', 'sec1');

    this.api.editHomeSlide(postData).subscribe((resp) => {
      this.isSectionLoading = false;
      document.getElementById('editClose')?.click();
      this.getSection1();
      console.log(resp);
    },
    (err) => {
      this.isSectionLoading = false;
      console.error(err);
    })
  }

  deleteSection1Slide()
  {
    this.isSectionLoading = true;

    this.api.deleteHomeSlide(this.selectedSlide._id).subscribe((resp) => {
      this.isSectionLoading = false;
      document.getElementById('delClose')?.click();
      this.getSection1();
      console.log(resp);
    },
    (err) => {
      this.isSectionLoading = false;
      console.error(err);
    })
  }

  // For Section 2
  getSection2()
  {
    this.api.getSection2().subscribe((resp: any) => {
      this.sec2Data = resp.data.section2;
      this.patchSection2Data();
    },
    (err) => {
      console.error(err);
    })
  }

  updateSection2()
  {
    this.isSectionLoading = true;
    let postData = this.section2Form.value;
    postData["bottomImage1"] = this.sec2Data.bottomImage1;
    postData["bottomImage2"] = this.sec2Data.bottomImage2;
    postData["bottomImage3"] = this.sec2Data.bottomImage3;
    postData["secType"] = "sec2";
    this.api.updateSection2(postData).subscribe((resp) => {
      console.log(resp);
      this.isSectionLoading = false;
      this.getSection2();
    },
    (err) => {
      console.error(err);
      this.isSectionLoading = false;
    })
  }

  onSelectSec2File(event, imgInd)
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      if(imgInd == 1) {
        this.sec2File1 = event.target.files[0];
      }
      else if(imgInd == 2) {
        this.sec2File2 = event.target.files[0];
      }
      else {
        this.sec2File3 = event.target.files[0];
      }


      reader.onload = (event) => {
        if(imgInd == 1) {
          this.sec2Url1 = event.target.result;
        }
        else if(imgInd == 2) {
          this.sec2Url2 = event.target.result;
        }
        else {
          this.sec2Url3 = event.target.result;
        }
      }
    }
  }

  saveSection2Img(imgInd: number)
  {
    this.isSectionLoading = true;
    let postData = new FormData();
    if(imgInd == 1) {
      postData.append('imgType', 'bottom1');
      postData.append('file', this.sec2File1, this.sec2Data.bottomImage1);
    }
    else if(imgInd == 2) {
      postData.append('imgType', 'bottom2');
      postData.append('file', this.sec2File2, this.sec2Data.bottomImage2);
    }
    else {
      postData.append('imgType', 'bottom3');
      postData.append('file', this.sec2File3, this.sec2Data.bottomImage3);
    }


    this.api.updateSection2Img(postData).subscribe((resp) => {
      this.isSectionLoading = false;
      this.toaster.success(null, resp.message);
      console.log(resp);
    },
    (err: HttpErrorResponse) => {
      this.isSectionLoading = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }

  patchSection2Data()
  {
    this.section2Form.patchValue({
      title: this.sec2Data.title,
      description: this.sec2Data.description,
      bottomText1: this.sec2Data.bottomText1,
      bottomText2: this.sec2Data.bottomText2,
      bottomText3: this.sec2Data.bottomText3,
      bottomSubText1: this.sec2Data.bottomSubText1,
      bottomSubText2: this.sec2Data.bottomSubText2,
      bottomSubText3: this.sec2Data.bottomSubText3,
    });

    this.sec2Url1 = environment.imageBaseUrl + this.sec2Data.bottomImage1;
    this.sec2Url2 = environment.imageBaseUrl + this.sec2Data.bottomImage2;
    this.sec2Url3 = environment.imageBaseUrl + this.sec2Data.bottomImage3;
  }

  // For Section 3
  getSection3()
  {
    this.api.getSection3().subscribe((resp: any) => {
      this.sec3Data = resp.data.section3;
      this.patchSection3Data();
    },
    (err) => {
      console.error(err);
    })
  }

  patchSection3Data()
  {
    this.section3Form.patchValue({
      title: this.sec3Data.title,
      description: this.sec3Data.description,
      videoUrl: this.sec3Data.videoUrl,
    });

    this.sec3Url1 = environment.imageBaseUrl + this.sec3Data.img;
    this.sec3Url2 = environment.imageBaseUrl + this.sec3Data.videoThumb;
  }

  updateSection3()
  {
    this.isSectionLoading = true;
    let postData = this.section3Form.value;
    postData["img"] = this.sec3Data.img;
    postData["videoThumb"] = this.sec3Data.videoThumb;
    postData["secType"] = "sec3";
    this.api.updateSection2(postData).subscribe((resp) => {
      console.log(resp);
      this.isSectionLoading = false;
      this.getSection3();
    },
    (err) => {
      console.error(err);
      this.isSectionLoading = false;
    })
  }

  onSelectSec3File(event, imgInd)
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      if(imgInd == 1) {
        this.sec3File1 = event.target.files[0];
      }
      else {
        this.sec3File2 = event.target.files[0];
      }

      reader.onload = (event) => {
        if(imgInd == 1) {
          this.sec3Url1 = event.target.result;
        }
        else {
          this.sec3Url2 = event.target.result;
        }
      }
    }
  }

  saveSection3Img(imgInd: number)
  {
    this.isSectionLoading = true;
    let postData = new FormData();
    if(imgInd == 1) {
      postData.append('imgType', 'img');
      postData.append('file', this.sec3File1, 'section3Img.jpg');
    }
    else {
      postData.append('imgType', 'thumb');
      postData.append('file', this.sec3File2, 'section3Thumb.jpg');
    }

    this.api.updateSection3Img(postData).subscribe((resp) => {
      this.isSectionLoading = false;
      this.toaster.success(null, resp.message);
      console.log(resp);
    },
    (err: HttpErrorResponse) => {
      this.isSectionLoading = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }

  // For Section 7

  getSection7()
  {
    this.api.getSection7().subscribe((resp: any) => {
      this.sec7Data = resp.data.section7;
      this.patchSection7Data();
    },
    (err) => {
      console.error(err);
    })
  }

  updateSection7()
  {
    this.isSectionLoading = true;
    let postData = this.section7Form.value;
    postData["topLeftImage"] = this.sec7Data.topLeftImage;
    postData["topRightImage"] = this.sec7Data.topRightImage;
    postData["centerImage"] = this.sec7Data.centerImage;
    postData["bottomLeftImage"] = this.sec7Data.bottomLeftImage;
    postData["bottomRightImage"] = this.sec7Data.bottomRightImage;
    postData["secType"] = "sec7";
    this.api.updateSection7(postData).subscribe((resp) => {
      console.log(resp);
      this.isSectionLoading = false;
      this.getSection7();
    },
    (err) => {
      console.error(err);
      this.isSectionLoading = false;
    })
  }

  patchSection7Data()
  {
    this.section7Form.patchValue({
      title: this.sec7Data.title,
      subTitle: this.sec7Data.subTitle,
      topLeftText: this.sec7Data.topLeftText,
      topRightText: this.sec7Data.topRightText,
      bottomLeftText: this.sec7Data.bottomLeftText,
      bottomRightText: this.sec7Data.bottomRightText,
    });

    this.sec7Url1 = environment.imageBaseUrl + this.sec7Data.topLeftImage;
    this.sec7Url2 = environment.imageBaseUrl + this.sec7Data.centerImage;
    this.sec7Url3 = environment.imageBaseUrl + this.sec7Data.topRightImage;
    this.sec7Url4 = environment.imageBaseUrl + this.sec7Data.bottomLeftImage;
    this.sec7Url5 = environment.imageBaseUrl + this.sec7Data.bottomRightImage;
  }

  onSelectSec7File(event, imgInd)
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      if(imgInd == 1) {
        this.sec7File1 = event.target.files[0];
      }
      else if(imgInd == 2) {
        this.sec7File2 = event.target.files[0];
      }
      else if(imgInd == 3) {
        this.sec7File3 = event.target.files[0];
      }
      else if(imgInd == 4) {
        this.sec7File4 = event.target.files[0];
      }
      else {
        this.sec7File5 = event.target.files[0];
      }


      reader.onload = (event) => {
        if(imgInd == 1) {
          this.sec7Url1 = event.target.result;
        }
        else if(imgInd == 2) {
          this.sec7Url2 = event.target.result;
        }
        else if(imgInd == 3) {
          this.sec7Url3 = event.target.result;
        }
        else if(imgInd == 4) {
          this.sec7Url4 = event.target.result;
        }
        else {
          this.sec7Url5 = event.target.result;
        }
      }
    }
  }

  saveSection7Img(imgInd: number)
  {
    this.isSectionLoading = true;
    let postData = new FormData();
    if(imgInd == 1) {
      postData.append('imgType', 'topLeft');
      postData.append('file', this.sec7File1, this.sec7Data.topLeftImage);
    }
    else if(imgInd == 2) {
      postData.append('imgType', 'center');
      postData.append('file', this.sec7File2, this.sec7Data.centerImage);
    }
    else if(imgInd == 3) {
      postData.append('imgType', 'topRight');
      postData.append('file', this.sec7File3, this.sec7Data.topRightImage);
    }
    else if(imgInd == 4) {
      postData.append('imgType', 'bottomLeft');
      postData.append('file', this.sec7File4, this.sec7Data.bottomLeftImage);
    }
    else {
      postData.append('imgType', 'bottomRight');
      postData.append('file', this.sec7File5, this.sec7Data.bottomRightImage);
    }

    this.api.updateSection7Img(postData).subscribe((resp) => {
      this.isSectionLoading = false;
      this.toaster.success(null, resp.message);
      console.log(resp);
    },
    (err: HttpErrorResponse) => {
      this.isSectionLoading = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }

  // For Section 6
  getSection6()
  {
    this.api.getSection6().subscribe((resp: any) => {
      console.log(resp);
      this.sec6Slides = resp.data.section6;
    },
    (err) => {
      console.error(err);
    })
  }

  addSection6Slide()
  {
    this.isSectionLoading = true;
    let postData = new FormData();
    postData.append('file', this.sec6File1);
    postData.append('title', this.section6Form.value.title);
    postData.append('subTitle', this.section6Form.value.subTitle);
    postData.append('fromYear', this.section6Form.value.fromYear);
    postData.append('toYear', this.section6Form.value.toYear);
    postData.append('secType', 'sec6');

    this.api.addHomeSlide(postData).subscribe((resp) => {
      console.log("resp5", resp);

      this.isSectionLoading = false;
      document.getElementById('addSec6Close')?.click();
      let fileInp: any = document.getElementById('addEventCoverInp');
      fileInp.value = null;
      this.getSection6();
      console.log(resp);
    },
    (err) => {
      this.isSectionLoading = false;
      console.error(err);
    })
  }

  setEditedSlide6(slide: any)
  {
    this.selectedSlide = slide;
    this.section6Form.patchValue({
      fromYear: this.selectedSlide.academicYear.from,
      toYear: this.selectedSlide.academicYear.to,
      title: this.selectedSlide.title,
      subTitle: this.selectedSlide.subTitle
    });

    this.sec6Url1 = environment.imageBaseUrl + this.selectedSlide.coverImage;
  }

  editSection6Slide()
  {
    this.isSectionLoading = true;
    let postData = new FormData();
    if(this.sec6File1) {
      postData.append('file', this.sec6File1, this.selectedSlide.coverImage);
    }

    postData.append('id', this.selectedSlide._id);
    postData.append('title', this.section6Form.value.title);
    postData.append('subTitle', this.section6Form.value.subTitle);
    postData.append('fromYear', this.section6Form.value.fromYear);
    postData.append('toYear', this.section6Form.value.toYear);
    postData.append('secType', 'sec6');

    this.api.editHomeSlide(postData).subscribe((resp) => {
      this.isSectionLoading = false;
      document.getElementById('editSec6Close')?.click();
      this.getSection6();
      console.log(resp);
    },
    (err) => {
      this.isSectionLoading = false;
      console.error(err);
    })
  }

  deleteSection6Slide()
  {
    this.isSectionLoading = true;
    this.api.deleteSec6Slide(this.selectedSlide._id).subscribe((resp) => {
      this.isSectionLoading = false;
      document.getElementById('delSec6Close')?.click();
      this.getSection6();
      console.log(resp);
    },
    (err) => {
      this.isSectionLoading = false;
      console.error(err);
    })
  }

  onSelectEventCoverFile(event)
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      this.sec6File1 = event.target.files[0];

      reader.onload = (event) => {
        this.sec6Url1 = event.target.result;
      }
    }
  }

  clearGalleryData()
  {
    this.section6Form.patchValue({
      fromYear: null,
      toYear: null,
      title: null,
      subTitle: null
    })
  }

  //section4

  getSection4()
  {
    this.api.getSection4().subscribe((resp: any) => {
      console.log(resp, "getSection4 -------------");
      this.sec4Slides = resp.data.section4;
    },
    (err) => {
      console.error(err);
    })
  }

  addSection4Slide()
  {
    this.isSectionLoading = true;
    let postData = new FormData();
    postData.append('file', this.sec4File1);
    postData.append('title', this.slide4Form.value.title);
    postData.append('description', this.slide4Form.value.description);
    postData.append('secType', 'sec4');

    this.api.addFrontSlide(postData).subscribe((resp) => {
      this.isSectionLoading = false;
      document.getElementById('addSec4Close')?.click();
      this.getSection4();
      console.log(resp);
    },
    (err) => {
      this.isSectionLoading = false;
      console.error(err);
    })
  }

  onSelectFile4(event)
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      this.sec4File1 = event.target.files[0];

      reader.onload = (event) => {
        this.sec4Url1 = event.target.result;
      }
    }
  }

  clearSlide4()
  {
    this.selectedSlide = null;
    this.slide4Form.patchValue({title: null, description: null});
    this.sec4Url1 = null;
    this.sec4File1 = null;

    let file: any = document.getElementById('addSec4Slide');
    file.value = null;
    file = document.getElementById('editSec4Slide');
    file.value = null;
  }

  setEditedSec4Slide(slide: any)
  {
    this.selectedSlide = slide;
    this.slide4Form.patchValue({
      title: this.selectedSlide.title,
      description: this.selectedSlide.description != 'null' ? this.selectedSlide.description : null
    });
    this.sec4Url1 = environment.imageBaseUrl + this.selectedSlide.img;
  }

  editSection4Slide()
  {
    this.isSectionLoading = true;
    let postData = new FormData();
    if(this.sec4File1) {
      postData.append('file', this.sec4File1, this.selectedSlide.img);
    }


    postData.append('id', this.selectedSlide._id);
    postData.append('title', this.slide4Form.value.title);
    postData.append('description', this.slide4Form.value.description);
    postData.append('secType', 'sec4');

    this.api.editSection4Slide(postData).subscribe((resp) => {
      this.isSectionLoading = false;
      document.getElementById('editSec4Close')?.click();
      this.getSection4();
      console.log(resp);
    },
    (err) => {
      this.isSectionLoading = false;
      console.error(err);
    })
  }

  deleteSection4Slide()
  {
    this.isSectionLoading = true;
    this.api.deleteSec4Slide(this.selectedSlide._id).subscribe((resp) => {
      this.isSectionLoading = false;
      document.getElementById('delSec4Close')?.click();
      this.getSection4();
      console.log(resp);
    },
    (err) => {
      this.isSectionLoading = false;
      console.error(err);
    })
  }

  // For section 5
  getSection5()
  {
    this.api.getSection5().subscribe((resp: any) => {
      console.log(resp);
      this.sec5Slides = resp.data.section5;
    },
    (err) => {
      console.error(err);
    })
  }

  addSection5Slide()
  {
    this.isSectionLoading = true;
    let postData = new FormData();
    postData.append('file', this.sec5File1);
    postData.append('heading', this.section5Form.value.heading);
    postData.append('newsDate', this.section5Form.value.newsDate);
    postData.append('secType', 'sec5');

    this.api.addHomeSlide(postData).subscribe((resp) => {
      console.log("resp5", resp);

      this.isSectionLoading = false;
      document.getElementById('addSec5Close')?.click();
      this.getSection5();
      console.log(resp);
    },
    (err) => {
      this.isSectionLoading = false;
      console.error(err);
    })
  }

  onSelectFile5(event)
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      this.sec5File1 = event.target.files[0];

      reader.onload = (event) => {
        this.sec5Url1 = event.target.result;
      }
    }
  }

  clearSlide5()
  {
    this.selectedSlide = null;
    this.section5Form.patchValue({heading: null, newsDate: null});
    this.sec5Url1 = null;
    this.sec5File1 = null;

    let file: any = document.getElementById('addSec5Slide');
    file.value = null;
    file = document.getElementById('editSec5Slide');
    file.value = null;
  }

  setEditedSlide5(slide: any)
  {
    this.selectedSlide = slide;
    this.section5Form.patchValue({heading: this.selectedSlide.heading, newsDate: this.selectedSlide.newsDate});

    this.sec5Url1 = environment.imageBaseUrl + this.selectedSlide.img;
  }

  editSection5Slide()
  {
    this.isSectionLoading = true;
    let postData = new FormData();
    if(this.sec5File1) {
      postData.append('file', this.sec5File1, this.selectedSlide.img);
    }

    postData.append('id', this.selectedSlide._id);
    postData.append('heading', this.section5Form.value.heading);
    postData.append('newsDate', this.section5Form.value.newsDate);
    postData.append('secType', 'sec5');

    this.api.editHomeSlide(postData).subscribe((resp) => {
      this.isSectionLoading = false;
      document.getElementById('editSec5Close')?.click();
      this.getSection5();
      console.log(resp);
    },
    (err) => {
      this.isSectionLoading = false;
      console.error(err);
    })
  }

  deleteSection5Slide()
  {
    this.isSectionLoading = true;
    this.api.deleteSec5Slide(this.selectedSlide._id).subscribe((resp) => {
      this.isSectionLoading = false;
      document.getElementById('delSec5Close')?.click();
      this.getSection5();
      console.log(resp);
    },
    (err) => {
      this.isSectionLoading = false;
      console.error(err);
    })
  }

}
