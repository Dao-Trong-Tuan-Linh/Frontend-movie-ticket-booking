import React from 'react'
import DetailFilm from '../pages/DetailFilm'

export default function page({params}:{params:{id:string}}) {
  return (
    <DetailFilm id={params.id}/>
  )
}
