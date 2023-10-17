

export function console_log  (){
  
}


const screenWidth= window.innerWidth
export const responsiveSize = {
   xs: screenWidth <= 480,
   sm:  screenWidth > 480 && screenWidth <= 576,
   md:  screenWidth > 576 && screenWidth <= 768, 
   lg: screenWidth > 768 && screenWidth <= 992,
   xl: screenWidth > 992 && screenWidth <= 1200,
   xxl: screenWidth >= 1600,
 }
