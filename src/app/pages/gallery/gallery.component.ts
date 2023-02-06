import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  albumForm: FormGroup;
  isLoading: boolean;
  albums: any[] = [];
  selectedAlbum: any;

  constructor(private api: ApiService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.albumForm = new FormGroup({
      fromYear: new FormControl(null, [Validators.required]),
      toYear: new FormControl(null, [Validators.required]),
    });

    this.getAlbums();
  }

  getAlbums()
  {
    this.api.getAlbums().subscribe((resp) => {
      this.albums = resp.data;
    },
    (err) => {
      console.error(err);
    })
  }

  addAlbum()
  {
    this.isLoading = true;
    this.api.addAlbum(this.albumForm.value).subscribe((resp) => {
      this.isLoading = false;
      document.getElementById('addAlbumClose')?.click();
      this.getAlbums();
    },
    (err) => {
      this.isLoading = false;
      this.toast.error(null, err.error.message);
      console.error(err);
    })
  }

  clearGalleryData()
  {
    this.albumForm.patchValue({
      fromYear: null,
      toYear: null,
    })
  }

  setDeletedAlbum(alb: any) {
    this.selectedAlbum = alb;
  }

  deleteAlbum()
  {
    this.isLoading = true;

    this.api.deleteAlbum(this.selectedAlbum.albumName).subscribe((resp) => {
      this.isLoading = false;
      document.getElementById('gallDelClose')?.click();
      this.getAlbums();
      console.log(resp);
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }

}
