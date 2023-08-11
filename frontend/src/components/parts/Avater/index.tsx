import Identicon from 'identicon.js'

const Icongenerate = (token: string) => {
  console.log('AAAAA')
  console.log(token)
  if(token.includes('http')) {
    return token
  }else{
    const data = new Identicon(token, 30).toString()
    const imgsrc = `data:image/png;base64,${data}`
    return imgsrc
  }
}

export default Icongenerate
