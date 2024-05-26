let channel = ["Hypnotoad [with sound].mp4", "LupinSavesNazisShort.mp4", "[SFM] wndrwll (Neil Cicierega).mp4",
    "Animaniacs   Hello Nurse (song) (High Quality).mp4", "ARTHUR_ Theme Song.mp4", "Darkwing Duck (intro and outro).mp4",
    "DuckTales - Theme Song _ Disney+ Throwbacks _ Disney+.mp4", "Aladdin - Friend Like Me (HD 1080p).mp4",
    "Simple Plan - What's New Scooby Doo (Official Lyric Video).mp4", "Theme Song _ Teen Titans _ Warner Archive.mp4"];
let off = 0;
let i = 0;
let vidsrc = document.getElementById("video")
vidsrc.volume = 0;
let vol = 0;

function playV() {
    if (off === 0) {
        vidsrc.setAttribute("src", `${channel[i]}`);
        off++;
    }
    else {
        vidsrc.setAttribute("src", ``);
        off--;
    }

}

function chU() {
    if (off === 1) {
        ++i;
        if (channel[i]) {

            vidsrc.setAttribute("src", `${channel[i]}`);
        }
        else {
            i = 0;

            vidsrc.setAttribute("src", `${channel[i]}`);
        }
    }


}

function chD() {
    if (off === 1) {
        --i;
        if (i >= 0) {

            vidsrc.setAttribute("src", `${channel[i]}`);
        }
        else {
            i = channel.length - 1;

            vidsrc.setAttribute("src", `${channel[i]}`);

        }
    }


}

function volU() {
    if (vidsrc.volume < 1) {
        vidsrc.volume = (vidsrc.volume + 0.1).toFixed(1);
    }

}


function volD() {
    if (vidsrc.volume > 0) {
        vidsrc.volume = (vidsrc.volume - 0.1).toFixed(1);
    }

}