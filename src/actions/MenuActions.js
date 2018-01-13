import axios from 'axios';
import {
    FETCH_MENUS,
    NEXT_MENU,
    PREV_MENU
} from '../actionTypes/actionTypes';
import {
    LoadMenuList
} from '../Constants/PackType';
import {
    HomeController
} from '../Constants/ControllerUrls';
import {
    Process
} from '../Constants/ControllerActions';

const instance = axios.create({
    baseURL: HomeController
});

const rootMenu = 'cairs';

//INITIALIZATION METHOD
//fetches menu meta array from Cairs Server
//parses menu meta array into JSON object for O(1) access of each item; JSON obj is called "menuHash"
//currentMenu is set
//currentMenuChildren are created
export const fetchMenus = () => {
    return async (dispatch) => {
        const response = await instance.get(Process, {
            params: {
                data: JSON.stringify({
                    PackType: LoadMenuList,
                    JSONData: ''
                })
            }
        });
        const menus = JSON.parse(response.data.JSONData).Configured;
        const menuHash = createMenuHash(menus);
        const currentMenu = menuHash[rootMenu];
        const currentMenuChildren = createChildMenu(currentMenu.ChildMenuList, menuHash);
        dispatch({ type: FETCH_MENUS, payload: { menuHash, currentMenu, currentMenuChildren } });
    }
};

//NAVIGATION METHOD FORWARD >
//nextMenu is menu to navigate to
//prevMenu is menu that is being navigated away from
//nextMenu becomes currentMenu
//prevMenu is pushed to menuBreadCrumbs, menuBreadCrumbs will work like a stack, forward is push, backwards is pop
export const nextMenu = (nextMenu, menuHash, prevMenu, menuBreadCrumbs) => {
    const currentMenuChildren = createChildMenu(nextMenu.ChildMenuList, menuHash);
    let newMenuBreadCrumbs = menuBreadCrumbs;
    newMenuBreadCrumbs.push(prevMenu);
    return { type: NEXT_MENU, payload: { currentMenu: nextMenu, currentMenuChildren, menuBreadCrumbs: newMenuBreadCrumbs }};
};

//NAVIGATION METHOD BACK <
//menu becomes the current menu
//index is used so menuBreadCrumbs stack is popped until currentMenu
//childMenus is built based off menu
export const prevMenu = (menu, index, menuHash, menuBreadCrumbs) => {
    let newMenuBreadCrumbs = menuBreadCrumbs;
    for (let i = newMenuBreadCrumbs.length - 1; i >= 0; i--) {
        newMenuBreadCrumbs.pop();
        if (i === index) {
            break;
        }
    }
    const currentMenuChildren = createChildMenu(menu.ChildMenuList, menuHash);
    const currentMenu = menu;
    return { type: PREV_MENU, payload: { currentMenu, currentMenuChildren, menuBreadCrumbs: newMenuBreadCrumbs }};
}

//menus is the meta menu array from the server
//returns a JSON object where each element in the meta array is object in the json wrapper object.
//the key to each object is the Key prop in each object
//runs in O(n) where n is the length of menus
//allows O(1) access for each menu
const createMenuHash = (menus) => {
    let menuHash = {};
    for (let i=0; i< menus.length; i++) {
        menuHash = { ...menuHash, [menus[i].Key]: menus[i]}
    }
    return menuHash;
};

//creates an array of menuItems that are the children of the currentMenu
//runs in O(n) where n is length of childMenus
const createChildMenu = (childMenus, menuHash) => {
    let childMenuResult = [];
    for (let i = 0; i < childMenus.length; i++) {
        childMenuResult.push(menuHash[childMenus[i]]);
    }
    return childMenuResult;
};

