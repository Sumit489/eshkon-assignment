import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

export const convertDate = (dateString: string | undefined) => {
    if (dateString) {
        const dateObject = new Date(dateString);
        const timeAgo = new TimeAgo('en-US')
        let time = timeAgo.format(dateObject)
        return time
    }
    return;
}