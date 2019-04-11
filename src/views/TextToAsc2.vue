<template>
    <my-page title="文本转 ASCII（HTML ASCII）" :page="page">
        <textarea class="form-control" v-model="code" rows="6" placeholder="文本"></textarea>
        <!-- <select class="form-control charset" v-model="charset">
            <option value="gbk">gbk</option>
            <option value="big5">big5</option>
            <option value="utf-8" selected="true">utf-8</option>
        </select> -->
        <div class="btns">
            <ui-raised-button class="btn" primary label="转换" @click="encode" />
            <!-- <ui-raised-button class="btn" secondary label="解码" @click="decode" /> -->
        </div>
        <textarea class="form-control" v-model="result" rows="6" placeholder="结果" disabled></textarea>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                code: '',
                charset: 'utf-8',
                result: '',
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'help',
                        //     to: '/help'
                        // }
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
            text2asc2(s) {
                let as = ''
                for(let a = 0; a < s.length; a++) {
                    as += '&#' + s.charCodeAt(a) + ';'
                }
                return as
            },
            encode() {
                if (!this.code) {
                    alert('请填写要编码/解码的内容')
                    return
                }

                this.result = this.text2asc2(this.code)
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
