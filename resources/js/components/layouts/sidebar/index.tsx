import React, {useEffect, useState} from "react";
import '../../../style/sidebar.scss'
import SidebarCard from "./partial/sidebarCard";
// @ts-ignore
import {AdminRoutes, Routes} from "../../../data/RouteWithIcons";
import {NavLink, useLocation} from "react-router-dom";
import LogOutIcon from "../../../assets/icons/sidebar/LogOutIcon";
import {useNavigate} from "react-router";
import LogInIcon from "../../../assets/icons/sidebar/LogInIcon";
import RestaurantIcon from "../../../assets/icons/sidebar/RestaurantIcon";
import {useStateValue} from "../../../states/StateProvider";
import {MdOutlineDarkMode} from 'react-icons/md';
import {BsSun} from "react-icons/bs";

const sidebar = () => {
    const [{theme}, dispatch]: any = useStateValue();
    const navigate = useNavigate()
    let ls: any = localStorage.getItem('user')
    const user = JSON.parse(ls);
    let admin = user?.admin;
    const url = useLocation();
    const basePath = url.pathname.split('/')[1]
    const [Lang, setLang] = useState('en');
    const currentLang = localStorage.getItem('language')

    const languages = [
        {value: 'en', text: ""},
        {value: 'bn', text: "Bengali"},
        {value: 'en', text: "English"},
    ]

    useEffect(() => {
        localStorage.setItem('language',Lang)
    }, [Lang]);

    const handleChange = (value: React.SetStateAction<string>) => {
        setLang(value);
        let loc = "http://localhost:8000/";
        window.location.replace(loc + "?lng=" + value);
    }

    function logout() {
        window.localStorage.removeItem('user')
        window.location.replace('/')
    }


    return (
        <div className='sidebar'>
            <div className='pt-8 text-center text-appWhite'>
                <a onClick={() => handleChange('en')}
                   className={`${currentLang==='en' || !currentLang? 'bg-theme' : 'opacity-80'} py-1 px-2 cursor-pointer  hover:text-offWhite`}
                >En
                </a>
                <a onClick={() => handleChange('bn')}
                   className={`${'bn'===currentLang? 'bg-theme' : 'opacity-80'} py-1 px-2 cursor-pointer hover:text-offWhite`}
                >Bn
                </a>
            </div>

            {
                admin &&
                <div style={{
                    marginTop: '30px',
                    marginLeft: '10px',
                    maxHeight: '80px',
                }} className={basePath === '' ? 'sidebarActiveColor' : ''}>
                    <div onClick={() => navigate('/')}
                         style={{margin: '12px 0 0 12px', cursor: 'pointer'}} data-tip='Your Restaurant'
                    >
                        <RestaurantIcon width={'80'} height={'65'} color={''}/>
                    </div>
                </div>
            }
            {
                (admin) ?
                    AdminRoutes.map((route: { id: any; activeIcon: any; icon: any; path: any; pathName: any; }) =>
                        <SidebarCard key={route.id} activeIcon={route.activeIcon} icon={route.icon} path={route.path}
                                     name={route.pathName}/>
                    )
                    :
                    Routes.map((route: { id: any; activeIcon: any; icon: any; path: any; pathName: any; }) =>
                        <SidebarCard key={route.id} activeIcon={route.activeIcon} icon={route.icon} path={route.path}
                                     name={route.pathName}/>
                    )
            }
            {
                (user) ?
                    <div onClick={logout} className='cursor-pointer' style={{marginLeft: '32px'}} data-tip='log out'>
                        <br/>
                        <LogOutIcon color={'#19b275'} width={'30'} height={'25'}/>
                    </div> :
                    <NavLink to='/login' data-tip='log in' style={{marginLeft: '32px'}}>
                        <br/>
                        <LogInIcon color={'#19b275'} width={'30'} height={'25'}/>
                    </NavLink>
            }
            <div style={{marginTop: '50px', marginLeft: '32px'}}>
                <div className='cursor-pointer' onClick={() => dispatch({type: 'SetTheme', item: !theme})}>
                    {
                        !theme ?
                            <MdOutlineDarkMode size={'30px'} color={'#19b275'}/>
                            :
                            <BsSun size={'30px'} color={'#19b275'}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default sidebar
