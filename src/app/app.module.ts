import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { ReactiveFormsModule} from '@angular/forms';
import { Ng2SearchPipeModule} from 'ng2-search-filter';

import { GoogleChartsModule } from 'angular-google-charts';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { DateFormatOptions } from '@syncfusion/ej2-base'
import { CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService, 
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts';

//components-admin
import { ManageCategoryComponent } from './components-admin/Category/manage-category/manage-category.component';
import { ManageClassComponent } from './components-admin/Class/manage-class/manage-class.component';
import { ManageMajorComponent } from './components-admin//Major/manage-major/manage-major.component';
import { ManagePostComponent } from './components-admin//Post/manage-post/manage-post.component';
import { ManageSemesterComponent } from './components-admin/Semester/manage-semester/manage-semester.component';
import { ManageStudentComponent } from './components-admin/Student/manage-student/manage-student.component';
import { ManageSubjectComponent } from './components-admin/Subject/manage-subject/manage-subject.component';
import { ManageRoomComponent } from './components-admin/Room/manage-room/manage-room.component';
import { ManageTeacherComponent } from './components-admin/Teacher/manage-teacher/manage-teacher.component';
import { ManageNominalclassComponent } from './components-admin/Nominalclass/manage-nominalclass/manage-nominalclass.component';
import { ManageCourseComponent } from './components-admin/Course/manage-course/manage-course.component';
import { ManageSchedulesComponent } from './components-admin/schedules/manage-schedules/manage-schedules.component';
import { ManageSkoftesComponent } from './components-admin/skoftes/manage-skoftes/manage-skoftes.component';
import { ManageAttendsComponent } from './components-admin/attends/manage-attends/manage-attends.component';

//components-students
import { StudentAttendsComponent } from './components-students/student-attends/student-attends.component';
import { StudentHistoryComponent } from './components-students/student-history/student-history.component';
import { StudentIndexComponent } from './components-students/student-index/student-index.component';
import { StudentNewsComponent } from './components-students/student-news/student-news.component';
import { StudentScheduleComponent } from './components-students/student-schedule/student-schedule.component';
import { StudentScoreComponent } from './components-students/student-score/student-score.component';
import { StudentSemesterScoreComponent } from './components-students/student-semester-score/student-semester-score.component';

//components-teachers
import { TeacherDashbroadComponent } from './components-teachers/teacher-dashbroad/teacher-dashbroad.component';
import { TeacherMyclassComponent } from './components-teachers/teacher-myclass/teacher-myclass.component';
import { ImportScoreComponent } from './components-teachers/import-score/import-score.component';
import { TeacherAttendsComponent } from './components-teachers/teacher-attends/teacher-attends.component';

import { LoginComponent } from './components-login/login/login.component';
import { ChangePasswordComponent } from './components-login/changepass/change-password/change-password.component';

import { SendmailService } from './services/sendmail.service';
import { CategorysService } from './services/categorys.service';
import { PostService } from './services/post.service';
import { SubjectService } from './services/subject.service';
import { ClassService } from './services/class.service';
import { SemesterService } from './services/semester.service';
import { TeacherService } from './services/teacher.service';
import { StudentsService } from './services/students.service';
import { RoomsService } from './services/rooms.service';
import { NominalClassService } from './services/nominal-class.service';
import { MajorService } from './services/major.service';
import { CourseService } from './services/course.service';
import { LoginService } from './services/login.service';
import { SkoftesService } from './services/skoftes.service';
import { SchedulesService } from './services/schedules.service';
import { AttendsService } from './services/attends.service';
import { CookieService } from 'ngx-cookie-service';
import { EvaluesService } from './services/evalues.service';
import { ManageClassDetailComponent } from './components-admin/Class (Detail)/manage-class-detail/manage-class-detail.component';
import { ClassDetailService } from './services/class-detail.service';
import { TeacherMyclassService } from './services/teacher-myclass.service';
import { ResultService } from './services/result.service';
import { StudentHistoryService } from './services/student-history.service';
import { TeacherImportscoreService } from './services/teacher-importscore.service';
import { AccountService } from './services/account.service';
import { EmployeeService } from './services/employee.service';
import { RecordService } from './services/record.service';
////////ngx pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { StudentScheduleTestComponent } from './components-students/student-schedule-test/student-schedule-test.component';
import { TeacherScheduleComponent } from './components-teachers/teacher-schedule/teacher-schedule.component';
import { NgSelect2Module } from 'ng-select2';
import { ManageResultComponent } from './components-admin/Result/manage-result/manage-result.component';
import { StudentProfileComponent } from './components-students/student-profile/student-profile.component';
import { TeacherProfileComponent } from './components-teachers/teacher-profile/teacher-profile.component';
import { ManageAccountComponent } from './components-admin/Account/manage-account/manage-account.component';
import { ManageAttendsbyclassComponent } from './components-admin/attends/manage-attendsbyclass/manage-attendsbyclass.component';

import { ManageResultbyclassComponent } from './components-admin/Result/manage-resultbyclass/manage-resultbyclass.component';
import { StudentAchievementsComponent } from './components-students/student-achievements/student-achievements.component';
import { StudentByYearComponent } from './components-admin/statistical/student-by-year/student-by-year.component';
import { StudentByMajorComponent } from './components-admin/statistical/student-by-major/student-by-major.component';
import { StudentBestByYearComponent } from './components-admin/statistical/student-best-by-year/student-best-by-year.component';
import { StudentBestByMajorComponent } from './components-admin/statistical/student-best-by-major/student-best-by-major.component';
import { StudentBestBySemesterComponent } from './components-admin/statistical/student-best-by-semester/student-best-by-semester.component';
import { ManageEmployeeComponent } from './components-admin/Employee/manage-employee/manage-employee.component';
import { ProfileEmployeeComponent } from './components-admin/Profile/profile-employee/profile-employee.component';
import { ProfileStudentComponent } from './components-admin/Profile/profile-student/profile-student.component';
import { ProfileTeacherComponent } from './components-admin/Profile/profile-teacher/profile-teacher.component';
import { ManageScheduleDatenowComponent } from './components-admin/schedules/manage-schedule-datenow/manage-schedule-datenow.component';

//auth
import {AuthGuard} from './Auth/auth.guard';
import {AuthStudentGuard} from './Auth/auth-student.guard';
import {AuthLecturerGuard} from './Auth/auth-lecturer.guard';
import {AuthLoginGuard} from './Auth/auth-login.guard';
import { EvaluesComponent } from './components_evalue/evalues/evalues.component';
import { ManageEvalueComponent } from './components-admin/Evalue/manage-evalue/manage-evalue.component';
import { ManageImportscoreComponent } from './components-admin/Result/manage-importscore/manage-importscore.component';
import { ListEvalueComponent } from './components_evalue/list-evalue/list-evalue.component';
import { ManageRoomdatenowComponent } from './components-admin/Room/manage-roomdatenow/manage-roomdatenow.component';
import { ManageListevalueComponent } from './components-admin/Evalue/manage-listevalue/manage-listevalue.component';
import { NominalclassAddstudentComponent } from './components-admin/Nominalclass/nominalclass-addstudent/nominalclass-addstudent.component';
import { ManageRecordComponent } from './components-admin/Record/manage-record/manage-record.component';
import { DashboardComponent } from './components-admin/dashboard/dashboard.component';
import { StudentNewHTComponent } from './components-students/student-new-ht/student-new-ht.component';
import { StudentNewHPComponent } from './components-students/student-new-hp/student-new-hp.component';
import { StudentNewVLComponent } from './components-students/student-new-vl/student-new-vl.component';
import { ResponseComponent } from './Auth/403/response/response.component';
import { appRoutes } from './app.routes';
import { SendMailComponent } from './components-admin/Sendmail/send-mail/send-mail.component';


@NgModule({
  declarations: [
    AppComponent,
    ManageCategoryComponent,
    ManageClassComponent,
    ManageMajorComponent,
    ManagePostComponent,
    ManageSemesterComponent,
    ManageStudentComponent,
    ManageSubjectComponent,
    ManageRoomComponent,
    ManageTeacherComponent,
    StudentAttendsComponent,
    StudentHistoryComponent,
    StudentIndexComponent,
    StudentNewsComponent,
    StudentScheduleComponent,
    StudentScoreComponent,
    StudentSemesterScoreComponent,
    TeacherDashbroadComponent,
    TeacherMyclassComponent,
    ImportScoreComponent,
    TeacherAttendsComponent,
    ManageNominalclassComponent,
    ManageCourseComponent,
    LoginComponent,
    ManageSchedulesComponent,
    ManageSkoftesComponent,
    ManageAttendsComponent,
    ManageClassDetailComponent,
    ChangePasswordComponent,
    StudentScheduleTestComponent,
    TeacherScheduleComponent,
    ManageResultComponent,
    StudentProfileComponent,
    TeacherProfileComponent,
    ManageAccountComponent,
    ManageAttendsbyclassComponent,
    ManageResultbyclassComponent,
    StudentAchievementsComponent,
    StudentByYearComponent,
    StudentByMajorComponent,
    StudentBestByYearComponent,
    StudentBestByMajorComponent,
    StudentBestBySemesterComponent,
    ManageEmployeeComponent,
    ProfileEmployeeComponent,
    ProfileStudentComponent,
    ProfileTeacherComponent,
    ManageScheduleDatenowComponent,
    EvaluesComponent,
    ManageEvalueComponent,
    ManageImportscoreComponent,
    ListEvalueComponent,
    ManageRoomdatenowComponent,
    ManageListevalueComponent,
    NominalclassAddstudentComponent,
    ManageRecordComponent,
    DashboardComponent,
    StudentNewHTComponent,
    StudentNewHPComponent,
    StudentNewVLComponent,
    ResponseComponent,
    SendMailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgSelect2Module,
    OrderModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    GoogleChartsModule,
    ChartModule,
  ],
  providers: [CategorysService,
              PostService,
              SubjectService,
              ClassService,
              SemesterService,
              TeacherService,
              StudentsService,
              RoomsService,
              NominalClassService,
              MajorService,
              CourseService,
              LoginService,
              CookieService,
              SkoftesService,
              SchedulesService,
              AttendsService,
              ClassDetailService,
              TeacherMyclassService,
              ResultService,
              TeacherImportscoreService,
              AccountService,
              EmployeeService,
              EvaluesService,
              RecordService,
              SendmailService,
              AuthGuard,AuthStudentGuard,AuthLecturerGuard,AuthLoginGuard,

              CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService, 
        ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
