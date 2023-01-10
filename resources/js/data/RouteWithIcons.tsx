import DashboardIcon from '../assets/icons/sidebar/DashboardIcon';
import DiscountIcon from "../assets/icons/sidebar/DiscountIcon";
import SettingsIcon from "../assets/icons/sidebar/SettingsIcon";
import HomeIcon from "../assets/icons/sidebar/HomeIcon";
import NotificationIcon from "../assets/icons/sidebar/Notiication";
import MessageIcon from "../assets/icons/sidebar/MessageIcon";
import React from 'react';

const Routes = [
    {
        id: 1,
        icon: <HomeIcon color={'#EA7C69'} width={'30'} height={'25'}/>,
        activeIcon: <HomeIcon color={'white'} width={'30'} height={'25'}/>,
        path: '/',
        pathName: 'Home'
    },
    {
        id: 2,
        icon: <DiscountIcon color={'#EA7C69'} width={'30'} height={'25'}/>,
        path: '/orders',
        activeIcon: <DiscountIcon color={'white'} width={'30'} height={'25'}/>,
        pathName: 'Orders'
    },

    {
        id: 4,
        icon: <MessageIcon color={'#EA7C69'} width={'30'} height={'25'}/>,
        path: '/Message',
        activeIcon: <MessageIcon color={'white'} width={'30'} height={'25'}/>,
        pathName: 'Message'
    },
    {
        id: 5,
        icon: <NotificationIcon color={'#EA7C69'} width={'30'} height={'25'}/>,
        path: '/Notification',
        activeIcon: <NotificationIcon color={'white'} width={'30'} height={'25'}/>,
        pathName: 'Notification',
    },
];

const AdminRoutes = [
    // {
    //     id:1,
    //     icon: <RestaurantIcon color={'#EA7C69'} width={'56'} height={'55'}/>,
    //     path: '/inventory',
    //     activeIcon: <RestaurantIcon color={'white'} width={'56'} height={'55'}/>,
    //     pathName:'Your Restaurant'
    // },
    {
        id: 2,
        icon: <DiscountIcon color={'#EA7C69'} width={'30'} height={'25'}/>,
        path: '/discount',
        activeIcon: <DiscountIcon color={'white'} width={'30'} height={'25'}/>,
        pathName: 'Discount'
    },
    {
        id: 3,
        icon: <DashboardIcon color={'#EA7C69'} width={'30'} height={'25'}/>,
        path: '/dashboard',
        activeIcon: <DashboardIcon color={'white'} width={'30'} height={'25'}/>,
        pathName: 'Dashboard'
    },
    {
        id: 4,
        icon: <MessageIcon color={'#EA7C69'} width={'30'} height={'25'}/>,
        path: '/Message',
        activeIcon: <MessageIcon color={'white'} width={'30'} height={'25'}/>,
        pathName: 'Message'
    },
    {
        id: 5,
        icon: <NotificationIcon color={'#EA7C69'} width={'30'} height={'25'}/>,
        path: '/Notification',
        activeIcon: <NotificationIcon color={'white'} width={'30'} height={'25'}/>,
        pathName: 'Notification',
    },
    {
        id: 6,
        icon: <SettingsIcon color={'#EA7C69'} width={'30'} height={'25'}/>,
        path: '/settings',
        activeIcon: <SettingsIcon color={'white'} width={'30'} height={'25'}/>,
        pathName: 'Settings'
    },
];


export {Routes, AdminRoutes}
