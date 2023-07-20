import Identicon from 'identicon.js'

const Icongenerate = (token: string) => {
  console.log(token)
  const data = new Identicon(token, 420).toString()
  const imgsrc = `data:image/png;base64,${data}`
  return imgsrc
}

export default Icongenerate
