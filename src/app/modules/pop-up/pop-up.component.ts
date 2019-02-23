import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";



@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  @Input() name;
  @Input() title;

  constructor(public activeModal: NgbActiveModal) {}


  ngOnInit() {

    const element =  document.querySelector('.modal-content');
    element.classList.add('animated', 'bounceIn');

  }



}
