import { splitAtColon } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  genreName: string ='';
  genreDesc: string ='';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    let tempArr = this.data.genre.split('\n')
    this.genreName = tempArr[0];
    this.genreDesc = tempArr[1];
  }

}
