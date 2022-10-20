import { ImageList, ImageListItem } from '@mui/material'
import { imageData } from '../data/images'

export const ImageGallery = () => {
  return (
    <ImageList variant='masonry' cols={3} gap={8} sx={{ width: '100%' }}>
      {imageData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
