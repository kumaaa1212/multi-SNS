import Identicon from 'identicon.js'

const Icongenerate = (token: string) => {
  const data = new Identicon(token, 100).toString()
  const imgsrc = `data:image/png;base64,${data}`
  return imgsrc
}

export default Icongenerate
