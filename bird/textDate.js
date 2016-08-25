(function (w) {

    // 日期文字类
    // param {time}
    function TextDate(options) {
        // 借用Text构造函数，来给TextDate的实例添加属性
        Text.call(this, options);
    }

    // 为了让实例能够复用Text原型上的方法
    //TextDate.prototype = new Text({});
    TextDate.prototype = Object.create(Text.prototype);

    // 原型扩充方法
    util.extend(TextDate.prototype, {

        // 更具最新的time格式化文本
        siDate : function () {
            // 看看time中含有多个小时(1000 * 60 * 60是一小时的毫秒数)
            var hours = Math.floor(this.time / (1000 * 60 * 60));
            // 把time中整数的小时去掉，然后看看剩下的时间含有多少个分钟(1000 * 60是一分钟的毫秒数)
            var minutes = Math.floor(this.time % (1000 * 60 * 60) / (1000 * 60));
            // 把time中整数的分钟去掉，然后看看剩下的时间含有多少个秒(1000是一分钟的毫秒数)
            var seconds = Math.floor(this.time % (1000 * 60) / 1000);
            this.text = '已经坚持了' + hours + '小时' + minutes + '分钟' + seconds + '秒！';
        },

        // 文本绘制方法，
        // 绘制前先根据最新的time得到时间统计文本，
        // 然后复用父类的draw方法绘制文本
        drawDate : function () {
            this.siDate();
            this.draw();
        }
    });

    w.TextDate = TextDate;
}(window));
