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
  docFile: any[] = [];
  isDocsUpdating: boolean;
  docsData: any
  url:any
  environment = environment;


  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments() {
    this.api.getDocuments().subscribe((resp) => {
      console.log(resp);
      this.docsData = resp.data.documents;
    },
    (err) => {
      console.error(err);
    });
  }

  addDocs(docType: string, index: number)
  {
    this.isDocsUpdating = true;
    let postData = new FormData();
    postData.append('file', this.docFile[index]);
    postData.append('docType', docType);
    if(this.docsData && this.docsData[docType]) {
      postData.append('originalFile', this.docsData[docType])
    }

    this.api.addDocs(postData).subscribe((resp) => {
      this.isDocsUpdating = false;
      this.docFile[index] = null;
      let fileInp: any = document.getElementsByName('formFile')[index];
      fileInp.value = null;
      this.toaster.success(null, resp.message);
      this.getDocuments();
      console.log(resp);
    },
    (err: HttpErrorResponse) => {
      this.isDocsUpdating = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }

  onSelectFile(event, index: number)
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      this.docFile[index] = event.target.files[0];
    }
  }



}
