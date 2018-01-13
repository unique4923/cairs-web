import {
    FETCH_MENUS, NEXT_MENU, PREV_MENU
} from '../actionTypes/actionTypes';

const INITIAL_STATE = {
    menuHash: {},
    menuBreadCrumbs: [],

    currentMenu: {},
    currentMenuChildren: [],

    mainMenu: {},
    mainMenuChildren: []
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_MENUS: 
            return { 
                ...state, 
                menuHash: action.payload.menuHash, 
                currentMenu: action.payload.currentMenu,
                mainMenu: action.payload.currentMenu,
                mainMenuChildren: action.payload.currentMenuChildren,
                currentMenuChildren: action.payload.currentMenuChildren
            };
        case NEXT_MENU:
            return {
                ...state,
                currentMenu: action.payload.currentMenu,
                currentMenuChildren: action.payload.currentMenuChildren,
                menuBreadCrumbs: action.payload.menuBreadCrumbs
            };
        case PREV_MENU: 
            return {
                ...state,
                currentMenu: action.payload.currentMenu,
                currentMenuChildren: action.payload.currentMenuChildren,
                menuBreadCrumbs: action.payload.menuBreadCrumbs
            }
        default: 
            return state;
    }
}