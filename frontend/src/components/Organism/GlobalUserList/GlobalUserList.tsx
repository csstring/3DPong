/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GlobalUserList.tsx                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: minkyeki <minkyeki@student.42seoul.kr>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/11 14:37:57 by minkyeki          #+#    #+#             */
/*   Updated: 2023/03/13 15:21:08 by minkyeki         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


/** (1) List component  
 * @link1 https://mui.com/material-ui/react-list/
 * 
 * @link2 https://mui.com/material-ui/react-app-bar/
 * 
 * @link3 https://mui.com/material-ui/react-skeleton/ --> 로딩 지연시 보여줄 내용. (Skeleton)
 * 
 *      - Header
 *      - AddBtn
 *      - Search
 *      - SearchResult (Below is an example if UserList)
 *          - UserCard
 *              - Profile image
 *              - Nickname
 *              - actionBtn (Ban, Add, sendDM)
 * 
*/ 


import React, {useEffect, useState} from "react";

import SearchTextField from "@/components/Organism/Molecule/SearchTextField";
import VirtualizedUserList from "./UserList";
import MediaCard from "@/components/Organism/Molecule/MediaCard";
import { bgcolor, Box } from "@mui/system";
import { Paper } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'; // 마우스 hover시에 힌트 뜨기 위함.

import { ItemButtonLink } from "@/components/Organism/Controller/Controller";


export interface User {
    imgSrc: string, // img url
    name:   string, // nickname
}

export type Users = User[]; // user배열.

// Test code
const UserDataTest: Users = [
    {
        imgSrc : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        name   : "minkyeki",
    },
    {
        imgSrc : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        name   : "minkyeuKim",
    },
    {
        imgSrc : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        name   : "Jake",
    },
    {
        imgSrc : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        name   : "DongKim",
    },
    {
        imgSrc : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        name   : "User5",
    },
    {
        imgSrc : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        name   : "User6",
    },
    {
        imgSrc : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        name   : "User7",
    },
]
    
const createInitialUsers = (initialCount: number) => {
    let users = new Array<User>();
    while (initialCount > 0) {
        users.push({
            imgSrc : "",
            name: initialCount.toString(),
        })
        --initialCount;
    }
    return users;
}


export default function GlobalUserList() {

    // (0) UserData (Skeleton render를 위한 초기 initial render용 데이터.)
    const [users, setUsers] = useState<Users>( createInitialUsers(50) );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // (1) 검색할 문자열.
    const [searchString, setSearchString] = useState<string>("");
    
    const getUserData = () => {
        setIsLoading(true); // 로딩중 flag
        return new Promise<Users>((resolve, reject) => {
            setTimeout(() => {
                resolve(UserDataTest);
            }, 2000);
        });
    }

    // (1) initial data loading
    const onClick = () => {
        // async load
        // GET data from server. --> fetch via search_String
        (async () => {
            const receivedData = await getUserData();
            setUsers(receivedData);
            setIsLoading(false);
        })(/* IIFE */);
    };

    const onKeyUp = (event: React.KeyboardEvent) => {
        event.preventDefault();
        if (event.key === "Enter") {
            onClick();
        }
    }

    return (
        <>
            {/*  */}
            <MediaCard
                // 이미지는 Dribble에서 가져옴. https://dribbble.com/shots/17023457-Friend
                imageUrl="https://cdn.dribbble.com/userupload/3345426/file/original-810456efca16997843a7cf36f34b4ef7.png?compress=1&resize=1024x684"
                title="Add Friends"
                body="body2 text"
            />

            {/* https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp */}
            <div className=" border">
                <SearchTextField state={searchString} setState={setSearchString} onClick={onClick} onKeyUp={onKeyUp}/>
            </div>

            {/*  */}
            <VirtualizedUserList users={users} isLoading={isLoading} />
        </>
    );
}