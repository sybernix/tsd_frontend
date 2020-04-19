import React, { Component, useState } from "react";
import { FormControl, Input } from "@material-ui/core/";
import Cookies from 'js-cookie';


export function getJWT() {
    let token = Cookies.get("infinity");
    let userLevel = Cookies.get("usuario");
    return {
        token: token,
        userLevel: userLevel
    };
}
