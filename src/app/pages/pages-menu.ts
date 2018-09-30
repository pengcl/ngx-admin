import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '控制台',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true
  },
  {
    title: '分类',
    icon: 'nb-grid-a-outline',
    link: '/pages/catalogs'
  },
  {
    title: '城市',
    icon: 'nb-paper-plane',
    link: '/pages/cities'
  },
  {
    title: '课程',
    icon: 'nb-location',
    link: '/pages/courses'
  },
  {
    title: '签到',
    icon: 'nb-audio',
    link: '/pages/signs'
  }
];
