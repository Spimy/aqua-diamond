const url = `https://mcapi.us/server/status?ip=play.hypixel.net&port=25565`

const toggleMenu = (opened: boolean = false) => {

    const nav = document.getElementById("nav")!;
    const button = document.getElementById("close-btn")!;

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

window.addEventListener('resize', () => {
    if (window.innerWidth > 720) toggleMenu(true);
});