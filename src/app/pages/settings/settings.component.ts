import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  url: any;
  logoFile: any; 
  isLogoUpdating: boolean;
  isSettingsUpdating: boolean;
  settingsForm: FormGroup
  schoolData: any;

  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit(): void
  {
    this.settingsForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      country: new FormControl({value: 'India', disabled: true}),
      pincode: new FormControl(null, [Validators.required]),
    });

    this.getSettings();
  }

  onSelectFile(event)
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      this.logoFile = event.target.files[0];

      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }

  getSettings()
  {
    this.api.getSettings().subscribe((resp) => {
      this.schoolData = resp.data;
      this.createForm();
    },
    (err: HttpErrorResponse) => {
      console.error(err);
      this.toaster.error(null, err.statusText);
    })
  }

  createForm()
  {
    this.url = environment.imageBaseUrl + this.schoolData.logoImage;
    this.settingsForm.patchValue({
      name: this.schoolData.name,
      email: this.schoolData.email,
      phone: this.schoolData.phone,
      street: this.schoolData.address.street,
      city: this.schoolData.address.city,
      state: this.schoolData.address.state,
      pincode: this.schoolData.address.pincode
    });
  }

  saveLogo()
  {
    this.isLogoUpdating = true;
    let postData = new FormData();
    postData.append('file', this.logoFile, this.schoolData.logoImage);

    this.api.updateLogo(postData).subscribe((resp) => {
      this.isLogoUpdating = false;
      this.toaster.success(null, resp.message);
      console.log(resp);
    },
    (err: HttpErrorResponse) => {
      this.isLogoUpdating = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }

  updateSettings()
  {
    let postData = this.settingsForm.value;

    postData["address"] = {
      street: postData.street,
      city: postData.city,
      state: postData.state,
      country: "India",
      pincode: postData.pincode
    }

    delete postData["street"]; delete postData["city"]; delete postData["state"];
    delete postData["country"]; delete postData["pincode"];


    this.api.updateSettings(postData).subscribe((resp) => {
      this.isSettingsUpdating = false;
      this.toaster.success(null, resp.message);
      console.log(resp);
    },
    (err: HttpErrorResponse) => {
      this.isSettingsUpdating = false;
      this.toaster.error(null, err.error.message);
      console.error(err);
    })
  }

}
