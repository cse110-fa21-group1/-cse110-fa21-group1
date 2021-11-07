class NavBar extends HTMLElement {
    constructor() {
      // Part 1 Expose - TODO
      super();
      // You'll want to attach the shadow DOM here
      // let shadow = this.attachShadow({ mode: 'open' });
      this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        const styleElem = document.createElement('style');
        const styles = `
        /* Add a black background color to the top navigation bar */
        nav {
          overflow: hidden;
          background-color: #e9e9e9;
        }
        
        /* Style the links inside the navigation bar */
        nav a {
          float: left;
          display: block;
          color: black;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
          font-size: 17px;
        }
        
        /* Change the color of links on hover */
        nav a:hover {
          background-color: #ddd;
          color: black;
        }
        
        /* Style the "active" element to highlight the current page */
        nav a.active {
          background-color: #2196F3;
          color: white;
        }
        
        /* Style the search box inside the navigation bar */
        nav input[type=text] {
          float: right;
          padding: 6px;
          border: none;
          margin-top: 8px;
          margin-right: 16px;
          font-size: 17px;
        }
        
        /* When the screen is less than 600px wide, stack the links and the search field vertically instead of horizontally */
        @media screen and (max-width: 600px) {
          nav a, nav input[type=text] {
            float: none;
            display: block;
            text-align: left;
            width: 100%;
            margin: 0;
            padding: 14px;
          }
          nav input[type=text] {
            border: 1px solid #ccc;
          }
        }
        `;
        styleElem.innerHTML = styles;

        const navbar = document.createElement('nav');
        navbar.innerHTML = 
        `
          <a class="active" href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <input type="text" placeholder="Search..">
        `
        const shadowRoot = this.attachShadow({ mode: 'closed' });
    
        this.shadow.appendChild(headerTemplate.content);
    }

    
      // Some functions that will be helpful here:
      //    document.createElement()
      //    document.querySelector()
      //    element.classList.add()
      //    element.setAttribute()
      //    element.appendChild()
      //    & All of the helper functions below
  
      // Make sure to attach your root element and styles to the shadow DOM you
      // created in the constructor()
      this.shadow.appendChild(styleElem);
      this.shadow.appendChild(card);
  // Define the Class so you can use it as a custom element.
  // This is critical, leave this here and don't touch it
  customElements.define('nav-bar', NavBar);
  