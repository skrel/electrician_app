import React, { useState, useEffect, ScrollView } from "react";
import { auth } from "../firebase";

//images
export const CONFIG_DUPLEX_REC = 'https://skrel.github.io/jsonapi/public/image/config_duplex_rec.png';
export const CONFIG_DUPLEX_REC_GFI = 'https://skrel.github.io/jsonapi/public/image/config_duplex_rec_gfi.png';
export const CONFIG_DUPLEX_REC_SPLIT_WIRE = 'https://skrel.github.io/jsonapi/public/image/config_duplex_rec_split_wire.png';
export const CONFIG_SINGLE_POLE_SWITCH = 'https://skrel.github.io/jsonapi/public/image/config_single_pole_switch.png';
export const CONFIG_DOUBLE_POLE_SWITCH = 'https://skrel.github.io/jsonapi/public/image/config_double_pole_switch.png';
export const CONFIG_THREE_WAY_SWITCH = 'https://skrel.github.io/jsonapi/public/image/config_three_way_switch.png';
export const IMAGE_NA = 'https://skrel.github.io/jsonapi/public/image/na.png';

//json locations
//export const BOX = 'https://skrel.github.io/jsonapi/public/json/box.json';
export const BRACKET = 'https://skrel.github.io/jsonapi/public/json/bracket.json';
export const PANEL = 'https://skrel.github.io/jsonapi/public/json/panel.json';
export const WIRE = 'https://skrel.github.io/jsonapi/public/json/wire.json';
export const FIRE_ALARM = 'https://skrel.github.io/jsonapi/public/json/fire_alarm.json';
export const OTHER = 'https://skrel.github.io/jsonapi/public/json/other.json';
export const EXTENSION_RING = 'https://skrel.github.io/jsonapi/public/json/extension_ring.json';
export const DEVICE = 'https://skrel.github.io/jsonapi/public/json/device.json';
export const CONNECTOR = 'https://skrel.github.io/jsonapi/public/json/connector.json';
export const ACCESSORIES = 'https://skrel.github.io/jsonapi/public/json/accessories.json';
export const ASSEMBLY = 'https://skrel.github.io/jsonapi/public/json/assembly.json';
export const CONDUIT = 'https://skrel.github.io/jsonapi/public/json/conduit.json';

//other
export const DEFAULT_QTY = 1;
export const ASSEMBLY_TYPE_LOCAL = [
    {
        id: "1",
        img:"https://skrel.github.io/jsonapi/image/config_duplex_rec.png",
        title: "duplex receptacle"
    },
    {
        id: "2",
        img:"https://skrel.github.io/jsonapi/image/config_duplex_rec_gfi.png",
        title: "duplex receptacle gfi"
    },
    {
        id: "3",
        img:"https://skrel.github.io/jsonapi/image/config_duplex_rec_split_wire.png",
        title: "duplex receptacle split wire"
    },
    {
        id: "4",
        img:"https://skrel.github.io/jsonapi/image/config_single_pole_switch.png",
        title: "single pole switch"
    },
    {
        id: "5",
        img:"https://skrel.github.io/jsonapi/image/config_double_pole_switch.png",
        title: "double pole switch"
    },
    {
        id: "6",
        img:"https://skrel.github.io/jsonapi/image/config_three_way_switch.png",
        title: "three way switch"
    },
    {
        id: "7",
        img:"https://skrel.github.io/jsonapi/image/na.png",
        title: "other"
    }
];