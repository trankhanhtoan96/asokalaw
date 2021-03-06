import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../service/spinner.service";
import {EmailService} from "../service/email.service";
import {GlobalService} from "../service/global.service";
import {postAPI} from "../helpers/api";

declare var $: any;

@Component({
    selector: 'app-ktdn',
    templateUrl: './ktdn.component.html',
    styleUrls: ['./ktdn.component.css']
})
export class KtdnComponent implements OnInit {
    name: string;
    phone: string;
    email: string;
    service = [];
    description: string;
    n;
    p;
    e;
    s1;
    s2;
    s3;
    s4;

    constructor(private spinner: SpinnerService, private smtp: EmailService, public global: GlobalService) {
        this.s1 = this.global.locale == 'vi' ? 'Tư vấn trực tiếp với luật sư' : 'Direct lawyer consultation';
        this.s2 = this.global.locale == 'vi' ? 'Đăng ký kinh doanh công ty 100% vốn Việt Nam' : 'Business registration with 100% Vietnamese capital';
        this.s3 = this.global.locale == 'vi' ? 'Đăng ký đầu tư công ty vốn nước ngoài' : 'Investment registration for foreign capital companies';
        this.s4 = this.global.locale == 'vi' ? 'Khác' : 'Others';
    }

    ngOnInit(): void {
        $('.create-question-title').click(function (e) {
            e.preventDefault();
            $(this).parents("li").find(".create-question-toggle").slideToggle();
        });
    }

    fieldValid(value, type?): boolean {
        if (value) {
            if (type == 'phone') {
                return /^\+?[0-9\s]{10,15}$/.test(value);
            } else if (type == 'email') {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            }
            return true;
        }
        return false;
    }

    formValid(fields?: any): boolean {
        if (!fields) {
            this.name = this.name.trim();
            this.email = this.email.trim();
            this.phone = this.phone.trim();
            return this.fieldValid(this.name) && this.fieldValid(this.email, 'email') && this.fieldValid(this.phone, 'phone');
        } else {
            for (const key in fields) {
                if (fields.hasOwnProperty('key')) {
                    if (fields[key].hasOwnProperty('name')) {
                        if (fields[key].hasOwnProperty('type')) {
                            if (!this.fieldValid(fields[key].name, fields[key].type))
                                return false;
                        } else {
                            if (!this.fieldValid(fields[key].name))
                                return false;
                        }
                    }
                }
            }
            return true;
        }
    }

    selectService(e) {
        const index = this.service.indexOf(e.target.value);
        if (index == -1) {
            this.service.push(e.target.value);
        } else {
            this.service.splice(index, 1);
        }
    }

    isSelected(value): boolean {
        return this.service.indexOf(value) != -1;
    }

    selectServiceOnly(value) {
        this.service = [value];
        $('#ktdnform1').modal('show')
    }

    submit(): void {
        this.n = this.p = this.e = true;
        if (!this.formValid()) return;

        const serviceString = '<li>' + this.service.join('</li><li>') + '</li>';
        this.spinner.show('sending');
        const body = `<table width="620" cellspacing="0" cellpadding="0" border="0" align="center"> <tbody> <tr> <td bgcolor="#f5f5f5"> <table width="578" cellspacing="0" cellpadding="0" border="0" align="center"> <tbody> <tr> <td height="16"></td> </tr> <tr> <td align="center"><img src="https://admin.asokalaw.vn/upload/images/2bd08ed96c4fab05.png" alt="Công ty Luật TNHH Asoka" style="width:200px" class="CToWUd"></td> </tr> <tr> <td height="16"></td> </tr> <tr> <td align="left" bgcolor="#fff"> <div style="border-style:solid;border-width:1px;border-color:#ccc"> <table width="578" cellspacing="0" cellpadding="0" border="0" align="center"> <tbody> <tr> <td height="22" colspan="3"></td> </tr> <tr> <td width="40"></td> <td width="498">
        <h3 style="font-family:arial;font-size:16px">Chào Ban Quản Trị,</h3>
        <h3>Dịch vụ: Khởi tạo doanh nghiệp</h3>
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
          <td style="padding:5px 0;font-family:arial,sans-serif">Gói dịch vụ:</td>
          <td style="padding:5px 0;font-family:arial,sans-serif">${serviceString}</td>
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
        const subject = '[Website] Khách hàng đăng ký dịch vụ: ' + this.name;
        this.smtp.send(subject, body).then(
            message => {
                this.spinner.hide();
                $('#ktdnform1').modal('hide');
                $('#alert-success').modal('show');

                //save data
                const description = `dịch vụ: ${serviceString}\nmô tả: ${this.description}`;
                const data = new FormData();
                const now = new Date();
                const id = new Date().getTime();
                const nowDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
                data.append('query', `insert into customer(id,name,phone,email,description,created_at,service)
                                                    values('${id}','${this.name}','${this.phone}','${this.email}','${description}','${nowDate}','Khởi tạo doanh nghiệp')`);
                postAPI(data, function (res): void {
                });
            }
        );
    }

    ngAfterContentInit(): void {

        $('.create-list-news-slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 4000,
            nextArrow: '<img src="/assets/site/images/create_icon_right.svg" class="nextArrowBtnCreate" style="position: absolute;z-index: 1000;top: 110px;right: 0;max-width: 50px;">',
            prevArrow: '<img src="/assets/site/images/create_icon_left.svg" class="prevArrowBtnCreate" style="position: absolute;z-index: 1000;top: 110px;left: 0;max-width: 50px;">',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        $('.create-lawyer-slider').slick({
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            nextArrow: '<img src="/assets/site/images/create_arrow_right.svg" class="nextArrowRightLawyers" style="max-width: 20px;position: absolute;bottom: 8px;left: 3rem;">',
            prevArrow: '<img src="/assets/site/images/create_arrow_left.svg" class="prevArrowLeftLawyers" style="max-width: 20px;position: absolute;bottom: 8px;left: 1rem;">',
            customPaging: function (slider, i) {
                return '<style>.create-slider-dots {display: inline-block;width: 20px;height: 20px;border-radius: 50%;position: relative;z-index: 1;cursor: pointer;transition: all 0.2s ease;}  .create-slider-dots::before, .create-slider-dots::after {position: absolute;content: \'\';border-radius: 50%;transition: all 0.2s ease;}  .create-slider-dots::after {top: calc(50% - 10px);left: calc(50% - 10px);background: transparent;border: 1px solid #7EC2E3;width: 100%;height: 100%;transform: scale(0);}  .create-slider-dots::before {top: 50%;left: 50%;transform: translate(-50%, -50%);background: #3F3F3F;width: 40%;height: 40%;}  .create-lawyer-slider .slick-active .create-slider-dots::before, .create-slider .slick-active .create-slider-dots::before, .create-slider-dots:hover::before {background: #7EC2E3;}  .create-lawyer-slider .slick-active .create-slider-dots::after, .create-slider .slick-active .create-slider-dots::after, .create-slider-dots:hover::after {transform: scale(1);}</style><span class="create-slider-dots"></span>';
            },
        });
    }
}
