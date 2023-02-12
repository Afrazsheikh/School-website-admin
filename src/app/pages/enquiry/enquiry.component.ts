import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  enquiry: any[] = [];

  constructor(private api: ApiService, private toast: ToastrService, ) { }

  ngOnInit(): void {
    this.getEnquiry()
  }

  getEnquiry()
  {
    this.api.getEnquiry().subscribe((resp) => {
      this.enquiry = resp.data;
    },
    (err) => {
      console.error(err);
    })
  }

}
