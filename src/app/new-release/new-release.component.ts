import { MusicDataService } from './../music-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-new-release',
  templateUrl: './new-release.component.html',
  styleUrls: ['./new-release.component.css'],
})
export class NewReleaseComponent implements OnInit, OnDestroy {
  constructor(private data: MusicDataService) {}

  releases: any;
  releaseSub: any;

  ngOnInit(): void {
    this.releaseSub = this.data
      .getNewReleases()
      .subscribe((data) => (this.releases = data.albums.items));
  }

  ngOnDestroy(): void {
    this.releaseSub.unsubscribe();
  }
}
