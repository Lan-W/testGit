var util = {

    // copy继承
    extend: function (o1, o2) {
        for (var key in o2) {
            o1[key] = o2[key];
        }
    },

    // 把角度转换为弧度
    angleToHu: function (angle) {
        // 一个PI对应180度，那么一个PI除以180，就得到1度对应多少弧度
        return Math.PI / 180 * angle;
    }
};