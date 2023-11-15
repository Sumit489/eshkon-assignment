'use client'
import React, { useEffect, useState } from 'react'
import '../../../styles/blogpage.scss'
import { convertDate } from '@/helpers/functions'
import Link from 'next/link'
import { getDataById } from '@/utils/algoliaService'
import { useRouter } from 'next/navigation'
import { Blog } from '@/helpers/Enums'
const page = ({ params }: { params: { id: string } }) => {
    const [postdata, stePostData] = useState<Blog>();
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const data: any = await getDataById(params.id)


            stePostData(data)
        })()

    }, [])
    return (
        <>
            <div className="wrapper">
                <Link href="#" className="arrow" onClick={() => router.back()}>&#x2190;</Link>
                <div className="hero" style={{ backgroundImage: `url(${postdata?.image})` }}>
                    <h1><a href="#">{postdata?.Name}</a></h1>
                </div>
            </div>
            <div className="wrapper_body">
                <p>
                    {postdata?.body}
                </p>

                <h4>
                    {convertDate(postdata?.Created)}
                </h4>

            </div>
        </>
    )
}

export default page
