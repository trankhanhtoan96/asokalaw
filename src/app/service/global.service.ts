import {Injectable} from '@angular/core';
import {postAPI} from "../helpers/api";
import {getCookie, setCookie} from "../helpers/cookie";
import {langDefined} from "../../lang";
import {BehaviorSubject} from "rxjs";
import {Meta, Title} from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    settings = {
        favicon: '',
        logo: '',
        mailer_host: '',
        mailer_user: '',
        mailer_port: '',
        mailer_secure: '',
        mailer_replyto: '',
        mailer_from: '',
        mailer_fromname: '',
        mailer_replytoname: '',
        name: '',
        en_name: '',
        email: '',
        head_office: '',
        en_head_office: '',
        branch_office: '',
        en_branch_office: '',
        license: '',
        en_license: '',
        mailer_pass: '',
        phone: '',
        record_per_page: '',
        hot_line: '',
        youtube: '',
        linkin: '',
        facebook: ''
    };
    locale: string;
    langDefined: any;

    constructor() {
        var self = this;
        const params = new FormData();
        params.append('action', 'get_record');
        params.append('query', 'select * from settings');
        postAPI(params, function (res): void {
            self.settings = res;
        });
        this.initLocale();
        this.langDefined = langDefined;
    }

    initLocale() {
        const url = new URL(window.location.href);
        let lang = url.searchParams.get('lang');
        if (lang) {
            this.locale = lang;
            setCookie('asokalawlang', lang);
        } else {
            const englishURI = [
                '/vision-mission',
                '/careers',
                '/business-establishment',
                '/business-under-3-years',
                '/business-over-3-years',
                '/trademark-registration',
                '/business-registration',
                '/investment-registration',
                '/regular-legal-service',
                '/lawyer-consultation',
                '/event-related-legal-service',
                '/dispute-resolution',
                '/news',
                '/faq',
                '/working-process',
                '/contact-us',
                '/terms-of-use',
                '/payment-terms',
                '/category/legal-news',
                '/category/promotion',
                '/category/asoka-news'
            ];
            const vietnameseURI = [
                '/tam-nhin-su-menh',
                '/co-hoi-nghe-nghiep',
                '/khoi-tao-doanh-nghiep',
                '/doanh-nghiep-duoi-3-nam',
                '/doanh-nghiep-tren-3-nam',
                '/dang-ky-nhan-hieu',
                '/dang-ky-kinh-doanh',
                '/dang-ky-dau-tu',
                '/phap-ly-thuong-xuyen',
                '/tu-van-luat-su',
                '/phap-ly-su-kien',
                '/giai-quyet-tranh-chap',
                '/tin-tuc',
                '/cau-hoi-thuong-gap',
                '/quy-trinh-lam-viec',
                '/lien-he',
                '/chinh-sach-khach-hang',
                '/huong-dan-thanh-toan',
                '/danh-muc/tin-tuc-phap-ly',
                '/danh-muc/uu-dai',
                '/danh-muc/tin-tuc-asoka',
            ];
            if (englishURI.includes(window.location.pathname)) {
                lang = 'en';
                this.locale = lang;
                setCookie('asokalawlang', lang);
            } else if (vietnameseURI.includes(window.location.pathname)) {
                lang = 'vi';
                this.locale = lang;
                setCookie('asokalawlang', lang);
            } else {
                this.locale = getCookie('asokalawlang');
                if (!this.locale) {
                    this.locale = 'vi';
                }
            }
        }
    }
}
