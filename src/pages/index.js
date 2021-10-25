import {lazy} from 'react';

const ResetPasswordPage = lazy(() => import('./ResetPassword'));
const ErrorPage = lazy(() => import('./Error'));
const SuccessPage = lazy(() => import('./Success'));
const HomePage = lazy(() => import('./Home'));
const LoadingPage = lazy(() => import('./Loading'));
const ReceiptPage = lazy(() => import('./Receipt'));

export {HomePage, LoadingPage, ErrorPage, SuccessPage, ResetPasswordPage, ReceiptPage};
