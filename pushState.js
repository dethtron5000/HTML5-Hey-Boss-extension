$(document).ready(function() {
    var stateObj = { foo: "bar" };
    var longQueryString = '?id=2451asdfkj100001183&amp;query=xckslw_119334&amp;OBJECT_ID=fs34x_100&amp;uid=30094777&amp;etc=selected' +
        '&amp;campaign=xf99&ampxlc_redirect=false';
    history.pushState(stateObj, "page 2", longQueryString);
});