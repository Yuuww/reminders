const html = [
    `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>`,
    `</title><style>@font-face {font-family: SF-Pro;src: url(./SF-Pro-Display-Regular.otf);}@font-face {font-family: SF-Pro-Bold;src: url(./SF-Pro-Display-Medium.otf);}@font-face {font-family: SF-Pro-Round;src: url(./SF-Pro-Rounded-Regular.otf);}body {margin: 20mm 20mm 20mm 25mm;font-family: SF-Pro-Round;letter-spacing: 0.6px;}h1 {font-size: 24px;font-weight: bold;margin: 0;}section {margin-top: 22px;display: grid;grid-template-columns: 16px 1fr;gap: 10px;}svg {height: 16px;width: 16px;}.propertys {width: 100%;display: flex;flex-direction: column;gap: 6px;}span {font-size: 14px;}.property {width: 100%;display: grid;grid-template-columns: 12px 1fr;gap: 4px;}.property-icon {fill: #bbbbbb;height: 12px;width: 12px;}.property-text {color: #bbbbbb;font-size: 12px;}</style></head><body><h1>`,
    `</h1>`,
    `<section><svg viewBox="0 0 16 16"><path d="M8,0C3.58,0,0,3.58,0,8s3.58,8,8,8,8-3.58,8-8S12.42,0,8,0Zm0,15c-3.87,0-7-3.13-7-7S4.13,1,8,1s7,3.13,7,7-3.13,7-7,7Z"/></svg><div class="propertys"><span>`,
    `</span>`,
    `<div class="property"><svg class="property-icon" viewBox="0 0 12 12"><path d="`,
    `"/></svg><span class="property-text">`,
    `</span></div>`,
    `M8.1,1.74l2.16,2.16L2.52,11.64l-2.52,.36,.36-2.52L8.1,1.74Zm3.61-.72l-.72-.72c-.4-.4-1.04-.4-1.44,0l-.72,.72,2.16,2.16,.72-.72c.4-.4,.4-1.04,0-1.44Z`,
    `M5.79,0L.3,5.48c-.4,.4-.4,1.06,0,1.46l4.75,4.75c.4,.4,1.06,.4,1.46,0l5.48-5.48V0H5.79Zm3.21,4.5c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5,1.5,.67,1.5,1.5-.67,1.5-1.5,1.5Z`,
    `M3,3c0-1.66,1.34-3,3-3s3,1.34,3,3-1.34,3-3,3-3-1.34-3-3Zm3,4C2.69,7,0,9.24,0,12H12c0-2.76-2.69-5-6-5Z`,
    `M6,0C2.69,0,0,2.69,0,6s2.69,6,6,6,6-2.69,6-6S9.31,0,6,0Zm2.83,8.83c-.39,.39-1.02,.39-1.41,0l-2.12-2.12c-.2-.2-.29-.45-.29-.71V3c0-.55,.45-1,1-1s1,.45,1,1v2.59l1.83,1.83c.39,.39,.39,1.02,0,1.41Z`,
    `</div></section>`,
    `</body></html>`
]
createHTML();
function createHTML() {
    const data = require('./data.json');
    if(!data.heading) return console.error("001");
    if(!data.todos) return console.error("002");
    let result = html[0] + data.heading + html[1] + data.heading + html[2] + createToDo(data.todos) + html[13];
    let fs = require('fs');
    let stream = fs.createWriteStream('./' + data.heading +'.html');
    stream.once('open', function(fd) {
        stream.end(result);
    });
}
function createToDo(todos) {
    let result = "";
    for(let todo of todos) {
        if(!todo) return console.error("003");
        if(todo.name) {
            result += html[3];
            result += todo.name;
            result += html[4];
        } else {
            return console.error("004");
        }
        if(todo.note) result += html[5] + html[8] + html[6] + todo.note + html[7];
        if(todo.tags) result += html[5] + html[9] + html[6] + crateTags(todo.tags) + html[7];
        if(todo.user) result += html[5] + html[10] + html[6] + crateUser(todo.user) + html[7];
        if(todo.time) result += html[5] + html[11] + html[6] + todo.time + html[7];
        if(todo.todos) result += createToDo(todo.todos);
        result += html[12];
    }
    return result;
}
function crateTags(contents) {
    let result = "";
    for(let content of contents) {
        result += "#" + content + " ";
    }
    return result.slice(0, -1);
}
function crateUser(contents) {
    let result = "";
    for(let content of contents) {
        result += content + ", ";
    }
    return result.slice(0, -2);
}