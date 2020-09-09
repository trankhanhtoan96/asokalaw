import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../service/global.service";
import {FormValidateService} from "../../service/form-validate.service";
import {EmailService} from "../../service/email.service";
import {SpinnerService} from "../../service/spinner.service";

declare var $: any;

@Component({
    selector: 'app-dnt3n-form3',
    templateUrl: './dnt3n-form3.component.html',
    styleUrls: ['../dnt3n.component.css', './dnt3n-form3.component.css']
})
export class Dnt3nForm3Component implements OnInit {
    name;
    email;
    phone;
    company;
    business;
    description;
    package;
    n;
    p;
    e;
    submitClick;
    service;
    s1 = 'Dưới 05 lao động';
    s1e = 'Dưới 05 lao động aaa';
    s2 = 'Từ 06 đến 10 lao động';
    s2e = 'Từ 06 đến 10 lao động aaa';
    p1 = 'Gói tạm ngưng';
    p1e = 'Gói tạm ngưng aaa';
    p2 = 'Gói giải thể';
    p2e = 'Gói giải thể aaa';

    constructor(public global: GlobalService, public form: FormValidateService, private smtp: EmailService, private spinner: SpinnerService) {
    }

    ngOnInit(): void {
    }

    submit(): void {
        this.submitClick = true;
        this.e = this.n = this.p = true;
        if (!this.form.formValid([{value: this.name}, {value: this.email, type: 'email'}, {value: this.phone, type: 'phone'}])) return;

        this.spinner.show('sending');
        const body = [
            {label: 'Họ tên', value: this.name},
            {label: 'Số điện thoại', value: this.phone},
            {label: 'Email', value: this.email},
            {label: 'Lĩnh vực kinh doanh', value: this.business},
            {label: 'Tên công ty', value: this.company},
            {label: 'Quy mô công ty', value: this.service},
            {label: 'Gói', value: this.package},
            {label: 'Mô tả', value: this.description},
        ];
        const subject = '[Website] Khách hàng đăng ký: ' + this.name;
        const subSubject = 'Doanh nghiệp trên 3 năm - Tạm ngưng - giải thể';
        this.smtp.send2(subject, subSubject, body).then(
            message => {
                this.spinner.hide();
                $('#alert-success').modal('show');
                $('#dnt3nform3').modal('hide');
            }
        );
    }

}