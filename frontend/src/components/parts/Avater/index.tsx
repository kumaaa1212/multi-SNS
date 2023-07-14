import React from 'react'
import Identicon from 'identicon.js'
const Icongenerate = (token:string) => {
  const  data = new Identicon(token, 420).toString();
  const imgsrc = `data:image/png;base64,${data}`
}

export default Icongenerate