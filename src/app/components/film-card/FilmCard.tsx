"use client"
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

interface FilmCardProps {
    _id:string,
    name:string,
    category:string,
    image:string,
    onOpen:(_id:string) => void
}

export default function FilmCard({_id,name,category,image,onOpen}:FilmCardProps) {
    const router = useRouter()
  return (
    <Card sx={{ width: { md: "24%", sm: "49%", xs: "100%" },marginBottom:'10px' }}>
    <CardMedia
      sx={{height:'150px'}}
      image={`http://localhost:5000/${image}`}
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {category}
      </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={() => router.push(`/admin/film/${_id}`)} size="small" color='warning' variant='contained'>Sửa</Button>
      <Button onClick={() => onOpen(_id)} size="small" color='error' variant='contained'>Xóa</Button>
    </CardActions>
  </Card>
  )
}
