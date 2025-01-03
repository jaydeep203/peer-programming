import {atom} from "recoil";

interface userProps{
    userId: string;
    username: string;
    name: string | null;
    email: string | null;
    profilePic: string | null;
    bio: string | null;
}

export const authModal = atom<boolean>({
    key: 'authModal',
    default: false,
});

export const createProjectModal = atom<boolean>({
    key: 'createProjectModal',
    default: false,
});

export const profileEditModal = atom<boolean>({
    key: 'profileEditModal',
    default: false,
});

export const projectShareModal = atom<boolean>({
    key: 'projectShareModal',
    default: false,
});

export const isLoggedIn = atom<boolean>({
    key: 'isLoggedIn',
    default: false
});

export const user = atom<userProps | null>({
    key: 'user',
    default: {
        userId: "",
        username: "",
        name: "",
        email: "",
        profilePic: "",
        bio: ""
    }
});