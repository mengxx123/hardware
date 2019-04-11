<template>
    <my-page title="二进制反码补码" :page="page">
        <textarea class="form-control" v-model="code" rows="6" placeholder="二进制数"></textarea>
        <!-- <select class="form-control charset" v-model="charset">
            <option value="gbk">gbk</option>
            <option value="big5">big5</option>
            <option value="utf-8" selected="true">utf-8</option>
        </select> -->
        <div class="btns">
            <ui-raised-button class="btn" primary label="获取反码" @click="convert" />
            <!-- <ui-raised-button class="btn" secondary label="解码" @click="decode" /> -->
        </div>
        <textarea class="form-control" v-model="result" rows="6" placeholder="结果" disabled v-if="result"></textarea>
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
                // this.convert()
            },
            convert() {
                if (!this.code) {
                    alert('请输入二进制数')
                    return
                }

                var z = this.code
                var r1 = 0
                var r2 = 0
                for (let i = z.length-1; i >= 0; i = i-1) {
                    r1 += eval(z.charAt(i)) * Math.pow(2, z.length-i-1);
                    r2 += eval(1) * Math.pow(2, z.length-i-1);
                    var y1 = parseInt(r1);
                    var y2 = parseInt(r2);
                    var res=y2-y1;
                    this.result = res.toString(2);
                }
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
