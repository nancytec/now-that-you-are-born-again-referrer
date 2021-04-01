import axios from 'axios';
axios.defaults.validateStatus = (status) => status >= 200

export const recordMediaStat = async (media_id, route) => {
    if (!['like', 'open', 'bounce', 'engage'].includes(route)) return
    if (localStorage.getItem(`${route}:${media_id}`)) return

    localStorage.setItem(`${route}:${media_id}`, "true")
    await axios.post(`/api/media/${media_id}/${route}`)
    if (route === 'like') {
        recordMediaStat(media_id, 'engage')
    }
}

export const postComment = async (media_id, comment) => {
    await axios.post(`/api/media/${media_id}/comment`, comment)
    recordMediaStat(media_id, 'engage')
}

export const getComments = async (media_id) => {
    const { data } = await axios.get(`/api/media/${media_id}/comments`)
    const { data: comments } = data
    return comments || []
}

export const recordVideoView = (media_id, user_id) => {
    const key = `view:${media_id}`
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
    const { data } = await axios.get(`/api/media/${media_id}`)
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

export const getLatestPdf = async () => {
    const { data } = await axios.get('/api/pdf/latest')
    const { data: d } = data
    return d
}
