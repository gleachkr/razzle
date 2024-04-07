import "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.mjs";
import Prism from "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/+esm";
import "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-c.js";
import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.mjs";
const registry = window.customElements

//make sure fonts are available
const fonts = document.createElement("link")
fonts.setAttribute("href","https://fonts.googleapis.com/css2?family=Inter:wght@200..900&display=swap")
fonts.setAttribute("rel","stylesheet")

const katex = document.createElement("link")
katex.setAttribute("href","https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css")
katex.setAttribute("rel","stylesheet")
katex.setAttribute("crossorigin","anonymous")
katex.setAttribute("integrity","sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn")

document.head.appendChild(fonts)
document.head.appendChild(katex)

class RazzleDeck extends HTMLElement {

  connectedCallback() {
    if (this.initialized) return
    this.initialized = true
    this.shadow = this.attachShadow({ mode: "open" })
    const children = this.children

    //create shadowDOM content
    const style = document.createElement("style")
    const svgDefs = document.createElement("div")
    const kclone = katex.cloneNode()
    const prismcss = document.createElement("link")
    prismcss.setAttribute("href","https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css")
    prismcss.setAttribute("rel","stylesheet")
    prismcss.setAttribute("crossorigin","anonymous")
    prismcss.setAttribute("integrity","sha256-ko4j5rn874LF8dHwW29/xabhh8YBleWfvxb8nQce4Fc=")

    svgDefs.innerHTML = `<svg style="position:absolute">
      <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" 
    refX="0" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" />
      </marker>
      </defs>
      </svg>`

    style.textContent = `
      :host {
        background: var(--razzle-backdrop, rgb(240,240,240));
        display: flex;
        height: 100vh;
        width: 100%;
        flex-direction:row;
        overflow-x:scroll;
        scroll-snap-type: x mandatory;
        --razzle-unit: min(1vh,1vw);
        font-size:calc(3 * var(--razzle-unit));
        --razzle-opacity: 0;
        line-height:1.5;
      }

      razzle-slide {
        opacity:var(--razzle-opacity);
        transition: opacity .25s;
        position:relative;
      }

      razzle-slide h1 {
        font-size:3em;
        font-weight:900;
        position:absolute;
        top:-.2em;
        left:.5em;
      }

      razzle-slide p > ol, razzle-slide p > ul {
        width:90%;
      }

      razzle-slide h3 {
        position:absolute;
        top:1em;
        left:1.2em;
      }

      razzle-slide dt {
        font-variant: small-caps;
      }

      razzle-slide blockquote {
        position:relative;
      }
      razzle-slide blockquote::before {
        content:'“';
        position: absolute;
        left:-.5em;
        top:-.25em;
        max-width:0px;
        font-size:2em;
      }
      razzle-slide svg {
        font-size:24px;
        width:calc(55*var(--razzle-unit));
      }

      svg foreignObject {
        overflow:visible;
        height:200px;
        width:200px;
      }`

    this.shadow.appendChild(style);
    this.shadow.appendChild(kclone);
    this.shadow.appendChild(prismcss);
    this.shadow.appendChild(svgDefs);
    [...children].map(child => {
      renderMathInElement(child)
      Prism.highlightAllUnder(child)
      this.shadow.appendChild(child)
    })

    // wait for fonts, etc. 
      addEventListener("DOMContentLoaded", () => this.style.setProperty("--razzle-opacity",1));
  }
}

class RazzleSlide extends HTMLElement {

  connectedCallback() {
    if (this.initialized) return
    this.initialized = true
    this.shadow = this.attachShadow({ mode: "open" })
    const style = document.createElement("style")
    const slide = document.createElement("div")
    slide.classList = "slide"
    const content = document.createElement("div")
    content.classList = "content"
    const slot = document.createElement("slot")

    style.textContent = `
      :host {
        height: 100vh;
        min-width: 100vw;
        display: flex;
        scroll-snap-align: center;
        font-family: 'Inter';
        align-items: center;
        justify-content: center;
      }

      .slide {
        color: var(--razzle-primary-text, black);
        background: var(--razzle-slide-background, white);
        min-height: calc(77 * var(--razzle-unit));
        height: calc(77 * var(--razzle-unit));
        min-width: calc(77 * var(--razzle-unit));
        width: calc(110 * var(--razzle-unit));
        padding: calc(5 * var(--razzle-unit));
        margin: calc(5 * var(--razzle-unit));
        display: flex;
        position:relative;
        flex-direction:column;
        justify-content:center;
        align-items:center;
      }

      .content {
        max-width: calc(77 * var(--razzle-unit));
      }
    `

    this.shadow.appendChild(style)
    this.shadow.appendChild(slide)
    slide.appendChild(content)
    content.appendChild(slot)
  }
}

class RazzleVideo extends HTMLElement {
  connectedCallback() {
    if (this.initialized) return
    this.initialized = true
    this.shadow = this.attachShadow({ mode: "open" })
    const style = document.createElement("style")
    const slide = document.createElement("video")
    slide.src = this.getAttribute("src")
    slide.controls = true
    slide.classList = "slide"

    style.textContent = `
      :host {
        height: 100vh;
        min-width: 100vw;
        display: flex;
        scroll-snap-align: center;
        font-family: 'Inter';
        align-items: center;
        justify-content: center;
      }

      .slide {
        min-height: calc(77 * var(--razzle-unit));
        height: calc(77 * var(--razzle-unit));
        min-width: calc(77 * var(--razzle-unit));
        width: calc(110 * var(--razzle-unit));
        padding: calc(5 * var(--razzle-unit));
        margin: calc(5 * var(--razzle-unit));
        display: flex;
        position:relative;
        flex-direction:column;
        justify-content:center;
        align-items:center;
      }
    `

    this.shadow.appendChild(style)
    this.shadow.appendChild(slide)
  }
}

class RazzleIFrame extends HTMLElement {
  connectedCallback() {
    if (this.initialized) return
    this.initialized = true
    this.shadow = this.attachShadow({ mode: "open" })
    const style = document.createElement("style")
    const slide = document.createElement("iframe")
    slide.src = this.getAttribute("src")
    slide.classList = "slide"

    style.textContent = `
      :host {
        height: 100vh;
        min-width: 100vw;
        display: flex;
        scroll-snap-align: center;
        font-family: 'Inter';
        align-items: center;
        justify-content: center;
      }

      .slide {
        min-height: calc(82 * var(--razzle-unit));
        height: calc(82 * var(--razzle-unit));
        min-width: calc(82 * var(--razzle-unit));
        width: calc(115 * var(--razzle-unit));
        margin: calc(5 * var(--razzle-unit));
        display: flex;
        border:none;
        position:relative;
        flex-direction:column;
        justify-content:center;
        align-items:center;
      }
    `

    this.shadow.appendChild(style)
    this.shadow.appendChild(slide)
  }
}

registry.define("razzle-deck", RazzleDeck)
registry.define("razzle-slide", RazzleSlide)
registry.define("razzle-video", RazzleVideo)
registry.define("razzle-iframe", RazzleIFrame)
