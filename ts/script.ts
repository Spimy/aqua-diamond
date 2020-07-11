import { config } from './config.js';

const toggleMenu = (opened: boolean = false) => {

    const nav = document.getElementById("nav")!;
    const button = <HTMLButtonElement>document.getElementById("close-btn")!;

    if (!nav.classList.contains("open") && !opened) {
        nav.classList.add("open");
        button.classList.add("open");
        button.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        nav.classList.remove("open");
        button.classList.remove("open");
        button.innerHTML = '<i class="fas fa-bars"></i>';
    }

}

window.addEventListener("resize", () => {
    if (window.innerWidth > 720) toggleMenu(true);
});

interface ServerInfo {
    online: boolean;
    players: { max: number, now: number };

}

const showMsgBox = (msgBox: HTMLDivElement) => {

    msgBox?.classList.add("show");
    setTimeout(() => {
        msgBox?.classList.remove("show");
    }, 5000);

}

const copyIP = () => {

    const msgBox = <HTMLDivElement>document.getElementById("msg_box");

    navigator.clipboard.writeText(config.serverIP).then(() => {
        msgBox.innerHTML = "Copied IP to Clipboard";
        showMsgBox(msgBox);
    }).catch(() => {
        msgBox.innerHTML = "Error Copying IP";
        showMsgBox(msgBox);
    });

}

window.addEventListener("load", async () => {
    const title = <HTMLHeadingElement>document.getElementById("title")!;
    const subtitle = <HTMLParagraphElement>document.getElementById("subtitle")!;

    title.innerHTML = `Welcome to ${config.serverName}`;
    subtitle.getElementsByClassName("server-ip")[0].innerHTML = config.serverIP;

    setInterval(async () => {
        const url = `https://mcapi.us/server/status?ip=${config.serverIP}&port=${config.serverPort}`
        const server: ServerInfo = await fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(data => data);

        if (!server.online) {
            subtitle.innerHTML = "Server offline";
        } else {
            subtitle.getElementsByClassName("player-count")[0].innerHTML = server.players.now.toString();
        }

    }, 3000);


    const serverIP = <HTMLSpanElement>subtitle.getElementsByClassName("server-ip")[0];
    serverIP?.addEventListener("click", copyIP);

    const btn = <HTMLButtonElement>document.getElementById("close-btn");
    btn?.addEventListener("click", () => toggleMenu())

});
