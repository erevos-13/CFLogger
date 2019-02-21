import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit() {
  }



}
