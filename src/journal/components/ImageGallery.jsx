import { ImageList, ImageListItem } from '@mui/material'

export const ImageGallery = ({ images }) => {
  return (
    <ImageList variant='masonry' cols={3} gap={8} sx={{ width: '100%' }}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=248&fit=crop&auto=format`}
            srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt='imagen de la nota'
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
