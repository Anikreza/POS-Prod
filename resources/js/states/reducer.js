export const initialState = {
    basket: [],
    user: {},
    state: 0,
    orderStatusFilter: false,
    settingsAdminRoute:'/settings',
    showNotification:false,
    quantity: 1,
    deliveryMethod: '',
    table: 0,
    filterDay: 'Today',
    category: {title: 0},
    query: 'all',
    modal: false,
    payMethod: 0,
    orderNote: '',
    theme: true
};

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => (item.price * item.quantity) + amount, 0);

export const getBasketDiscount = (basket) =>
    basket?.reduce((amount, item) => (item.discount * item.quantity*item.price) + amount, 0);

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [action.item, ...state.basket],
            };

        case "INCREMENT_QUANTITY":
            return {
                ...state,
                basket: state.basket.map(item => item.productId === action.id ? {
                    ...item,
                    quantity: action.value
                } : item),
            };

        case "updateCart":
            return {
                ...state,
                basket: state.basket.map(item => item.productId === action.id ? {
                    ...item,
                    deliveryMethod: action.method,
                    tableID: action.tableId,
                } : item),
            };

        case "setOrderNote":
            return {
                ...state,
                basket: state.basket.map(item => item.productId === action.id ? {
                    ...item,
                    orderNote: action.note
                } : item),
            };

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            };

        case "REMOVE_FROM_BASKET":
            let newBasket = state.basket.filter(
                (basketItem) => basketItem.productId !== action.id
            );
            return {
                ...state,

                basket: newBasket
            }
        case "SET_USER":
            return {
                ...state,
                user: action.item
            }
        case "setCategory":
            return {
                ...state,
                category: action.item
            }

        case "setState":
            return {
                ...state,
                state: action.item
            }
            case "setSettingsAdminRoute":
            return {
                ...state,
                settingsAdminRoute: action.item
            }
            case "setOrderStatusFilter":
            return {
                ...state,
                orderStatusFilter: action.item
            }
            case "setShowNotification":
            return {
                ...state,
                showNotification: action.item
            }
        case "setQuantity":
            return {
                ...state,
                quantity: action.value
            }
        case "SetDeliveryMethod":
            return {
                ...state,
                deliveryMethod: action.item
            }
            case "setTable":
            return {
                ...state,
                table: action.item
            }
        case "SetFilterMethod":
            return {
                ...state,
                filterDay: action.item
            }

        case "SetModal":
            return {
                ...state,
                modal: action.item
            }
            case "SetTheme":
            return {
                ...state,
                theme: action.item
            }
        case "SetQuery":
            return {
                ...state,
                query: action.query
            }
        case "SetPayMethod":
            return {
                ...state,
                payMethod: action.item
            }
        default:
            return state;
    }
};

export default reducer;
