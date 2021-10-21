import {lazy} from 'react';

const Button = lazy(() => import('./Button'));
const Dialog = lazy(() => import('./Dialog'));
const Dropdown = lazy(() => import('./Dropdown'));
const Icon = lazy(() => import('./Icon'));
const Modal = lazy(() => import('./Modal'));
const Progress = lazy(() => import('./Progress'));
const Separator = lazy(() => import('./Separator'));
const Text = lazy(() => import('./Text'));
const TextInput = lazy(() => import('./TextInput'));
const View = lazy(() => import('./View'));
const Image = lazy(() => import('./Image'));

export {
  Button,
  Dialog,
  Dropdown,
  Icon,
  Image,
  Modal,
  Progress,
  Separator,
  Text,
  TextInput,
  View,
};
