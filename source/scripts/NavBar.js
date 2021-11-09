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
          background-size:24px;
          background-image: url("assets/search.png");
          background-repeat: no-repeat;
          background-position: center; 
          
        }

        .hamburger-icon{
          margin-top: 25px;
          grid-area: icon;
          height: 28px;
          width: 28px;
          display: inline-block;
        }

        .hamburger-icon span{
          display: block;
          background: #000;
          width: 100%;
          height: 4px;
        }

        .hamburger-icon:before,
        .hamburger-icon:after {
          content: "";
          display: block;
          background: #000;
          width: 100%;
          height: 4px;
          transform-origin: center center;
          transform: rotate(0deg);
          transition: all 0.3s ease;
        }

        .hamburger-icon:before {
          margin-bottom: 6px;
        }
        
        .hamburger-icon:after {
          margin-top: 6px;
        }

        .hamburger-shown .hamburger-icon span {
          background: transparent;
        }
        
        .hamburger-shown .hamburger-icon:before {
          transform: rotate(45deg);
        }
        
        .hamburger-shown .hamburger-icon:after {
          transform: rotate(-45deg);

        .hamburger-menu{
          position: absolute;
          float: right;
          width: 100%;
          max-height: 50vh;
          text-align: center;
          background-color: #C4C4C4;
          transition: all .4s ease-in-out;
          transform: translateX(-100%);
        }

        .hamburger_shown .hamburger-menu {
          transform: translateX(0);
        }
        
        .mobile .menu__item {
          display: block;
          line-height: 2;
          padding: 25px 0;
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
        <a class="hamburger-icon"><span></span></a>
        <ul class='hamburger-menu">
          <li>Home</li>
          <li>Recipes</li>
            <ul class="recipes-menu">
              <li>View All</li>
              <li>Add</li>
              <li>Edit</li>
              <li>Delete</li>
            </ul>
          <li>Login/Logout</li>
        </ul>
      `;
      
      this.shadow.appendChild(styleElem);
      this.shadow.appendChild(navbar);

     console.log('This is the shadow');
     console.log(this.shadow);
     console.log('This is the shadow element dammit');
     
     let icon = this.shadow.querySelector('.hamburger-icon');
     let menu = this.shadow.querySelector('.hamburger-menu');
     icon.addEventListener('click', (e) =>{
      console.log(e.target);
      e.target.classList.toggle('hamburger-shown');
      //console.log(e.target.nextElementSibling);
      //menu.classList.toggle('hamburger-shown');
     });



  }
}
customElements.define('nav-bar', NavBar);
  