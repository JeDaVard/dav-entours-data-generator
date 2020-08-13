const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const { v1: uuid } = require('uuid');

class Photo {
    constructor(awsConfig, bucket, pathName, ids) {
        this.pathName = pathName;
        this.path = path.join(__dirname, pathName);
        this.ids = JSON.parse(fs.readFileSync(ids));
        this.awsConfig = awsConfig;
        this.Bucket = bucket;
    }
    readDir(isAwsVersion) {
        let names = fs.readdirSync(this.path)
            .filter(l => !l.toLowerCase().includes('ds_store'));

        return isAwsVersion ? names.map(l => {
            let ext = l.match(/\.([^.]*)$/)[0];
            let name = l.slice(0, -ext.length);
            return name + '.jpg'
        }) : names
    }
    rename() {
        const names = this.readDir();
        return names.map(a => {
            let ext = a.match(/\.([^.]*)$/)[0];
            let name = a.slice(0, -ext.length);
            fs.renameSync(`${this.path}/${a}`, `${this.path}/${uuid()}${ext.toLowerCase()}`);
        })
    }
    async uploadS3() {
        const s3 = new AWS.S3(this.awsConfig)
        const names = this.readDir();
        return Promise.all(names.map((fileName, index) => {
            const Body = fs.readFileSync(`${this.pathName}/${fileName}`);
            const Key = `users/${this.ids[index]}/avatar/${fileName}`;
            const ContentType = `image/${fileName.match(/\.([^.]*)$/)[1].toLowerCase()}`;

            if (ContentType === 'image/ds_store') return;

            return new Promise((resolve, reject) => {
                s3.putObject({ Bucket: this.Bucket, Key, Body, ContentType}, function(err, res) {
                    if (err) reject(err);
                    resolve(res)
                })
            })
        }))
    }
}

module.exports = Photo;