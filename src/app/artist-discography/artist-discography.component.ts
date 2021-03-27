import { MusicDataService } from './../music-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums: any;
  artist: any;

  private querySub: any;

  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params) => {
      this.data.getArtistById(params['id']).subscribe((data) => {
        this.artist = data;
      });
      this.data.getAlbumsByArtistId(params['id']).subscribe((data) => {
        let seen = new Set();

        //remove duplicates
        let filteredAlbums = data.items.filter((item: { name: unknown }) => {
          const duplicate = seen.has(item.name);
          seen.add(item.name);
          return !duplicate;
        });

        this.albums = filteredAlbums;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) this.querySub.unsubscribe();
  }
}
