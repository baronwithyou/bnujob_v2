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

export function welcomeBack(msg, avatar) {
    Notification.create(
        // 消息通知框的标题
        "Welcome! :)",
        // 消息通知框的内容
        msg,
        // 图片
        avatar,
        // 效果
        "tada", 2, 4,);
}