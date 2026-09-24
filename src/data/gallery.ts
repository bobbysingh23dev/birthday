export interface Moment {
  src: string
  caption: string
}

// Add more by dropping optimized images in public/gallery/ and listing them here.
export const moments: Moment[] = [
  { src: '/gallery/1.jpg', caption: 'June 2023' },
  { src: '/gallery/2.jpg', caption: 'August 2023' },
  { src: '/gallery/3.jpg', caption: 'April 2024' },
  { src: '/gallery/4.jpg', caption: 'May 2024' },
]
