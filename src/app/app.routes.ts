import { Routes } from '@angular/router';
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
import { ManageClassDetailComponent } from './components-admin/Class (Detail)/manage-class-detail/manage-class-detail.component';

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

import { StudentScheduleTestComponent } from './components-students/student-schedule-test/student-schedule-test.component';
import { TeacherScheduleComponent } from './components-teachers/teacher-schedule/teacher-schedule.component';
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
import { SendMailComponent } from './components-admin/Sendmail/send-mail/send-mail.component';
//auth
import { AuthGuard } from './Auth/auth.guard';
import { AuthStudentGuard } from './Auth/auth-student.guard';
import { AuthLecturerGuard } from './Auth/auth-lecturer.guard';
import { AuthLoginGuard } from './Auth/auth-login.guard';
import { AuthChangePassGuard } from './Auth/auth-change-pass.guard';
import { StudentHistoryService } from './services/student-history.service';

export const appRoutes : Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [AuthLoginGuard]
    },
    {
      path: 'change-password',
      component: ChangePasswordComponent,
      canActivate: [AuthChangePassGuard]
    },
    {
      path: '403',
      component: ResponseComponent,
    },
    {
      path: 'admin/dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-record',
      component: ManageRecordComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/sendMail',
      component: SendMailComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-importscore',
      component: ManageImportscoreComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'nominalclass-addstudent',
      component: NominalclassAddstudentComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-evalue',
      component: ManageEvalueComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-listevalue',
      component: ManageListevalueComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-schedules-datenow',
      component: ManageScheduleDatenowComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/profile-student',
      component: ProfileStudentComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/profile-teacher',
      component: ProfileTeacherComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/profile-employee',
      component: ProfileEmployeeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-employee',
      component: ManageEmployeeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/statistical-student-by-year',
      component: StudentByYearComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/statistical-student-by-major',
      component: StudentByMajorComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/statistical-student-best-by-year',
      component: StudentBestByYearComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/statistical-student-best-by-major',
      component: StudentBestByMajorComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/statistical-student-best-semester',
      component: StudentBestBySemesterComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-account',
      component: ManageAccountComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-resultbyclass',
      component: ManageResultbyclassComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-attendsbyclass',
      component: ManageAttendsbyclassComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-student',
      component: ManageStudentComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-category',
      component: ManageCategoryComponent,
      canActivate: [AuthGuard]
    },

    {
      path: 'admin/manage-class',
      component: ManageClassComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-classDetail',
      component: ManageClassDetailComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-post',
      component: ManagePostComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-room',
      component: ManageRoomComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-roomdatenow',
      component: ManageRoomdatenowComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-semester',
      component: ManageSemesterComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-subject',
      component: ManageSubjectComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-teacher',
      component: ManageTeacherComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-major',
      component: ManageMajorComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-nominalclass',
      component: ManageNominalclassComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-course',
      component: ManageCourseComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-schedules',
      component: ManageSchedulesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-skoftes',
      component: ManageSkoftesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-attends',
      component: ManageAttendsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'admin/manage-result',
      component: ManageResultComponent,
      canActivate: [AuthGuard]
    },

///////////////////////////////////////////////////////////
    {
      path: 'student/news-hp',
      component: StudentNewHPComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/news-vl',
      component: StudentNewVLComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/news-ht',
      component: StudentNewHTComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/profile',
      component: StudentProfileComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/list-evalue',
      component: ListEvalueComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'start/evalues',
      component: EvaluesComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/achievements',
      component: StudentAchievementsComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/news',
      component: StudentNewsComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/attends',
      component: StudentAttendsComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/history',
      component: StudentHistoryComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/news',
      component: StudentNewsComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/index',
      component: StudentIndexComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/schedule',
      component: StudentScheduleComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/score',
      component: StudentScoreComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/semester-score',
      component: StudentSemesterScoreComponent,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/student-history',
      component: StudentHistoryService,
      canActivate: [AuthStudentGuard]
    },
    {
      path: 'student/student-schedule-test',
      component: StudentScheduleTestComponent,
      canActivate: [AuthStudentGuard]
    },

/////////////////////////////////////////////////////////
    {
      path: 'teacher/profile',
      component: TeacherProfileComponent,
      canActivate: [AuthLecturerGuard]
    },
    {
      path: 'teacher/dashboard',
      component: TeacherDashbroadComponent,
      canActivate: [AuthLecturerGuard]
    },
    {
      path: 'teacher/schedule',
      component: TeacherScheduleComponent,
      canActivate: [AuthLecturerGuard]
    },
    {
      path: 'teacher/myclass',
      component: TeacherMyclassComponent,
      canActivate: [AuthLecturerGuard]
    },
    {
      path: 'teacher/import-score',
      component: ImportScoreComponent,
      canActivate: [AuthLecturerGuard]
    },
    {
      path: 'teacher/teacher-attends',
      component: TeacherAttendsComponent,
      canActivate: [AuthLecturerGuard] 
    }

];
