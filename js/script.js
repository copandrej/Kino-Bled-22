window.addEventListener("load", () => {
        const infoGumb = document.getElementsByClassName("hover");
        const spremeniElements = document.getElementsByClassName("spremeni");
        for (let j = 0; j < infoGumb.length; j++) {
            infoGumb[j].addEventListener("click", () => {
                for (let i = 0; i < spremeniElements.length; i++)
                    spremeniElements[i].classList.toggle("hidden");
            });
        }
});