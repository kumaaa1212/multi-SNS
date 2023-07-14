import React from 'react'
import Identicon from 'identicon.js'
const Icongenerate = (token:string) => {
  console.log(token);
  const  data = new Identicon(token, 420).toString();
  const imgsrc = `data:image/png;base64,${data}`
  // console.log(imgsrc);
  return imgsrc
}

export default Icongenerate