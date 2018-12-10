/**
 * Created by Rossy1 on 2018/12/4.
 */
const assert = require("assert"); //Node内置模块，包含比较函数
const EventEmitter = require("events").EventEmitter;
const LDJClient = require("../lib/ldj-client");

describe("LDJClient", () => { //Mocha的describe方法创建测试上下文环境
    let stream = null;
    let client = null;
    beforeEach(() => {
        stream = new EventEmitter();
        client = new LDJClient(stream);
    })
    it("should emit a message event from a single data event", done => { //it函数进行实际测试
        client.on("message", message => {
            assert.deepEqual(message, {foo: "bar"}); //deepEqual方法对测试数据和和正确数据进行比较
            done()
        })
        stream.emit("data", '{"foo":"bar"}\n'); //引发message事件的回调函数执行
        process.nextTick(() => stream.emit("data", '"bar"}\n')); //Node内置方法，让回调函数里的代码在当前代码执行结束后立即执行
    })
})