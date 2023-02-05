import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery-images',
  templateUrl: './gallery-images.component.html',
  styleUrls: ['./gallery-images.component.css']
})
export class GalleryImagesComponent implements OnInit {

  selectedAlbum: string;
  isLoading: boolean;
  galleries: any[] = [];
  selectedGall: any;
  galleryFiles: any[] = [];
  environment = environment;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private toaster: ToastrService
  )
  {
    this.selectedAlbum = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getGalleries();
  }

  getGalleries()
  {
    this.api.getGalleries(this.selectedAlbum).subscribe((resp: any) => {
      console.log(resp);
      this.galleries = resp.data.images;
    },
    (err) => {
      console.error(err);
    })
  }

  addGallery()
  {
    this.isLoading = true;
    let postData = new FormData();
    this.galleryFiles.forEach(gall => {
      postData.append('file[]', gall);
    });
    postData.append('album', this.selectedAlbum);

    this.api.addGallery(postData).subscribe((resp) => {
      this.isLoading = false;
      document.getElementById('addGalleryClose')?.click();
      let fileInp: any = document.getElementById('addGalleryInp');
      fileInp.value = null;
      this.getGalleries();
      console.log(resp);
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }

  onSelectGalleryFile(event)
  {
    if (event.target.files && event.target.files.length)
    {
      if(event.target.files.length <= 10) {
        for(let i = 0; i < event.target.files.length; i++) {
          this.galleryFiles.push(event.target.files[i]);
        }
      }
      else {
        this.toaster.warning(null, "Please select Upto 10 Images");
      }

      console.log(this.galleryFiles);
    }
  }

  setDeletedGallery(gall: any) {
    this.selectedGall = gall;
  }

  deleteGallery()
  {
    this.isLoading = true;

    this.api.deleteGallery(this.selectedAlbum, this.selectedGall).subscribe((resp) => {
      this.isLoading = false;
      document.getElementById('gallDelClose')?.click();
      this.getGalleries();
      console.log(resp);
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }

}
