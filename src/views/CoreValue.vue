<template>
    <my-page title="核心价值观编码" :page="page">
        <textarea class="form-control" v-model="code" rows="6" placeholder="要编码/解码的内容"></textarea>
        <!-- <select class="form-control charset" v-model="charset">
            <option value="gbk">gbk</option>
            <option value="big5">big5</option>
            <option value="utf-8" selected="true">utf-8</option>
        </select> -->
        <div class="btns">
            <ui-raised-button class="btn" primary label="编码" @click="encode" />
            <ui-raised-button class="btn" secondary label="解码" @click="decode" />
        </div>
        <textarea class="form-control" v-model="result" rows="6" placeholder="结果" disabled></textarea>
        <div class="refer">参考 <a href="https://github.com/sym233/core-values-encoder" target="_blank">Github</a></div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    function assert(...express){
        const l = express.length;
        const msg = (typeof express[l-1] === 'string')? express[l-1]: 'Assert Error';
        for(let b of express){
            if(!b){
                throw new Error(msg);
            }
        }
    }

    function randBin(){
        return Math.random() >= 0.5;
    }

    const values = '富强民主文明和谐自由平等公正法治爱国敬业诚信友善';

    function str2utf8(str){
        // return in hex
    
        const notEncoded = /[A-Za-z0-9\-\_\.\!\~\*\'\(\)]/g;
        const str1 = str.replace(notEncoded, c=>c.codePointAt(0).toString(16));
        let str2 = encodeURIComponent(str1);
        const concated = str2.replace(/%/g, '').toUpperCase();
        return concated;
    }

    function utf82str(utfs){
        assert(typeof utfs === 'string', 'utfs Error');

        const l = utfs.length;

        assert((l & 1) === 0);

        const splited = [];

        for(let i = 0; i < l; i++){
            if((i & 1) === 0){
                splited.push('%');
            }
            splited.push(utfs[i]);
        }

        return decodeURIComponent(splited.join(''));
    }

    function hex2duo(hexs){
        // duodecimal in array of number

        // '0'.. '9' -> 0.. 9
        // 'A'.. 'F' -> 10, c - 10    a2fFlag = 10
        //          or 11, c - 6      a2fFlag = 11
        assert(typeof hexs === 'string')

        const duo = [];

        for(let c of hexs){
            const n = Number.parseInt(c, 16);
            if(n < 10){
                duo.push(n);
            }else{
                if(randBin()){
                    duo.push(10);
                    duo.push(n - 10);
                }else{
                    duo.push(11);
                    duo.push(n - 6);
                }
            }
        }
        return duo;
    }

    function duo2hex(duo){
        assert(duo instanceof Array);

        const hex = [];

        const l = duo.length;

        let i = 0;

        while(i < l){
            if(duo[i] < 10){
                hex.push(duo[i]);
            }else{
                if(duo[i] === 10){
                    i++;
                    hex.push(duo[i] + 10);
                }else{
                    i++;
                    hex.push(duo[i] + 6);
                }
            }
            i++;
        }
        return hex.map(v=>v.toString(16).toUpperCase()).join('');
    }

    function duo2values(duo){
        return duo.map(d=>values[2*d]+values[2*d+1]).join('');
    }

    function valuesDecode(encoded){
        const duo = [];

        for(let c of encoded){
            const i = values.indexOf(c);
            if(i === -1){
                continue;
            }else if(i & 1){
                continue;
            }else{
                // i is even
                duo.push(i >> 1);
            }
        }
        
        const hexs = duo2hex(duo);

        assert((hexs.length & 1) === 0);

        let str;
        try{
            str = utf82str(hexs);
        }catch(e){
            throw e;
        }
        return str;
    }


    function valuesEncode(str){
        return duo2values(hex2duo(str2utf8(str)));
    }

    console.log(valuesEncode('123'))

    export default {
        data () {
            return {
                code: '',
                charset: 'utf-8',
                result: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/help'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
            },
            encode() {
                if (!this.code) {
                    alert('请填写要编码/解码的内容')
                    return
                }
                this.result = valuesEncode(this.code)
            },
            decode() {
                if (!this.code) {
                    alert('请填写要编码/解码的内容')
                    return
                }
                this.result = valuesDecode(this.code)
            }
        }
    }
</script>

<style lang="scss" scoped>
textarea.form-control {
    height: auto;
}
.form-control {
    display: block;
    width: 100%;
    max-width: 400px;
    height: 33px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42;
    color: #55595c;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 2px;
    outline: none;
}
.charset {
    margin-top: 16px;
}
.btns {
    margin-top: 16px;
    margin-bottom: 16px;
    .btn {
        margin-right: 8px;
    }
}
.refer {
    margin-top: 16px;
    color: #999;
}
</style>
