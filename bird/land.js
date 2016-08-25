(function (w) {

    // 大地类
    function Land(x, y) {

        /*
        * 如果对方不调用类的初始化方法，
        * 那么Land.isInit的属性值就是默认的undefined。
        *
        * 那么！undefined 就是 true，
        * 也就是说，对方不调用类的初始化方法，那么就报错。
        * */
        if (!Land.isInit) {
            throw '请按照套路出牌！';
        }

        this.x = x;
        this.y = y;
        this.speed = -1;
    }

    // 类的初始化方法
    Land.init = function (ctx, cvs, img) {

        // 如果对方调用了该方法，
        // 并且传入了所需的3个参数，
        // 那么就认为初始化成功了，
        // 可以创建实例了
        if (ctx && cvs && img) {
            Land.isInit = true;
        }

        Land.ctx = ctx;
        Land.cvs = cvs;
        Land.img = img;
        Land.imgWidth = img.width;
        Land.imgHeight = img.height;
    };

    // 给Land的原型扩充方法
    util.extend(Land.prototype, {

        // 绘制大地方法
        // 按照大地实例的x、y坐标绘制到指定点
        draw: function () {
            Land.ctx.drawImage(Land.img, this.x, this.y);
        },

        // 更新大地下一帧绘制所需的数据
        update: function () {
            this.x += this.speed;

            // 当大地走出画布，向右拼接
            // 大地的x坐标，小于等于负的自己宽度，证明大地走出画布了
            if (this.x <= -Land.imgWidth) {

                // 当大地走出画布，因为一个共有4个大地，
                // 所以向右拼接后的x轴坐标算法：当前大地的x坐标 + 4个大地的宽
                this.x += Land.imgWidth * 4;
            }
        }
    });

    // 把大地类暴漏到全局
    w.Land = Land;

}(window));