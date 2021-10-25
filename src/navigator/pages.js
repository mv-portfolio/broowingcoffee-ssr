import {HomePage, ResetPasswordPage, ReceiptPage, ErrorPage} from 'pages';

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
    path: '/receipt/:token/',
    component: ReceiptPage,
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
