<template>
    <my-page title="HDB3码" :page="page">
        <textarea class="form-control" v-model="code" rows="6" placeholder="消息码"></textarea>
        <div class="btns">
            <ui-raised-button class="btn" primary label="编码" @click="convert" />
        </div>
        <ui-article class="article" v-if="result">
            <table :style="{width: (200 + codes.length * 72) + 'px'}">
                <tr>
                    <th width="200">消息码</th>
                    <td v-for="item in codes">{{ item.value }}</td>
                </tr>
                <tr>
                    <th>AMI</th>
                    <td v-for="item in amiCodes">{{ item }}</td>
                </tr>
                <tr>
                    <th>编码步骤1: B00V</th>
                    <td v-for="item in bvCodes">{{ item }}</td>
                </tr>
                <tr>
                    <th>编码步骤2: 确定V</th>
                    <td v-for="item in vCodes">{{ item }}</td>
                </tr>
                <tr>
                    <th>编码步骤3: 确定B</th>
                    <td v-for="item in bCodes">{{ item }}</td>
                </tr>
                <tr>
                    <th>HDB3</th>
                    <td v-for="item in hdb3Codes">{{ item }}</td>
                </tr>
                <tr>
                    <th>解码步骤1：</th>
                    <td v-for="item in checkCodes">{{ item }}</td>
                </tr>
                <tr>
                    <th>解码步骤2：</th>
                    <td v-for="item in checkCodes2">{{ item }}</td>
                </tr>
            </table>
        </ui-article>
        <!-- <textarea class="form-control" v-model="result" rows="6" placeholder="转换结果" v-if="result"></textarea> -->
    </my-page>
</template>

<script>
    /* eslint-disable */
    Array.prototype.clone = function() {
        let a = []
        for(let i = 0, l = this.length; i < l; i++) {
            a.push(this[i])
        }
        return a
    }

    export default {
        data () {
            return {
                code: '',
                codes: [],
                amiCodes: [],
                hdb3Codes: [],
                bvCodes: [],
                vCodes: [],
                bCodes: [],
                checkCodes: [],
                checkCodes2: [],
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
            // this.debug()
        },
        methods: {
            debug() {
                // this.code = '10000100001100001'
                // this.code = '1 0 1 1 0 0 0 0 0 0 0 0 0 1 1 0'
                // this.code = '1 0 1 1 0 0 0 0 0 0 0 0 0 1 1 0'
                // this.code = '10100001100001000100000101'
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
                if (!this.code.match(/^[01]+$/)) {
                    this.$message({
                        type: 'danger',
                        text: '消息码只能由 0 和 1 组成'
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
                        // if ()
                    }
                }

                function ami(code) {
                    let result = []
                    code = code.replace(/\s+/g, '')
                    let fu = false
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
                function B00V(array) {
                    let arr = array.clone()
                    for (let i = 0; i < arr.length; i++) {
                        if (i + 4 < arr.length) {
                            if (arr[i] === '0' && arr[i + 1] === '0' && arr[i + 2] === '0' && arr[i + 3] === '0') {
                                arr[i] = 'B'
                                arr[i + 3] = 'V'
                                i += 3
                            }
                        }
                    }
                    return arr
                }
                this.bvCodes = B00V(this.amiCodes)
                function dealV(array) {
                    let arr = array.clone()
                    let findLast = true
                    let isFu = null
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === 'V') {
                            if (findLast) {
                                findLast = false
                                arr[i] = isFu ? '-V' : '+V'
                                isFu = !isFu
                            } else {
                                arr[i] = isFu ? '-V' : '+V'
                                isFu = !isFu
                            }
                        }
                        if (findLast && (arr[i] === '+1' || arr[i] === '-1')) {
                            console.log('最后', arr[i])
                            isFu = arr[i] === '-1'
                        }
                    }
                    return arr
                }
                this.vCodes = dealV(this.bvCodes)
                function dealB(array) {
                    let arr = array.clone()
                    let isFirst = true
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === 'B') {
                            if (isFirst) {
                                arr[i] = '0'
                                isFirst = false
                            } else {
                                let nozeroCount = 0
                                for (let idx = i; idx >= 0; idx--) {
                                    if (arr[idx].includes('V')) {
                                        break
                                    }
                                    if (arr[idx].includes('1')) {
                                        nozeroCount++
                                    }
                                }
                                let lastV = ''
                                for (let idx = i; idx <= arr.length; idx++) {
                                    if (arr[idx].includes('V')) {
                                        lastV = arr[idx]
                                        break
                                    }
                                    if (arr[idx].includes('1')) {
                                        nozeroCount++
                                    }
                                }
                                console.log('1的数量', nozeroCount)
                                if (nozeroCount % 2 === 0) {
                                    arr[i] = lastV === '+V' ? '+B' : '-B'
                                } else {
                                    arr[i] = '0'
                                }
                            }
                        }
                    }
                    return arr
                }
                this.bCodes = dealB(this.vCodes)
                function hdb3(array) {
                    let arr = array.clone()
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === '-V') {
                            arr[i] = '-1'
                        }
                        if (arr[i] === '+V') {
                            arr[i] = '+1'
                        }
                        if (arr[i] === '-B') {
                            arr[i] = '-1'
                        }
                        if (arr[i] === '+B') {
                            arr[i] = '+1'
                        }
                    }
                    return arr
                }
                this.hdb3Codes = hdb3(this.bCodes)
                function check(array) {
                    function sam(a, b) {
                        if (a === '+1' && b === '+1') {
                            return true
                        }
                        if (a === '-1' && b === '-1') {
                            return true
                        }
                        return false
                    }
                    let arr = array.clone()
                    for (let i = 0; i < arr.length; i++) {
                        if (i + 3 < arr.length && i > 0) {
                            if (arr[i] === '0' && arr[i + 1] === '0' && arr[i + 2] === '0') {
                                if (sam(arr[i + 3], arr[i - 1])) {
                                    arr[i + 3] = '0'
                                }
                                i += 2
                                continue
                            }
                        }
                        if (i + 2 < arr.length && i > 0) {
                            if (arr[i] === '0' && arr[i + 1] === '0') {
                                if (sam(arr[i + 2], arr[i - 1])) {
                                    arr[i + 2] = '0'
                                    arr[i - 1] = '0'
                                }
                                i += 1
                                continue
                            }
                        }
                    }
                    return arr
                }
                this.checkCodes = check(this.hdb3Codes)
                function check2(array) {
                    let arr = array.clone()
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === '-1') {
                            arr[i] = '1'
                        }
                        if (arr[i] === '+1') {
                            arr[i] = '1'
                        }
                    }
                    return arr
                }
                this.checkCodes2 = check2(this.checkCodes)
                this.result = '12121212'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .article {
        overflow: auto;
    }
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
