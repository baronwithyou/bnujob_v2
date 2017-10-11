export function errorPrompt(msg) {
    prompt(msg, 'error');
    return;
}

export function successPrompt(msg) {
    prompt(msg, 'success');
    return;
}

function prompt(msg, type) {
    $("body").overhang({
        type: type,
        message: msg,
        duration: 2.5
    });
}

export function welcomeBack() {
    Notification.create(
        // 消息通知框的标题
        "Welcome Back",
        // 消息通知框的内容
        "欢迎回来",
        // 图片
        "./image/user.png",
        // 效果
        "tada", 1, 3,);
}