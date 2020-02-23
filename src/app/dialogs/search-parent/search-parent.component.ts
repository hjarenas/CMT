import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ParentsService } from '../../services/parents.service';
import { Parent } from 'src/app/models/parent';

@Component({
  selector: 'app-search-parent',
  templateUrl: './search-parent.component.html',
  styleUrls: ['./search-parent.component.css']
})
export class SearchParentComponent implements OnInit {
  public parentsFound: Observable<Parent[]>;
  private parentNameTerms = new Subject<string>();

  constructor(private parentService: ParentsService) { }

  ngOnInit(): void {
    this.parentsFound = this.parentNameTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.parentService.SearchByFirstName(term))
    );
  }

  public clickSelect(parent: Parent) {

  }

  public search(term: string) {
    this.parentNameTerms.next(term);
  }

}
