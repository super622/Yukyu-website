import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    exact: 'true',
    path: '/auth/reset-password-1',
    element: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/mypage',
        element: lazy(() => import('./views/mypage'))
      },
      {
        exact: 'true',
        path: '/mypage/edit_email',
        element: lazy(() => import('./views/mypage/editemail'))
      },
      {
        exact: 'true',
        path: '/mypage/edit_password',
        element: lazy(() => import('./views/mypage/edit_password'))
      },
      {
        exact: 'true',
        path: '/mypage/setting_notification_category',
        element: lazy(() => import('./views/mypage/settingnotificate'))
      },
      {
        exact: 'true',
        path: '/dashboard',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/employee',
        element: lazy(() => import('./views/employee/employee'))
      },
      {
        exact: 'true',
        path: '/employee/create',
        element: lazy(() => import('./views/employee/createEmployee'))
      },
      {
        exact: 'true',
        path: '/remaining_days/form',
        element: lazy(() => import('./views/employee/remainingDaysForm'))
      },
      {
        exact: 'true',
        path: '/department',
        element: lazy(() => import('./views/employee/department'))
      },
      {
        exact: 'true',
        path: '/department/:id',
        element: lazy(() => import('./views/employee/showDepartment'))
      },
      {
        exact: 'true',
        path: '/department/edit/:id',
        element: lazy(() => import('./views/employee/editDepartment'))
      },
      {
        exact: 'true',
        path: '/department/create',
        element: lazy(() => import('./views/employee/createDepartment'))
      },
      {
        exact: 'true',
        path: '/settings',
        element: lazy(() => import('./views/vacationSetting/paidHoliday'))
      },
      {
        exact: 'true',
        path: '/settings/rule_edit',
        element: lazy(() => import('./views/vacationSetting/ruleEdit'))
      },
      {
        exact: 'true',
        path: '/settings/annual_edit',
        element: lazy(() => import('./views/vacationSetting/annualEdit'))
      },
      {
        exact: 'true',
        path: '/special_items/create',
        element: lazy(() => import('./views/vacationSetting/createSpecialHoliday'))
      },
      {
        exact: 'true',
        path: '/special_items/:id',
        element: lazy(() => import('./views/vacationSetting/showSpecialHoliday'))
      },
      {
        exact: 'true',
        path: '/special_item/edit/:id',
        element: lazy(() => import('./views/vacationSetting/editSpecialHoliday'))
      },
      {
        exact: 'true',
        path: '/special_items',
        element: lazy(() => import('./views/vacationSetting/specialHoliday'))
      },
      {
        exact: 'true',
        path: '/used_day_requests',
        element: lazy(() => import('./views/leavemanagement/approvalofleaverequest'))
      },
      {
        exact: 'true',
        path: '/used_day_requests/show/:id',
        element: lazy(() => import('./views/leavemanagement/showApproveleaverequest'))
      },
      {
        exact: 'true',
        path: '/treat_multiple',
        element: lazy(() => import('./views/leavemanagement/allocatedigestall'))
      },
      {
        exact: 'true',
        path: '/overall_history',
        element: lazy(() => import('./views/leavemanagement/entireacquisitionhistory'))
      },
      {
        exact: 'true',
        path: '/treat_single/:id',
        element: lazy(() => import('./views/leavemanagement/individualgrantextinguishment'))
      },
      {
        exact: 'true',
        path: '/treat_single',
        element: lazy(() => import('./views/leavemanagement/individualgrantextinguishment'))
      },
      {
        exact: 'true',
        path: '/management_book',
        element: lazy(() => import('./views/leavemanagement/paidleavmanagebook'))
      },
      {
        exact: 'true',
        path: '/obligation',
        element: lazy(() => import('./views/leavemanagement/paidleavecheck'))
      },
      {
        exact: 'true',
        path: '/used_day_book',
        element: lazy(() => import('./views/leavemanagement/leaveacquisitionrecord'))
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: 'true',
        path: '/basic/pagination',
        element: lazy(() => import('./views/ui-elements/basic/BasicPagination'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
