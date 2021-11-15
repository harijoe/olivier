/**
 * @format
 */

import { AppRegistry } from 'react-native';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import duration from 'dayjs/plugin/duration';

import App from './src/App';
import { name as appName } from './app.json';

dayjs.extend(duration);
dayjs.extend(isSameOrAfter);

AppRegistry.registerComponent(appName, () => App);
