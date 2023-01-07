import React from "react";
import '../../../style/sidebar.scss'
import SidebarCard from "./partial/sidebarCard";
import {AdminRoutes, Routes} from "../../../data/RouteWithIcons";
import {NavLink, useLocation} from "react-router-dom";
import LogOutIcon from "../../../assets/icons/sidebar/LogOutIcon";
import {useNavigate} from "react-router";
import LogInIcon from "../../../assets/icons/sidebar/LogInIcon";
import RestaurantIcon from "../../../assets/icons/sidebar/RestaurantIcon";
import {useStateValue} from "../../../states/StateProvider";
import { MdOutlineDarkMode } from 'react-icons/md';
import {BsSun} from "react-icons/bs";

const sidebar = () => {

    const [{theme}, dispatch] = useStateValue();
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));
    let admin = user?.admin;
    const url = useLocation();
    const basePath=url.pathname.split('/')[1]

    function logout() {
        window.localStorage.removeItem('user')
        // navigate('/POS')
        window.location.replace('/')
    }


    return (
        <div className='sidebar'>
            {/*<label className="toggleDarkBtn">*/}
            {/*    /!*<p>Dark Mode</p>*!/*/}
            {/*    <input type="checkbox" onClick={() => dispatch({type:'SetTheme', item:!theme})} />*/}
            {/*    <span className="slideBtnTg round"/>*/}
            {/*</label>*/}
            {
                admin &&
                <div style={{
                    marginTop:'30px',
                    marginLeft: '10px',
                    maxHeight: '80px',
                }}
                     className={basePath==='' && 'sidebarActiveColor' }
                >
                    <div onClick={()=>navigate('/')}
                         style={{margin: '12px 0 0 12px',cursor:'pointer'}} data-tip='Your Restaurant'
                    >
                        <RestaurantIcon width={'80'} height={'65'}/>
                    </div>
                </div>
            }

            {
                (admin) ?
                    AdminRoutes.map((route) =>
                        <SidebarCard key={route.id} activeIcon={route.activeIcon} icon={route.icon} path={route.path}
                                     name={route.pathName}/>
                    )
                    :
                    Routes.map((route) =>
                        <SidebarCard key={route.id} activeIcon={route.activeIcon} icon={route.icon} path={route.path}
                                     name={route.pathName}/>
                    )
            }
            {
                (user) ?
                    <div onClick={logout} className='cursor-pointer' style={{ marginLeft: '32px'}} data-tip='log out'>
                        <br/>
                        <LogOutIcon color={'#EA7C69'} width={'30'} height={'25'}/>
                    </div> :
                    <NavLink to='/login' data-tip='log in' style={{ marginLeft: '32px'}}>
                        <br/>
                        <LogInIcon color={'#EA7C69'} width={'30'} height={'25'}/>
                    </NavLink>
            }
            <div style={{marginTop:'50px', marginLeft:'32px'}}>
                <div className='cursor-pointer' onClick={() => dispatch({type:'SetTheme', item:!theme})}>
                    {
                        !theme?
                            <MdOutlineDarkMode size={'30px'} color={'#EA7C69'}/>
                            :
                            <BsSun size={'30px'} color={'#EA7C69'}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default sidebar
