import { MusicDataService } from './../music-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: any;
  private favoriteSub: any;

  constructor(private service: MusicDataService) {}

  ngOnInit(): void {
    this.favoriteSub = this.service.getFavourites().subscribe((data) => {
      console.log(data);
      this.favourites = data.tracks;
    });
  }

  ngOnDestroy(): void {
    if (this.favoriteSub) this.favoriteSub.unsubscribe();
  }

  removeFromFavourites(favID: any) {
    this.service.removeFromFavourites(favID).subscribe((data) => {
      this.favourites = data.tracks;
    });
  }
}
