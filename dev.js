const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const { v1: uuid } = require('uuid');
const { awsOptions } = require('./config')


class Photos {
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

const manPhotos = new Photos(awsOptions, 'entours', 'data/users/m', 'data/users/manIds.json');
const womanPhotos = new Photos(awsOptions, 'entours', 'data/users/g', 'data/users/womanIds.json');


let file = fs.readFileSync('data/users/users.json')
let parsedFile = JSON.parse(file);

let mix = fs.readFileSync('data/users/mixUsers.json')
let parsedMix = JSON.parse(mix);

let rawMenIds = fs.readFileSync('data/users/manIds.json')
let menIds = JSON.parse(rawMenIds);

let rawWomenIds = fs.readFileSync('data/users/WomanIds.json')
let womanIds = JSON.parse(rawWomenIds);

const men = parsedMix
	.filter(u => u.gender === 'Male')
	.slice(0, 232)
	.map((u, index) => ({
		_id: menIds[index],
		name: u.first_name + ' ' + u.last_name,
		gender: u.gender,
		email: u.email,
		photo: `users/${menIds[index]}/avatar/${manPhotos.readDir(true)[index]}`,
		reviews: [],
		tours: [],
		role: 'user',
		active: true,
		speaks: [ 'English' ],
		password: '$2b$12$3WeOSwigC2ADLbw.boW62eD52Xr2JZRNk3OyHtp1v6kObsFgHwFNa'.slice(0, menIds[index].length) + menIds[index]
	}))

const women = parsedMix
	.filter(u => u.gender === 'Female')
	.slice(0, 232)
	.map((u, index) => ({
		_id: menIds[index],
		name: u.first_name + ' ' + u.last_name,
		gender: u.gender,
		email: u.email,
		photo: `users/${menIds[index]}/avatar/${womanPhotos.readDir(true)[index]}`,
		reviews: [],
		tours: [],
		role: 'user',
		active: true,
		speaks: [ 'English' ],
		password: '$2b$12$3WeOSwigC2ADLbw.boW62eD52Xr2JZRNk3OyHtp1v6kObsFgHwFNa'.slice(0, menIds[index].length) + menIds[index]
	}))

	const totalUsers = [...men, ...women].sort((a, b) => a.name.split(' ')[1] > b.name.split(' ')[1] ? 1 : -1)

console.log(totalUsers)
fs.writeFileSync('data/users/users.json', JSON.stringify(totalUsers))

// class GenerateIds {
// 	constructor(example = '5f3239cfb642804b7534a7d9', randomLengthCount = 5) {
// 		this.example = example.slice(0, example.length - randomLengthCount);
// 		this.randomLengthCount = randomLengthCount;
// 	}
// 	random() {
// 		const randNums = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// 		let str = '';
// 		for (let i = 0; i < this.randomLengthCount; i ++) {
// 			str += randNums[Math.floor(Math.random() * 16)]
// 		}
// 		return str
// 	}
// 	generateIds(count) {
// 		let idArr = [];

// 		for (let i = 0; i < count; i++) {
// 			idArr.push(this.example + this.random(5))
// 		}
// 		return idArr
// 	}
// } 

// const genIds = new GenerateIds(undefined, 6);

// fs.writeFileSync('reviewIds.json', JSON.stringify(genIds.generateIds(2000)))