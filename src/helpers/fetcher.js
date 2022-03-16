
////////////////////////
// SWR custom fetcher //
////////////////////////
export async function fetcher(url) {
    let req;
    try {
        req = await axios.get(url);

        const {data} = req;

        if (data.success) {
            return data;
        }

        throw data;

    } catch (err_response) {
        return err_response;
    }
}
