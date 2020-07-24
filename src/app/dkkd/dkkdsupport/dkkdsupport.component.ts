import {Component, OnInit} from '@angular/core';
import {SpinnerService} from '../../service/spinner.service';

declare var $: any;
declare var Email: any;

@Component({
  selector: 'app-dkkdsupport',
  templateUrl: './dkkdsupport.component.html',
  styleUrls: ['./dkkdsupport.component.css'],
})
export class DkkdsupportComponent implements OnInit {
  name: string;
  phone: string;
  email: string;
  service: any;
  serviceT: any;
  description: string;

  constructor(private spinner: SpinnerService) {
    this.service = [false, false, false, false, false, false, false];
    this.serviceT = [
      'Thay đổi đăng ký kinh doanh',
      'Quản trị pháp lý thường xuyên',
      'Đăng ký sở hữu trí tuệ',
      'Luật sư đại diện sử lý tranh chấp',
      'Đăng ký lưu hành sản phẩm trên thị trường',
      'Đăng ký giấy phép hành nghề có điều kiện',
      'Dịch vụ khác'
    ];
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentInit(): void {
    $('.slide-support-pltx').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 4000,

      nextArrow: '<img src="/assets/media/landingpage/news/right.svg" class="nextArrowBtnVideo news">',
      prevArrow: '<img src="/assets/media/landingpage/news/left.svg" class="prevArrowBtnVideo news">',
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  showModal(): void {
    $('#dkkdform2').modal('show');
  }

  submit(): void {
    this.spinner.show('sending');

    let serviceTr = '';
    for (const i in this.service) {
      if (this.service[i] === true) {
        serviceTr += '<li>' + this.serviceT[i] + '</li>';
      }
    }

    const body = `<table width="620" cellspacing="0" cellpadding="0" border="0" align="center"> <tbody> <tr> <td bgcolor="#f5f5f5"> <table width="578" cellspacing="0" cellpadding="0" border="0" align="center"> <tbody> <tr> <td height="16"></td> </tr> <tr> <td align="center"><img src="https://ci5.googleusercontent.com/proxy/-8AhuwEBWjbUauG2vyvW7r8a5aY2HZ9kZC00fhd_MiyExMPvQkH3XjyfGME-foH3AJigwdw1OkhD7o3RDAsPCB4=s0-d-e1-ft#https://www.asokalaw.vn/assets/images/logo.png" alt="Công ty Luật TNHH Asoka" style="width:200px" class="CToWUd"></td> </tr> <tr> <td height="16"></td> </tr> <tr> <td align="left" bgcolor="#fff"> <div style="border-style:solid;border-width:1px;border-color:#ccc"> <table width="578" cellspacing="0" cellpadding="0" border="0" align="center"> <tbody> <tr> <td height="22" colspan="3"></td> </tr> <tr> <td width="40"></td> <td width="498">
        <h3 style="font-family:arial;font-size:16px">Chào Ban Quản Trị,</h3>
        <h3>Dịch vụ: Đăng ký kinh doanh - hỗ trợ doanh nghiệp toàn diện sau thành lập</h3>
        <table width="100%" cellspacing="0" cellpadding="0" border="0"> <tbody>
        <tr>
          <td style="padding:5px 0;font-family:arial,sans-serif;width: 40%">Họ tên:</td>
          <td style="padding:5px 0;font-family:arial,sans-serif">${this.name}</td>
        </tr>
        <tr>
          <td style="padding:5px 0;font-family:arial,sans-serif">Số điện thoại:</td>
          <td style="padding:5px 0;font-family:arial,sans-serif">${this.phone}</td>
        </tr>
        <tr>
          <td style="padding:5px 0;font-family:arial,sans-serif">Email:</td>
          <td style="padding:5px 0;font-family:arial,sans-serif">${this.email}</td>
        </tr>
        <tr>
          <td style="padding:5px 0;font-family:arial,sans-serif">Dịch vụ:</td>
          <td style="padding:5px 0;font-family:arial,sans-serif">${serviceTr}</td>
        </tr>
        <tr>
          <td style="padding:5px 0;font-family:arial,sans-serif">Mô tả:</td>
          <td style="padding:5px 0;font-family:arial,sans-serif">${this.description}</td>
        </tr>
        </tbody></table><p style="border-top:1px solid #aaa;padding-top:15px">Trân trọng<br>
        <b></b></p></td><td width="40"></td></tr><tr><td height="22" colspan="3"></td>
        </tr></tbody></table></div></td></tr><tr><td height="16"></td></tr><tr><td align="left">
        <table cellspacing="0" cellpadding="0" border="0" align="center"><tbody><tr><td width="40"></td><td width="498"><div style="font-family:arial,Arial,sans-serif;font-size:11px;line-height:13px">
        ©2015 Công ty Luật TNHH Asoka,  228 Nguyễn Hoàng, P. An Phú, Quận 2, Tp. HCM
        </div></td><td width="40"></td></tr></tbody></table></td></tr><tr><td height="22"></td></tr></tbody></table></td></tr></tbody></table>
            `;
    Email.send({
      Host: 'smtp.gmail.com',
      Username: 'trankhanhtoan321@gmail.com',
      Password: 'BUKT25041996',
      To: 'AsokaLaw<toan.tran@dotb.vn>,Hanh Trinh<hanhtrinh@flowmedia.vn>',
      From: 'trankhanhtoan321@gmail.com',
      Subject: '[Website] Khách hàng đăng ký dịch vụ: ' + this.name,
      Body: body
    }).then(
      message => {
        this.spinner.hide();
        $('#alert-success').modal('show');
        $('#dkkdform2').modal('hide');
      }
    );
  }
}