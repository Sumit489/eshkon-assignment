import algoliasearch from 'algoliasearch';

const client = algoliasearch("Q3E37WH28P", "49e136a5c68855ce9b084b52e67a09be"); // add this in env
const index = client.initIndex("blog posts"); // add this in env



export const getAllBlogData = async () => {
    try {
        const data = await index.search('')
        console.log('data', data);

        return data
    } catch (error) {
        return []
    }
}

export const getDataById = async (id: string) => {
    try {
        const data = await index.getObject(id)
        return data
    } catch (error) {
        return {}
    }
}

export const filterBlog = async (event: any) => {
    const query = event.target.value;
    if (query) {
        const { hits } = await index.search(query);
        return hits
    } else {
        return []
    }
}