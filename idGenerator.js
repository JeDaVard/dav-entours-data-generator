class GenerateIds {
    constructor(example = '5f3239cfb642804b7534a7d9', randomLengthCount = 5) {
        this.example = example.slice(0, example.length - randomLengthCount);
        this.randomLengthCount = randomLengthCount;
    }
    random() {
        const randNums = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        let str = '';
        for (let i = 0; i < this.randomLengthCount; i ++) {
            str += randNums[Math.floor(Math.random() * 16)]
        }
        return str
    }
    generateIds(count) {
        let idArr = [];

        for (let i = 0; i < count; i++) {
            idArr.push(this.example + this.random())
        }
        return idArr
    }
}

module.exports = GenerateIds