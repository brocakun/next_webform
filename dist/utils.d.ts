import * as React from 'react';
import { ErrorObjectType, WebformContextType } from './types';
export declare function getChildElements(containerElement: any): Array<string | number>;
export declare const WebformContext: React.Context<WebformContextType>;
export declare const getNormalizedErrorMessages: (errors: any) => ErrorObjectType;
export declare function toPath(key: string): Array<string>;
export declare function toKey(path: Array<string>): string;
export declare function setIn(obj: object, path: string, value: unknown): object;
export declare function isObject(item: any): boolean;
export declare const isInteger: (obj: unknown) => boolean;
export declare const isFunction: (object: unknown) => object is Function;
export declare function isIterable(item: any): item is Iterable<unknown>;
export declare const useConstructor: (callback: any) => void;
export declare const cssStringToObject: (string: any) => {};
export declare const reactPropertyMap: {
    accept: string;
    acceptcharset: string;
    'accept-charset': string;
    accesskey: string;
    action: string;
    allowfullscreen: string;
    alt: string;
    as: string;
    async: string;
    autocapitalize: string;
    autocomplete: string;
    autocorrect: string;
    autofocus: string;
    autoplay: string;
    autosave: string;
    capture: string;
    cellpadding: string;
    cellspacing: string;
    challenge: string;
    charset: string;
    checked: string;
    children: string;
    cite: string;
    class: string;
    classid: string;
    classname: string;
    cols: string;
    colspan: string;
    content: string;
    contenteditable: string;
    contextmenu: string;
    controls: string;
    controlslist: string;
    coords: string;
    crossorigin: string;
    dangerouslysetinnerhtml: string;
    data: string;
    datetime: string;
    default: string;
    defaultchecked: string;
    defaultvalue: string;
    defer: string;
    dir: string;
    disabled: string;
    disablepictureinpicture: string;
    disableremoteplayback: string;
    download: string;
    draggable: string;
    enctype: string;
    enterkeyhint: string;
    for: string;
    form: string;
    formmethod: string;
    formaction: string;
    formenctype: string;
    formnovalidate: string;
    formtarget: string;
    frameborder: string;
    headers: string;
    height: string;
    hidden: string;
    high: string;
    href: string;
    hreflang: string;
    htmlfor: string;
    httpequiv: string;
    'http-equiv': string;
    icon: string;
    id: string;
    imagesizes: string;
    imagesrcset: string;
    innerhtml: string;
    inputmode: string;
    integrity: string;
    is: string;
    itemid: string;
    itemprop: string;
    itemref: string;
    itemscope: string;
    itemtype: string;
    keyparams: string;
    keytype: string;
    kind: string;
    label: string;
    lang: string;
    list: string;
    loop: string;
    low: string;
    manifest: string;
    marginwidth: string;
    marginheight: string;
    max: string;
    maxlength: string;
    media: string;
    mediagroup: string;
    method: string;
    min: string;
    minlength: string;
    multiple: string;
    muted: string;
    name: string;
    nomodule: string;
    nonce: string;
    novalidate: string;
    open: string;
    optimum: string;
    pattern: string;
    placeholder: string;
    playsinline: string;
    poster: string;
    preload: string;
    profile: string;
    radiogroup: string;
    readonly: string;
    referrerpolicy: string;
    rel: string;
    required: string;
    reversed: string;
    role: string;
    rows: string;
    rowspan: string;
    sandbox: string;
    scope: string;
    scoped: string;
    scrolling: string;
    seamless: string;
    selected: string;
    shape: string;
    size: string;
    sizes: string;
    span: string;
    spellcheck: string;
    src: string;
    srcdoc: string;
    srclang: string;
    srcset: string;
    start: string;
    step: string;
    style: string;
    summary: string;
    tabindex: string;
    target: string;
    title: string;
    type: string;
    usemap: string;
    value: string;
    width: string;
    wmode: string;
    wrap: string;
};
export declare const getIndexOfMultiValue: (string: any) => any;
export declare const getCurrentError: (clientSideError: any, serverSideError: any) => any;
/**
 * deepmerge array merging algorithm
 * https://github.com/TehShrike/deepmerge#arraymerge-example-combine-arrays
 */
export declare const arrayMerge: (target: any[], source: any[], options: any) => any[];
export declare function updateNameAndIdWithIndex(index: any, element: any): void;
export declare function resolvePath(path: string, obj: object): any;
export declare const checkDateMinMax: (value: string, element: object) => string;
export declare const convertDateToISO: (date: any) => any;
