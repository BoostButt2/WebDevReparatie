const template = document.createElement('template');
template.innerHTML = `
<h1 id="lives"></h1>
<h1 id="points"></h1>
<div class="container" id="aimGame">
</img>
`

class Target extends HTMLElement{
    lives;
    points;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.attachStyleSheets();
        this.className = "hidden";
        document.getElementById("b_startGame").onclick = e => this.startGame();
    }

    //Makes one single target
    createElement(){
        let x_position = Math.floor(Math.random() * 94);
        let z_position = Math.floor(Math.random() * 89);
        let target = document.createElement("img");
        target.src = "images/PngItem_247223.png";
        target.className = "targetImg";
        target.style.position = "absolute";
        target.style.left = x_position + "%";
        target.style.top = z_position + "%";
        //if the target is alive, it hasn't been clicked
        target.name = "alive";
        target.onclick = e => this.shootTarget(target);

        return target;
    }

    //starts the whole aim trainer
    startGame(){
        let backgroundImageUrl = "url(" + document.getElementById("aimMap").innerText + ")";
        this.shadowRoot.querySelector(".container").style.backgroundImage = backgroundImageUrl;
        this.points = 0;
        this.lives = 3;
        this.shadowRoot.getElementById("lives").innerText = "Lives: " + this.lives.toString();
        this.shadowRoot.getElementById("points").innerText = "Points: " + this.points.toString();
        document.getElementById("singleplayer__menu").classList.add("hidden");
        document.querySelector("shooting-target").classList.remove("hidden");
        this.spawnTargets();
    }

    //makes targets every x amount of time
    spawnTargets(){
        setTimeout(function (_this) {
            if (_this.lives > 0) {
                let target = _this.createElement();
                _this.shadowRoot.getElementById("aimGame").appendChild(target);
                _this.spawnTargets();
                _this.removeTargetsTimer(target);
            }
            }, 800, this);

    }
    //Uses the stylesheet for this shadow dom
    attachStyleSheets(){
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "stylesheets/targetStyle.css");
        this.shadowRoot.appendChild(linkElem);
    }
    //removes targets if they are not shot before the target disappears
    removeTargetsTimer(target){
        setTimeout(function (_this){
            if(target.name == "alive" && _this.lives > 0){
                target.remove();
                _this.lives--;
                _this.shadowRoot.getElementById("lives").innerText = "Lives: " + _this.lives.toString();
                //removes all target from screen when the player is out of lives
                if(_this.lives == 0){
                    _this.shadowRoot.querySelector(".container").innerHTML = "Game Over";
                }
            }
        }, 3500, this);
    }

    //adds points and removes target when target is clicked
    shootTarget(target){
        this.points++;
        this.shadowRoot.getElementById("points").innerText = "Points: " + this.points.toString();
        this.removeTarget(target);
    }

    //removes the target in the parameter
    removeTarget(target){
        target.name = "dead";
        target.remove();
    }
}

window.customElements.define('shooting-target', Target);
