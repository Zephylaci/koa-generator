/**
 *  http 响应时的容器
 *  @param{number} retCode
 *  1000 默认返回值
 *  2000 成功
 */
export class resultBean {
    retCode: number;
    result: any;
    text: string;
    constructor({ retCode = 1000, text = "连接成功" }) {
        this.retCode = retCode;

        this.result = {};

        this.text = text;
    }
}

/**
 *  数据库操作 响应时的容器
 *  @param{string} retState
 *  0 默认值
 *  1 请求成功
 * -1 请求失败
 *  @param{any} result
 *  通常为执行结果，即使只有一值也是一个数组
 */
export class queryBean {
    retState: number;
    result: any;
    constructor() {
        this.retState = 0;
        this.result = [];
    }
}
