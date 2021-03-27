import { MusicDataService } from './../music-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;
  private querySub: any;

  constructor(
    private service: MusicDataService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params) => {
      this.service.getAlbumById(params['id']).subscribe((data) => {
        this.album = data;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) this.querySub.unsubscribe();
  }
  addToFavourites(trackID: any) {
    if (this.service.addToFavourites(trackID)) {
      this.snackBar.open('Adding to Favourites...', 'Done', { duration: 1500 });
    }
  }
}
