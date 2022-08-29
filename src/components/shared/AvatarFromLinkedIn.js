const cheerio = require('cheerio')
const axios = require('axios')

let avatar
const getAvatar = async () => {
    await axios.get('https://github.com/tylly/')
        .then(res => {
            const $ = cheerio.load(res.data)
            const profileImgLoad = $(".avatar.avatar-user.width-full")
            avatar = profileImgLoad[0].attribs.src
            console.log('av', avatar)
            console.log(profileImgLoad)
        })
    console.log(avatar)
    return avatar
}

console.log(getAvatar())
setTimeout(() => console.log('after that', avatar), 5000)