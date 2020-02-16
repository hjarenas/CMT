import { Component, OnInit } from '@angular/core';
import { ParentsService } from '../../services/parents.service';
import { Parent } from '../../models/parent';

@Component({
  selector: 'app-parent-detail',
  templateUrl: './parent-detail.component.html',
  styleUrls: ['./parent-detail.component.css']
})
export class ParentDetailComponent implements OnInit {
  public parents: Parent[];
  constructor(
    private parentService: ParentsService
  ) { }

  ngOnInit(): void {
    this.parentService.List().subscribe(list => this.parents = list);
  }

}
