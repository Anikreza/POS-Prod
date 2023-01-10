import React from "react";

export type  regError = {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    repeatPassword?: string,

}

export type reducerType = {
    reducer?: any,
    initialState?: object,
    children?: React.ReactElement,
}

export type basketCalculator = {
    price: number,
    quantity: number,
    discount: number,
    productId: number,
}
export type actions =
    {
        type?: string,
        item?: string | number,
        id?: number,
        value?: string | number,
        method?: string,
        tableId?: number,
        note?: string,
        query?: string,
    }
export type svg =
    {
        width: string | number | undefined,
        height: string | number | undefined,
        color: string | undefined,
    }
