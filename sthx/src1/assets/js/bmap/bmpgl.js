//BMapGL
export function BMPGL(ak) {
    return new Promise(function(resolve, reject) {
        window.init = function() {
            // eslint-disable-next-line
            resolve(BMapGL);
        };
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `http://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=init`;
        // script.src = `//api.map.baidu.com/api?type=webgl&v=1.0&ak=${ak}`;

        script.onerror = reject;
        document.head.appendChild(script);
    });
}
