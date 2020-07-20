import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dkdtfeedback',
  templateUrl: './dkdtfeedback.component.html',
  styleUrls: ['./dkdtfeedback.component.css']
})
export class DkdtfeedbackComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    $('.feedback-slide-pltx').slick({
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      nextArrow: false,
      prevArrow: false,
      customPaging: function(slider, i) {
        return '<i class="fa fa-circle"></i>';
      },
      focusOnSelect: true
    });
  }
}
