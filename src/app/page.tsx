'use client'
import React, { useEffect, useState } from 'react'
import '../styles/blogspage.scss'
import { useRouter } from 'next/navigation'
import { convertDate } from '@/helpers/functions';
import { filterBlog, getAllBlogData } from '@/utils/algoliaService';
import { Blog } from '@/helpers/Enums';


const Home = () => {
  const [data, setData] = useState<Blog[]>();
  const [filterData, setFilterData] = useState<Blog[]>();
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const posts: any = await getAllBlogData()
      setFilterData(posts.hits)
      setData(posts.hits)
    })()
  }, [])

  const handleDescription = (text: string) => {
    return text ? text.length > 100 ? text.slice(0, 100) + '...' : text : '-'
  }
  const search = async (event: any) => {
    if (event.target.value) {
      const data: any = await filterBlog(event)
      setFilterData(data)
    } else {
      setFilterData(data)
    }
  }
  return (
    <>
      <div className="searcbar">

        <input id="search" type="search" onChange={search} placeholder="Search..." />
      </div>
      <div className="blog_main_div">
        <div className="container">
          {filterData?.map((data: any, index: number) => (
            <div className="card" key={`key-%${index}-${data.id}`} onClick={() => router.push(`/blog/${data.objectID}`)}>
              <div className="card-header">
                <img src={data.image} alt="img..." />
              </div>
              <div className="card-body">
                <h4>
                  {data.Name}
                </h4>
                <p>
                  {handleDescription(data.body)}
                </p>
                <div className="user">
                  <img src="https://lh3.googleusercontent.com/ogw/ADGmqu8sn9zF15pW59JIYiLgx3PQ3EyZLFp5Zqao906l=s32-c-mo" alt="user" />
                  <div className="user-info">
                    <h5>{data.author}</h5>
                    <small>{convertDate(data.Created)}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default Home