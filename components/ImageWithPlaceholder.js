import NextImage from 'next/image'

export default function FancyImage({ src, alt, width, height, className }) {
  return (
    // <div>
    //   <img
    //     aria-hidden="true"
    //     src={`${src.replace(/\.(jpg|png)?/, '.svg')}`}
    //     className={className}
    //     // width={width}
    //     // height={height}
    //     alt={`preload of ${alt}`}
    //     style={{
    //       position: 'absolute',
    //       top: 0,
    //       left: 0,
    //       right: 0,
    //       bottom: 0,
    //       width: '100%',
    //       height: '100%',
    //       margin: '0',
    //       /* Adjust the content to fit */
    //       objectFit: 'cover',
    //       objectPosition: 'center',
    //       transform: 'scale(.75)',
    //       transition: 'opacity 350s ease',
    //       transitionDelay: '300ms',
    //     }}
    //   />
    <NextImage
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={`${className}`}
    />
    // </div>
  )
}
