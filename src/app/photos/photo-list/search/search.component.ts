import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

  debounce: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.debounce.pipe(debounceTime(300));
  }

  doSearch(event: string) {
    this.debounce.next(event)
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
}
