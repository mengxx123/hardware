<template>
    <div title="编码识别" :page="page">
        <textarea class="form-control" v-model="code" rows="6" placeholder="编码内容"></textarea>
        <div class="btns">
            <!-- <ui-raised-button class="btn" primary label="识别" @click="recognize" /> -->
        </div>
        <ui-article>
            <table>
                <tr>
                    <th>消息码</th>
                    <td v-for="item in codes">{{ item.value }}</td>
                </tr>
                <tr>
                    <th>AMI</th>
                    <td v-for="item in amiCodes">{{ item }}</td>
                </tr>
                <tr>
                    <th>HDB3</th>
                    <td v-for="item in hdb3Codes">{{ item }}</td>
                </tr>
            </table>
        </ui-article>
        <textarea class="form-control" v-model="result" rows="6" placeholder="转换结果" v-if="result"></textarea>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                code: '',
                codes: [],
                amiCodes: [],
                hdb3Codes: [],
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
            this.debug()
        },
        methods: {
            debug() {
                this.code = '10000100001100001'
                this.convert()
            },
            convert() {
                if (!this.code) {
                    this.$message({
                        type: 'danger',
                        text: '请填写要转换的内容'
                    })
                    return
                }
                this.codes = this.code.replace(/\s+/g, '').split('').map(item => {
                    return {
                        value: item,
                        color: ''
                    }
                })
                for (let i = 0; i < this.codes.length; i++) {
                    if (i + 4 < this.codes.length) {
                        if ()
                    }
                }

                function ami(code) {
                    let result = []
                    code = code.replace(/\s+/g, '')
                    
                    let fu = true
                    for (let i = 0; i < code.length; i++) {
                        let item = code.charAt(i)
                        if (item === '0') {
                            result.push('0')
                        } else {
                            if (fu) {
                                result.push('-1')
                            } else {
                                result.push('+1')
                            }
                            fu = !fu
                        }
                    }
                    return result
                }
                function hdb3(code) {
                    let result = []
                    code = code.replace(/\s+/g, '')
                    
                    let fu = true
                    for (let i = 0; i < code.length; i++) {
                        let item = code.charAt(i)
                        if (item === '0') {
                            result.push('0')
                        } else {
                            if (fu) {
                                result.push('-1')
                            } else {
                                result.push('+1')
                            }
                            fu = !fu
                        }
                    }
                    return result
                }
                this.amiCodes = ami(this.code)

                this.hdb3Codes = hdb3(this.code)
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
    .btns {
        margin-top: 16px;
        margin-bottom: 16px;
        .btn {
            margin-right: 8px;
        }
    }
</style>
