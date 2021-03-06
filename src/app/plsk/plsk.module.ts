import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PlskComponent} from './plsk.component';
import {PLSKMasterComponent} from './plskmaster/plskmaster.component';
import {RouterModule, Routes} from '@angular/router';
import {PLSKPricingComponent} from './plskpricing/plskpricing.component';
import {PLSKExpertComponent} from './plskexpert/plskexpert.component';
import {PLSKStudyContentComponent} from './plskstudy-content/plskstudy-content.component';
import {PlskTeacherComponent} from './plsk-teacher/plsk-teacher.component';
import {PlskContactComponent} from './plsk-contact/plsk-contact.component';
import {FormsModule} from '@angular/forms';
import {GlobalModule} from "../global/global.module";

const routes: Routes = [
  {path: 'phap-ly-su-kien', component: PlskComponent},
  {path: 'event-related-legal-service', component: PlskComponent},
];

@NgModule({
  declarations: [
    PlskComponent,
    PLSKMasterComponent,
    PLSKPricingComponent,
    PLSKExpertComponent,
    PLSKStudyContentComponent,
    PlskTeacherComponent,
    PlskContactComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        GlobalModule
    ],
  providers: [],
  bootstrap: []
})
export class PlskModule {
}
