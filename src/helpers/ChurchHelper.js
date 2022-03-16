import axios from 'axios';
import {rootLink} from "./utils";
axios.defaults.validateStatus = (status) => status >= 200

// axios is global, see resources/js/bootstrap.js


export const addUserToDB = async (name, email, phone, country, purpose) => {
   const d = await axios.post(`${rootLink()}/api/add_guest_data`, {
        name,
        email,
        phone,
        country,
        purpose
    });
   console.log(d);
}

export const recordMediaStat = async (media_id, route) => {
    if (!['like', 'open', 'bounce', 'engage'].includes(route)) return
    if (localStorage.getItem(`${route}:${media_id}`)) return

    localStorage.setItem(`${route}:${media_id}`, "true")
    await axios.post(`${rootLink()}/api/media/${media_id}/${route}`)
    if (route === 'like') {
        recordMediaStat(media_id, 'engage')
    }
}

export const postComment = async (media_id, comment) => {
    await axios.post(`${rootLink()}/api/media/${media_id}/comment`, comment)
    recordMediaStat(media_id, 'engage')
}

export const getComments = async (media_id) => {
    const { data } = await axios.get(`${rootLink()}/api/media/${media_id}/comments`)
    const { data: comments } = data
    return comments || []
}

export const recordVideoView = (media_id, user_id) => {
    const key = `view:${media_id}:${user_id}`
    if (localStorage.getItem(key)) return
    localStorage.setItem(key, media_id)
    axios.post(`/api/media/${media_id}/${user_id}/view`)
}

export const getMediaObject = async (media_id, user_id) => {
    // return {
    //     name: "A video",
    //     likes: 20,
    //     created_at: new Date(),
    //     comments: 45,
    //     views: 14,
    // }
    const { data } = await axios.get(`${rootLink()}/api/media/${media_id}`)
    recordVideoView(media_id, user_id)

    const { success, data: d, message } = data

    if (!d) {
        return {
            name: "Loading...",
            likes: (localStorage.getItem(`likes:${media_id}`)=='true') | 0,
            created_at: new Date(),
            comments: 0,
            views: 1,
        }
    }
    return d
}

export const fetchUser = async (user_slug) => {
    const { data } = await axios.get(`${rootLink()}/api/user/${user_slug}`);
    return data;
}

export const fetchMediaLinkLikes = async () => {
    const { data } = await axios.get(`${rootLink()}/api/non_member_media_link/likes`);
    return data;
}

export const fetchMediaLinkViews = async () => {
    const path_name = window.location.pathname;
    const { data } = await axios.post(`${rootLink()}/api/church_media_link/views`, {
        path_name,
    });
    return data;
}
// {path}/{member_slug}
// Getting curent path in Javascript
export const updateMediaLinkViews = async () => {
    const path_name = window.location.pathname;
    const slug =  path_name.split('/')[3];


    const d = await axios.post(`${rootLink()}/api/church_media_link_views/update`, {
        path_name,
        slug,
    });
    return d;

}

export const updateMediaLinkDownloads = async () => {
    const path_name = window.location.pathname;
    const data = await axios.post(`${rootLink()}/api/church_media_link/downloads/update`, {
        path_name,
    });
    console.log(data);
    return data;
}

export const fetchMediaLinkDownloads = async () => {
    const path_name = window.location.pathname;
    const { data } = await axios.post(`${rootLink()}/api/church_media_link/downloads`, {
        path_name,
    });
    return data;
}


export const fetchMediaLinkShares = async () => {
    const path_name = window.location.pathname;
    const { data } = await axios.post(`${rootLink()}/api/church_media_link/shares`, {
        path_name,
    });
    return data;
}

export const getLatestPdf = async () => {
    const { data } = await axios.get(`${rootLink()}/api/pdf/latest`)
    const { data: d } = data
    return d
}
