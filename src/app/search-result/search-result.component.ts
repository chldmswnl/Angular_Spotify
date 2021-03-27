import { MusicDataService } from './../music-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any;
  searchQuery: any;

  private querySub: any;

  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      console.log(this.searchQuery);
      this.data.searchArtists(params['q']).subscribe((data) => {
        this.results = data.artists.items.filter(
          (item: any) => item.images.length > 0
        );
      });
    });
  }
  ngOnDestroy(): void {
    if (this.querySub) this.querySub.unsubscribe();
  }
}
