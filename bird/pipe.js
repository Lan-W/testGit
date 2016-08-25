/*
* 管道相关特征：
* 1、管道是成对出现的，说明他们的x坐标可以共享
* 2、上下管道间的距离相等
* 3、管道的高度是随机生成的，随机生成上管道，那么下管道也就可以计算出来了
* 4、当管道走出画布，向右拼接时，管道的高度需要重新随机生成
* */
(function (w) {

    // 管道类
    /*
    * param {x:number} 上下管道共享的x坐标
    * param {yDown:number} 上面的管道(口朝下)y坐标
    * param {yUp:number} 下面的管道(口朝上)y坐标
    * */
    function Pipe(x) {

        /*
         * 如果对方不调用类的初始化方法，
         * 那么Pipe.isInit的属性值就是默认的undefined。
         *
         * 那么！undefined 就是 true，
         * 也就是说，对方不调用类的初始化方法，那么就报错。
         * */
        if (!Pipe.isInit) {
            throw '我是拒绝的！';
        }

        this.x = x;
        this.space = 100; // 上下管道间的距离
        this._computedY(); // 初始化上下管道的y轴坐标
        this.speed = -1;
        this.speedPlus = -0.00000001;
    }

    // 类的初始化方法
    /*
     * param {ctx:context} 绘图上下文
     * param {cvs:canvas} DOM对象
     * param {imgDown:Image} 上面的管道(口朝下)的图片对象
     * param {imgUP:Image} 下面的管道(口朝上)的图片对象
     * */
    Pipe.init = function (ctx, cvs, imgDown, imgUp) {

        // 如果对方调用了该方法，
        // 并且传入了所需的4个参数，
        // 那么就认为类初始化成功了，
        // 可以创建实例了
        if (ctx && cvs && imgDown && imgUp) {
            Pipe.isInit = true;
        }

        Pipe.ctx = ctx;
        Pipe.cvs = cvs;
        Pipe.imgDown = imgDown;
        Pipe.imgUp = imgUp;
        Pipe.imgWidth = imgUp.width;
        Pipe.imgHeight = imgUp.height;
    };

    // 给Pipe的原型扩充方法
    Pipe.prototype = {
        constructor: Pipe,

        // 绘制管道
        draw: function () {
            Pipe.ctx.drawImage(Pipe.imgDown, this.x, this.yDown);
            Pipe.ctx.drawImage(Pipe.imgUp, this.x, this.yUp);
            this._strokePath();
        },

        // 依据管道的坐标和宽高，画路径
        _strokePath: function () {
            Pipe.ctx.strokeStyle = 'blue';
            Pipe.ctx.rect(this.x, this.yDown, Pipe.imgWidth, Pipe.imgHeight);
            Pipe.ctx.rect(this.x, this.yUp, Pipe.imgWidth, Pipe.imgHeight);
            Pipe.ctx.stroke();
        },

        // 随机生成上管道高度，然后计算出上下管道的y轴坐标
        _computedY: function () {
            // 随机生成上管道的可视高度，为100到300之间
            this.viewHeight = Math.random() * 200 + 100;
            // 上面管道的y轴坐标算法：上管道的可视高 - 管道的总高度
            this.yDown = this.viewHeight - Pipe.imgHeight;
            // 上面管道的y轴坐标算法：上管道的可视高 + 上下管道的间隔
            this.yUp = this.viewHeight + this.space;
        },

        // 更新绘制管道下一帧所需的数据
        update: function () {
            this.x += this.speed;
            this.speed += this.speedPlus;

            // 当管道走出画布，重新生成管道高度，并向右拼接
            if (this.x <= -Pipe.imgWidth) {
                this._computedY();

                // 因为管道和管道之间相隔2个管道，也就是说一个管道占用了3个管道的宽，
                // 那么一个管道占用的宽度：Pipe.imgWidth * 3,
                // 页面上一共创建了6个管道，
                // 当一个管道走出画布向右拼接的算法：当前的x轴坐标 += 6个管道占用的宽度
                this.x += Pipe.imgWidth * 3 * 6;
            }
        }
    };

    // 把管道类暴漏到全局
    w.Pipe = Pipe;

}(window));