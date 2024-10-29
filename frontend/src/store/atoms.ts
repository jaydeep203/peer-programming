import {atom} from "recoil";

export const authModal = atom<boolean>({
    key: 'authModal',
    default: false,
});