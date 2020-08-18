const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const { v1: uuid } = require('uuid');

class Photo {
    constructor(awsConfig, bucket, pathName, ids) {
        this.pathName = pathName;
        this.path = path.join(__dirname, pathName);
        this.ids = ids ? JSON.parse(fs.readFileSync(ids, 'utf8')) : null;
        this.awsConfig = awsConfig;
        this.Bucket = bucket;
    }
    readDir(isAwsVersion) {
        let names = fs.readdirSync(this.path).filter(file => !file.includes('ds_store') && !file.startsWith('.'))
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
        const names = this.readDir()
            .sort((a, b) => {
            const aa = a.split('.')[0].split('_')[0] + a.split('.')[0].split('_')[1]
            const bb = b.split('.')[0].split('_')[0] + b.split('.')[0].split('_')[1]
            return Number(aa) - Number(bb)
        })
        return Promise.all(names.map((fileName, index) => {
            const Body = fs.readFileSync(`${this.pathName}/${fileName.split('/').slice(-1)}`);
            const Key = this.ids[index];
            const ext = fileName.match(/\.([^.]*)$/)[1].toLowerCase();
            const ContentType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;

            return new Promise((resolve, reject) => {
                s3.putObject({ Bucket: this.Bucket, Key, Body, ContentType}, function(err, res) {
                    if (err) { console.log(err); reject(err)}
                    console.log(res);
                    resolve(res)
                })
            })
        }))
    }
    async uploadS3Ava() {
        const s3 = new AWS.S3(this.awsConfig)
        const names = this.readDir();
        return Promise.all(names.map((fileName, index) => {
            const Body = fs.readFileSync(`${this.pathName}/${fileName}`);
            const Key = `users/${this.ids[index]}/avatar/${fileName}`;
            const ext = fileName.match(/\.([^.]*)$/)[1].toLowerCase();
            const ContentType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;

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