import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { QuitComponent } from './shared/quit/quit.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { NewMaterialComponent } from './new-material/new-material.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { SettingComponent } from './setting/setting.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DailyUsesListComponent } from './daily-uses-list/daily-uses-list.component';
import { DailyUseFormComponent } from './daily-use-form/daily-use-form.component';
import { BusinessReportComponent } from './business-report/business-report.component';
import { BackupAndRestoreComponent } from './backup-and-restore/backup-and-restore.component';
import { ReportCategoriesComponent } from './report-categories/report-categories.component';
import { ReportCategoryFormComponent } from './report-category-form/report-category-form.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'transactions',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: EditProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'backup-and-restore',
        component: BackupAndRestoreComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'report',
        component: BusinessReportComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'transactions/new',
        component: TransactionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'transactions/:id',
        component: TransactionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'transactions',
        component: TransactionsListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'daily-expenses',
        component: DailyUsesListComponent,
        children: [
            {
                path: 'new',
                component: DailyUseFormComponent
            },
            {
                path: ':id',
                component: DailyUseFormComponent
            },
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'categories',
        component: CategoriesListComponent,
        children: [
            {
                path: 'new',
                component: NewCategoryComponent
            },
            {
                path: ':id',
                component: EditCategoryComponent
            }
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'materials',
        component: MaterialsListComponent,
        children: [
            {
                path: 'new',
                component: NewMaterialComponent
            },
            {
                path: ':id',
                component: EditMaterialComponent
            }
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'report-categories',
        component: ReportCategoriesComponent,
        children: [
            {
                path: 'new',
                component: ReportCategoryFormComponent
            },
            {
                path: ':id',
                component: ReportCategoryFormComponent
            }
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        component: UsersComponent,
        children: [
            {
                path: 'new',
                component: UserFormComponent
            },
            {
                path: ':id',
                component: UserFormComponent
            }
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        component: SettingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'quit',
        component: QuitComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    }
]
