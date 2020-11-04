function getFullURL(uri) {
    return `${window.global_data.url}:${window.global_data.port}/api/${uri}`;
}

function formatDate(time) {
    let date = new Date(time);
    let year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    let newTime = year - 1970 + '年' +
        month + '月' +
        day + '天' +
        hour + '小时' +
        min + '分钟' +
        sec + '秒';
    return newTime;
}

function loadLive2D() {
    live2d_settings['modelId'] = 1;
    live2d_settings['modelTexturesId'] = 87;
    live2d_settings['modelStorage'] = false;
    live2d_settings['canCloseLive2d'] = false;
    live2d_settings['canTurnToHomePage'] = false;
    live2d_settings['waifuSize'] = '400x357';
    live2d_settings['waifuTipsSize'] = '300x100';
    live2d_settings['waifuFontSize'] = '20px';
    live2d_settings['waifuToolFont'] = '36px';
    live2d_settings['waifuToolLine'] = '50px';
    live2d_settings['waifuToolTop'] = '-60px';
    live2d_settings['waifuDraggable'] = 'axis-x';
    initModel("assets/waifu-tips.json")
}

$(function () {
    loadLive2D();
    window.global_data = {
        url: 'http://localhost',
        port: 3000
    };
    window.vm = new Vue({
        el: '#app',
        mounted() {
            let visitCountUrl = getFullURL('visitCount');
            axios.get(visitCountUrl).then(res => {
                let data = res.data;
                if (data.code === 0) {
                    this.visitCount = data.data;
                } else {
                    console.log(data.message);
                    this.visitCount = 0;
                }
            });
            let timeUrl = getFullURL('systemCreateTime');
            axios.get(timeUrl).then(res => {
                let data = res.data;
                if (data.code === 0) {
                    this.time = data.data;
                } else {
                    console.log(data.message);
                    this.time = 0;
                }
                this.interval = setInterval(() => {
                    this.time = this.time + 1000;
                }, 1000);
            });
        },
        data() {
            return {
                time: null,
                visitCount: 0,
                interval: null
            };
        },
        computed: {
            currentTime() {
                return formatDate(this.time);
            }
        }
    });
});