self.port.on("load_script", function (script_url) {
    var new_script = document.createElement("script");
    new_script.src = script_url;
    document.body.appendChild(new_script);
});
self.port.on("load_style", function (style_url) {
    var new_style = document.createElement("link");
    new_style.href = style_url;
    new_style.type = "text/css";
    new_style.rel = "stylesheet";
    document.body.appendChild(new_style);
});
