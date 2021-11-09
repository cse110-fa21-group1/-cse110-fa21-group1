class NavBar extends HTMLElement {
  constructor() {
      super();

      this.shadow = this.attachShadow({mode: 'open'});
      const styleElem = document.createElement('style');
      const styles = `
        nav {
          position: sticky;
          width: 100vw;
          height: 80px;
          overflow: hidden;
          background-color: #999999;
          display: grid;
          font-family: sans-serif;
          grid-template-columns: 50px 1fr 1fr 8fr 1fr 1fr 50px;
          grid-template-rows:auto;
          column-gap: 20px;
          grid-template-areas: 
          ". logo . search . icon .";
        }

        #logo{
          margin-top: 25px;
          grid-area: logo;
          background-color: #CCCCCC;
          text-align: center;
          padding: 10px 10px;
        }

        .search-container{
          margin-top: 25px;
          grid-area: search;
        }

        .search-container form{
          display: flex;
          justifiy-content: flex-start;
          align-items: center;
        }

        /* Style the search box inside the navigation bar */
        #search-bar {
          background-color: #C4C4C4;
          color: #4C4C4C;
          padding: 6px;
          border: none;
          font-size: 18px;
          width:90%;
          margin:0;
        }

        #search-button{
          box-sizing: border-box;
          margin:0;
          background-color:#4c4c4c;
          width: 34px;
          height:34px;
          border-width:0;
          background-size:28px;
          background-image: url("assets/search.png");
          background-repeat: no-repeat;
          background-position: center; 
          
        }

        #hamburger-icon{
          margin-top: 25px;
          text-align:right;
          grid-area: icon;
          height: 28px;
          width: auto;
        }
      `;
      styleElem.innerHTML = styles;

      const navbar = document.createElement('nav');
      navbar.innerHTML = 
      `
        <img id="logo" src="tba" alt="logo">
        <div class="search-container">
          <form>
            <input id="search-bar" type="text" placeholder="Search for something to cook">
            <button id="search-button" type="submit"></button>
          </form>
        </div>
        <img id="hamburger-icon" src="assets/hamburger.png" alt="menu">


      `;
      this.shadow.appendChild(styleElem);
      this.shadow.appendChild(navbar);
  }
}
customElements.define('nav-bar', NavBar);
  