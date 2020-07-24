import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dknhfeedback',
  templateUrl: './dknhfeedback.component.html',
  styleUrls: ['./dknhfeedback.component.css']
})
export class DknhfeedbackComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    $('.slide-asoka-des').slick({
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      nextArrow: false,
      prevArrow: false,
      focusOnSelect: true,
      customPaging: function(slider, i) {
        return '<i class="fa fa-circle"></i>';
      },
    });
  }
}