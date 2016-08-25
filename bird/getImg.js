// 用来获取图像资源的
(function (w) {

    // 把所有的图像资源地址存起来
    var imgPathObj = {
        'bird': './imgs/birds.png',
        'land': './imgs/land.png',
        'pipeDown': './imgs/pipeDown.png',
        'pipeUp': './imgs/pipeUp.png',
        'sky': './imgs/sky.png'
    };

    // 用来存储图片对象
    var imgObj = {},
        key, img, total = 0,
        callback;

    /*
     * 依据所有的图片路径，创建图片对象，
     * 并且按照存路径时的key，
     * 把这些创建的图片对象存到imgObj里。
     * */
    for (key in imgPathObj) {
        // 创建一个图片对象
        img = new Image();
        // 设置这个图片对象的资源
        img.src = imgPathObj[key];
        // 该图片的资源加载完毕，调用一个函数
        img.addEventListener('load', function () {
            total++;
            // 如果所有的图片加载完毕，
            // 调用使用者传入的回调，
            // 并且把图片资源传给对方，让对方使用
            if (total >= 5) {
                callback(imgObj);
            }
        });
        // 把新创建的图片对象存起来，方便日后使用
        imgObj[key] = img;
    }

    // 暴漏到全局的方法，
    // 该方法接收一个回调,
    // 当所有的图片资源加载完毕后，
    // 这个回调会被调用，
    // 并且把加载完毕后的图片对象传给这个回调函数
    w.getImgs = function (main) {
        callback = main;
    }
}(window));