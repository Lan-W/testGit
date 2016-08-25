(function (w) {
    // Sky类
    function Sky(x, y) {

        if (!Sky.isInit) {
            throw '请回吧!';
        }

        this.x = x;
        this.y = y;
        this.speed = -1;

    }

    // 初始化方法
    Sky.init = function (ctx, cvs, img) {
        Sky.ctx = ctx;
        Sky.cvs = cvs;
        Sky.img = img;
        Sky.imgWidth = img.width;
        Sky.imgHeight = img.height;

        if (ctx && cvs && img) {
            Sky.isInit = true;
        }
    };

    Sky.prototype = {
        constructor : Sky,

        // 按照实例的状态绘制
        draw: function () {
            Sky.ctx.drawImage(Sky.img, this.x, this.y);
        },

        // 计算下一帧绘制时所需的数据
        update: function () {
            this.x += this.speed;

            // 如果天空走出画布，那么向右拼接
            if (this.x <= -Sky.imgWidth) {
                this.x += Sky.imgWidth * 2;
            }
        }
    };

    w.Sky = Sky;
}(window));
