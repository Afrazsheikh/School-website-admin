import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-public-mand',
  templateUrl: './public-mand.component.html',
  styleUrls: ['./public-mand.component.css']
})
export class PublicMandComponent implements OnInit {
  docsFile: any; 
  isDocsUpdating: boolean;
  docsData: any
  url:any


  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  form(){
    this.url = environment.imageBaseUrl + this.docsData.docsFile
  }
  updateDocs()
  {
    this.isDocsUpdating = true;
    let postData = new FormData();
    postData.append('file', this.docsFile, this.docsData.docsFile);

    this.api.updateDocs(postData).subscribe((resp) => {
      this.isDocsUpdating = false;
      this.toaster.success(null, resp.message);
      console.log(resp);
    },
    (err: HttpErrorResponse) => {
      this.isDocsUpdating = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }

  onSelectFile(event)
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      this.docsFile = event.target.files[0];

      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }



}
