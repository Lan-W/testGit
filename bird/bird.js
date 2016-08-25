(function (w) {

    // 鸟类
    function Bird(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 1;
        this.speedPlus = 0.05;
        this.frame = 0;
    }

    Bird.init = function (ctx, cvs, img) {
        Bird.ctx = ctx;
        Bird.cvs = cvs;
        Bird.img = img;
        Bird.imgWidth = img.width / 3;
        Bird.imgHeight = img.height;
    };

    // 给Bird的原型扩充方法
    util.extend(Bird.prototype, {

        // 绘制
        draw: function () {

            // 先保存当前状态
            Bird.ctx.save();

            // 计算小鸟的中心点
            var birdCoreX = this.x + this.w / 2;
            var birdCoreY = this.y + this.h / 2;

            // 平移坐标系到小鸟的中心点
            Bird.ctx.translate(birdCoreX, birdCoreY);

            // 旋转坐标系
            // 约定，下降速度为1时候，旋转10度。
            var angle = this.speed * 10;
            // 增加最大旋转角度限度，如果大于45度，则取45。
            angle = angle > 35? 35 : angle;
            Bird.ctx.rotate(util.angleToHu(angle));

            // 绘制小鸟
            Bird.ctx.drawImage(Bird.img,
                Bird.imgWidth * this.frame, 0, Bird.imgWidth, Bird.imgHeight,
                -this.w/2, -this.h/2, this.w, this.h);

            // 绘制完毕小鸟后回滚
            Bird.ctx.restore();
        },

        // 更新下一帧数据
        update: function () {
            this.frame = ++this.frame > 2? 0 : this.frame;
            this.y += this.speed;
            this.speed += this.speedPlus;
        },

        bind: function () {
            var self = this;
            Bird.cvs.addEventListener('click', function () {
                self.speed = -2;
            });
        }
    });

    w.Bird = Bird;
}(window));
