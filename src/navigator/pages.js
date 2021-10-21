import {HomePage, ResetPasswordPage, ErrorPage} from 'pages';

const pages = [
  {
    path: '/',
    component: HomePage,
    strict: true,
    exact: true,
    sensitive: true,
  },
  {
    path: '/reset-password/:token/',
    component: ResetPasswordPage,
    strict: true,
    exact: true,
    sensitive: true,
  },
  {
    path: '*',
    component: ErrorPage,
    strict: true,
    exact: true,
    sensitive: true,
  },
];

export default pages;
