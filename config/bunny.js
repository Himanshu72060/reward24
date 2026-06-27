const bunny = {

    storageZoneName:
        process.env.BUNNY_STORAGE_ZONE,


    accessKey:
        process.env.BUNNY_ACCESS_KEY,


    storageUrl:
        `https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_ZONE}/`,


    cdnUrl:
        process.env.BUNNY_CDN_URL

};


module.exports = bunny;