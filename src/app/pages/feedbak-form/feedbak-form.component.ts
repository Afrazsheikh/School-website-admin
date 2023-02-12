import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-feedbak-form',
  templateUrl: './feedbak-form.component.html',
  styleUrls: ['./feedbak-form.component.css']
})
export class FeedbakFormComponent implements OnInit {

  feedback: any[] = [];

  constructor(private api: ApiService, private toast: ToastrService, ) { }

  ngOnInit(): void {
    this.getfeedback()
  }

  

  getfeedback()
  {
    this.api.getEnquiry().subscribe((resp) => {
      this.feedback = resp.data;
    },
    (err) => {
      console.error(err);
    })
  }

}
