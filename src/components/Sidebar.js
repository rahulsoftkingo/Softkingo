import { useState } from "react";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";

const SideBar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
    setSubMenuOpen(null);
  };

  const toggleSubMenu = (subMenu, menu) => {
    setSubMenuOpen((prev) => (prev === subMenu ? null : subMenu));
    setOpenMenu(menu);
  };

  const BlockchainMenuItems = [
    { title: "Wallet", link: "#" },
    { title: "Exchange", link: "#" },
    { title: "Ethereum", link: "#" },
    { title: "Hyperledger", link: "#" },
    { title: "Smart Contracts", link: "#" },
    { title: "Private Blockchain", link: "#" },
    { title: "Blockchain Technology", link: "#" },
    { title: "NFT Marketplace", link: "#" },
  ];

  const GameDevelopmentMenuItems = [
    { title: "Unity 3D", link: "#" },
    { title: "Metaverse", link: "#" },
    { title: "Unreal Engine", link: "#" },
    { title: "Augmented Reality", link: "#" },
    { title: "Virtual Reality", link: "#" },
    { title: "Casual Games", link: "#" },
  ];

  const SalesforceSolutionsMenuItems = [
    { title: "Salesforce Development", link: "#" },
    { title: "Salesforce Consulting", link: "#" },
    {
      title: "Salesforce Implementation",
      link: "/salesforce-implementation.htm",
    },
    {
      title: "Salesforce Lightning",
      link: "/salesforce-lightning-development",
    },
    { title: "AppExchange", link: "/salesforce-appexchange-development" },
    { title: "Sales Cloud", link: "/salesforce-sales-cloud-development" },
    { title: "Marketing Cloud", link: "/salesforce-marketing-cloud" },
    { title: "Commerce Cloud", link: "/salesforce-commerce-cloud" },
    { title: "Financial Cloud", link: "/salesforce-financial-cloud" },
    { title: "Pardot", link: "/salesforce-pardot" },
  ];

  const AIMLMenuItems = [
    { title: "Object Recognition", link: "/object-recognition" },
    { title: "Text To Speech", link: "/text-to-speech" },
    { title: "Business Intelligence", link: "/business-intelligence" },
    { title: "Data Forecasting", link: "/data-forecasting" },
    {
      title: "Natural Language Processing",
      link: "/natural-language-processing",
    },
    {
      title: "Machine Learning",
      link: "/artificial-intelligence-and-machine-learning",
    },
    { title: "Data Analytics", link: "/data-analytics" },
    { title: "Recommendation Engine", link: "/recommendation-engine" },
    { title: "Sentimental Analysis", link: "/sentimental-analysis" },
    { title: "Conversational Ai", link: "/conversational-ai" },
    {
      title: "Alexa Skills Development",
      link: "/alexa-skills-development.htm",
    },
  ];

  const IoTEmbedded = [
    { title: "IoT App", link: "/iot-app-development" },
    { title: "Embedded Software", link: "/embedded-software" },
    { title: "IoT Hardware Prototyping", link: "/iot-hardware-prototyping" },
    {
      title: "IoT Dashboard and Analytics",
      link: "/iot-dashboard-and-analytics",
    },
    {
      title: "Smart Home - Home Automation",
      link: "/smart-home-home-automation",
    },
  ];

  const HireResourcesMenuItems = [
    { link: "/hire-android-app-developer", title: "Hire Android Developers" },
    { link: "/hire-ios-developers", title: "Hire iOS Developers" },
    { link: "/hire-iphone-app-developer", title: "Hire iPhone App Developers" },
    { link: "/hire-ipad-app-developer", title: "Hire iPad Developers" },
    { link: "/hire-flutter-developers", title: "Hire Flutter Developers" },
    {
      link: "/hire-react-native-app-developers",
      title: "Hire React Native Developers",
    },
    { link: "/hire-swift-developer", title: "Hire Swift Developers" },
    { link: "/hire-ionic-developer", title: "Hire Ionic Developers" },
    { link: "/hire-kotlin-developers", title: "Hire Kotlin Developers" },
    {
      link: "/hire-cross-platform-developer",
      title: "Hire Cross-platform Developers",
    },
    { link: "/hire-dart-developer", title: "Hire Dart Developers" },
    { link: "/app-designers", title: "Hire App Designers" },
  ];

  const FrontendMenuItems = [
  
    { title: "Hire Frontend Developers", link: "/hire-front-end-developers" },
    { title: "Hire AngularJS Developers", link: "/hire-angularjs-developers" },
    { title: "Hire ReactJS Developers", link: "/hire-reactjs-developers" },
    { title: "Hire Vue JS Developers", link: "/hire-vuejs-developers" },
    { title: "Hire .NET Developers", link: "/hire-dot-net-developers" },
    { title: "Hire Web App Developers", link: "/hire-web-app-developers" },
    { title: "Hire Web Developers", link: "/hire-web-developers" },
    { title: "Hire CakePHP Developers", link: "/hire-cakephp-developer" },
    { title: "Hire Yii Developers", link: "/hire-yii-developers" },
    { title: "Hire Scala Developers", link: "/hire-scala-developers.htm" },
    { title: "Hire Zend Developers", link: "/hire-zend-developers.htm" },
    { title: "Hire Drupal Developers", link: "/hire-drupal-developer.htm" }
  ];

  const developersList = [
   
    { title: "Hire Java Developers", link: "#" },
    { title: "Hire Laravel Developers", link: "#" },
    { title: "Hire Node.js Developers", link: "#" },
    { title: "Hire Django Developers", link: "#" },
    { title: "Hire Python Developers", link: "#" },
    { title: "Hire Spring Boot Developers", link: "#" },
    { title: "Hire PHP Developers", link: "#" },
    { title: "Hire Golang Developers", link: "#" },
    { title: "Hire Joomla Developers", link: "#" },
    { title: "Hire Full-stack Developers", link: "#" },
    { title: "Hire CodeIgniter Developers", link: "#" },
    { title: "Hire ASP.NET Developers", link: "#" }
  ];

  const gameList = [
    { title: "Hire Metaverse Developers", link: "#" },
    { title: "Hire Unity 3D Developers", link: "#" },
    { title: "Hire Virtual Reality Developers", link: "#" },
    { title: "Hire Augmented Reality Developers", link: "#" }
  ];

  const ecommerceList = [
  
    { title: "Hire Magento Developers", link: "#" },
    { title: "Hire WordPress Developers", link: "#" },
    { title: "Hire WooCommerce Developers", link: "#" },
    { title: "Hire Shopify Developers", link: "#" }
  ];

  const dedicatedDeveloperList = [
    { title: "Hire IoT Solution Architect", link: "#" },
    { title: "Hire Data Scientists", link: "#" },
    { title: "Hire NFT Developers", link: "#" },
    { title: "Hire Salesforce Developers", link: "#" },
    { title: "Hire Blockchain Developers", link: "#" },
    { title: "Hire Solidity Developers", link: "#" },
    { title: "Hire Software Developers", link: "#" },
    { title: "Hire UI/UX Designers", link: "#" },
    { title: "Hire VisionOS Developers", link: "#" }
  ];
  

  return (
    <nav className="sidebar z-40">
      <ul className="sidebar-menu">
        {/* About Us Section */}
        <li
          className={`left ${
            openMenu === "about" ||
            openMenu === "services" ||
            openMenu === "hireResources" ||
            openMenu === "industries" ||
            openMenu === "resources"
              ? "active"
              : ""
          }`}
        >
          <li className="menu-item">
            <div
              style={{ display: "flex" }}
              className="menu-link items-center justify-between w-full cursor-pointer"
              onClick={() => toggleMenu("about")}
            >
              <p>About Us</p>
              <FaChevronRight />
            </div>
            <ul className={`submenu ${openMenu === "about" ? "active" : ""}`}>
              <li className="submenu-item cursor-pointer" onClick={() => toggleMenu("")}>
                <span
                  className="flex items-center "
                  
                >
                  <MdArrowBackIos />
                  <span className="ml-2">
                    Back
                  </span>
                </span>
              </li>
              <li className="submenu-item">
                <Link href="/who-we-are">Who We Are</Link>
              </li>
              <li className="submenu-item">
                <Link href="/services">Services</Link>
              </li>
              <li className="submenu-item">
                <Link href="/industries">Industries We Serve</Link>
              </li>
              <li className="submenu-item">
                <Link href="/career">Career</Link>
              </li>
              <li className="submenu-item">
                <Link href="/events">Events</Link>
              </li>
            </ul>
          </li>

          {/* Services Section */}
          <li className="menu-item">
            <div
              style={{ display: "flex" }}
              className="menu-link w-full menu-link items-center justify-between cursor-pointer"
              onClick={() => toggleMenu("services")}
            >
              <p>Services</p>
              <FaChevronRight className="" />
            </div>
            <ul
              className={`submenu ${openMenu === "services" ? "active" : ""}`}
            >
              {/* Mobile App Development Submenu */}
              <li className="submenu-item cursor-pointer"    onClick={() => toggleMenu("")}>
                <span
                  className="flex items-center "
               
                >
                  <MdArrowBackIos />
                  <span className="ml-2">Back</span>
                </span>
              </li>
              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("mobileApp", null)}
                >
                  <p>Mobile App Developmentp</p>
                  <FaChevronRight />
                </span>
                <ul
                  className={`nested-submenu  ${
                    subMenuOpen === "mobileApp" ? "active" : ""
                  }`}
                >
                  <li className="submenu-item cursor-pointer"   onClick={() => toggleSubMenu("mobileApp", "services")}>
                    <span
                      className="flex items-center cursor-pointer"
                    
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/mobile-app-development">
                      <b>Mobile App Development</b>
                    </Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/android-app-development">Android App</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/iphone-application-development">iOS App</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/hybrid-app-development">Hybrid App</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/flutter-app-development">Flutter</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/react-native-app-development">
                      React Native
                    </Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/kotlin-app-development">Kotlin</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/ionic-app-development">Ionic</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/swift-development">Swift</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/xamarin-app-development">Xamarin</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/apple-vision-pro-app-development">
                      VisionOS
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Web and CMS Development Submenu */}
              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("webCMS", null)}
                >
                  <p> Web and CMS Development</p>
                  <FaChevronRight />
                </span>
                <ul
                  className={`nested-submenu  ${
                    subMenuOpen === "webCMS" ? "active" : ""
                  }`}
                >
                  <li className="submenu-item cursor-pointer"   onClick={() => toggleSubMenu("webCMS", "services")}>
                    <span
                      className="flex items-center "
                    
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/web-development">
                      <b>Web and CMS Development</b>
                    </Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/php-web-application-development">PHP</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/wordpress-development">WordPress</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/drupal-development">Drupal</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/laravel-development">Laravel</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/codeigniter-development">CodeIgniter</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/reactjs-development">ReactJs</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/angularjs-development">AngularJs</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/nodejs-development">NodeJs</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/cakephp-development">CakePHP</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/python-web-development">Python</Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="/typescript">TypeScript</Link>
                  </li>
                </ul>
              </li>
              {/* Ecommerce Development Submenu */}
              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("ecommerce", null)}
                >
                  <p>Ecommerce Development</p>
                  <FaChevronRight />
                </span>
                <ul
                  className={`nested-submenu ${
                    subMenuOpen === "ecommerce" ? "active" : ""
                  }`}
                >
                  {/* Back Button */}
                  <li className="submenu-item  cursor-pointer"  onClick={() => toggleSubMenu("ecommerce", "services")}>
                    <span
                      className="flex items-center"
                     
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>

                  {/* Ecommerce Development Links */}
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="https://www.hyperlinkinfosystem.com/ecommerce-development">
                      <b>Ecommerce Development</b>
                    </Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="https://www.hyperlinkinfosystem.com/magento-development-india.htm">
                      Magento
                    </Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="https://www.hyperlinkinfosystem.com/bigcommerce.htm">
                      Bigcommerce
                    </Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="https://www.hyperlinkinfosystem.com/ubercart-development-india.htm">
                      Ubercart
                    </Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="https://www.hyperlinkinfosystem.com/cs-cart-development.htm">
                      CSCart
                    </Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="https://www.hyperlinkinfosystem.com/prestashop.htm">
                      Prestashop
                    </Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="https://www.hyperlinkinfosystem.com/virtuemart-development-india.htm">
                      Virtuemart
                    </Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="https://www.hyperlinkinfosystem.com/shopify-development">
                      Shopify
                    </Link>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <Link href="https://www.hyperlinkinfosystem.com/woocommerce-development">
                      WooCommerce
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("Blockchain Development", null)}
                >
                  <p>Blockchain Development</p>
                  <FaChevronRight />
                </span>
                <ul
                  className={`nested-submenu ${
                    subMenuOpen === "Blockchain Development" ? "active" : ""
                  }`}
                >
                  {/* Back Button */}
                  <li className="submenu-item cursor-pointer"   onClick={() =>
                        toggleSubMenu("Blockchain Development", "services")
                      }>
                    <span
                      className="flex items-center "
                    
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>

                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <b>Blockchain Development</b>
                  </li>
                  {BlockchainMenuItems.map((item, index) => (
                    <li
                      key={index}
                      className="submenu-item flex items-center justify-between cursor-pointer"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("Game Development", null)}
                >
                  <p>Game Development</p>
                  <FaChevronRight />
                </span>
                <ul
                  className={`nested-submenu ${
                    subMenuOpen === "Game Development" ? "active" : ""
                  }`}
                >
                  {/* Back Button */}
                  <li className="submenu-item cursor-pointer"  onClick={() =>
                        toggleSubMenu("Game Development", "services")
                      }>
                    <span
                      className="flex items-center "
                     
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>

                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <b>Game Development</b>
                  </li>
                  {GameDevelopmentMenuItems.map((item, index) => (
                    <li
                      key={index}
                      className="submenu-item flex items-center justify-between cursor-pointer"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("Salesforce Solutions", null)}
                >
                  <p>Salesforce Solutions</p>
                  <FaChevronRight />
                </span>
                <ul
                  className={`nested-submenu ${
                    subMenuOpen === "Salesforce Solutions" ? "active" : ""
                  }`}
                >
                  {/* Back Button */}
                  <li className="submenu-item cursor-pointer"  onClick={() =>
                        toggleSubMenu("Salesforce Solutions", "services")
                      }>
                    <span
                      className="flex items-center "
                     
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>

                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <b>Salesforce Solutions</b>
                  </li>
                  {SalesforceSolutionsMenuItems.map((item, index) => (
                    <li
                      key={index}
                      className="submenu-item flex items-center justify-between cursor-pointer"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("AI & ML", null)}
                >
                  <p>AI & ML</p>
                  <FaChevronRight />
                </span>
                <ul
                  className={`nested-submenu ${
                    subMenuOpen === "AI & ML" ? "active" : ""
                  }`}
                >
                  {/* Back Button */}
                  <li className="submenu-item cursor-pointer" onClick={() => toggleSubMenu("AI & ML", "services")}>
                    <span
                      className="flex items-center "
                      
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>

                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <b>AI & ML</b>
                  </li>
                  {AIMLMenuItems.map((item, index) => (
                    <li
                      key={index}
                      className="submenu-item flex items-center justify-between cursor-pointer"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("IoT & Embedded", null)}
                >
                  <p>IoT & Embedded</p>
                  <FaChevronRight />
                </span>
                <ul
                  className={`nested-submenu ${
                    subMenuOpen === "IoT & Embedded" ? "active" : ""
                  }`}
                >
                  {/* Back Button */}
                  <li className="submenu-item cursor-pointer"  onClick={() =>
                        toggleSubMenu("IoT & Embedded", "services")
                      }>
                    <span
                      className="flex items-center "
                     
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>

                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <b>IoT & Embedded</b>
                  </li>
                  {IoTEmbedded.map((item, index) => (
                    <li
                      key={index}
                      className="submenu-item flex items-center justify-between cursor-pointer"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                >
                  <p>DevOps</p>
                </span>
              </li>
            </ul>
          </li>

          {/* Hire Resources Section */}

          <li className="menu-item">
            <div
              style={{ display: "flex" }}
              className="menu-link items-center justify-between w-full cursor-pointer"
              onClick={() => toggleMenu("hireResources", null)}
            >
              <p> Hire Resources</p>
              <FaChevronRight className="" />
            </div>
            <ul
              className={`submenu ${
                openMenu === "hireResources" ? "active" : ""
              }`}
            >
              {/* Hire App Developers Submenu */}
              <li className="submenu-item cursor-pointer" onClick={() => toggleMenu("")}>
                <span
                  className="flex items-center "
                >
                  <MdArrowBackIos />
                  <span className="ml-2" >
                    Back
                  </span>
                </span>
              </li>
              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("hireApp", null)}
                >
                  <p>Hire App Developers</p>
                  <FaChevronRight />
                </span>

                <ul
                  className={`nested-submenu ${
                    subMenuOpen === "hireApp" ? "active" : ""
                  }`}
                >
                  <li className="submenu-item cursor-pointer"  onClick={() => toggleSubMenu("hireApp", "hireResources")}>
                    <span
                      className="flex items-center "
                     
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <b>Hire App Developers</b>
                  </li>
                  {HireResourcesMenuItems.map((item, index) => (
                    <li
                      key={index}
                      className="submenu-item flex items-center justify-between cursor-pointer"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("hireFrontend", null)}
                >
                  <p>Hire Frontend Developers</p>
                  <FaChevronRight />
                </span>

                <ul
                  className={`nested-submenu ${
                    subMenuOpen === "hireFrontend" ? "active" : ""
                  }`}
                >
                  <li className="submenu-item cursor-pointer"  onClick={() => toggleSubMenu("hireFrontend", "hireResources")}>
                    <span
                      className="flex items-center "
                     
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <b>Hire Frontend Developers</b>
                  </li>
                  { FrontendMenuItems.map((item, index) => (
                    <li
                      key={index}
                      className="submenu-item flex items-center justify-between cursor-pointer"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("hireBackend", null)}
                >
                  <p>Hire Backend Developers</p>
                  <FaChevronRight />
                </span>

                <ul
                  className={`nested-submenu ${
                    subMenuOpen === "hireBackend" ? "active" : ""
                  }`}
                >
                  <li className="submenu-item  cursor-pointer"   onClick={() => toggleSubMenu("hireBackend", "hireResources")}>
                    <span
                      className="flex items-center"
                    
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <b>Hire Backend Developers</b>
                  </li>
                  { developersList.map((item, index) => (
                    <li
                      key={index}
                      className="submenu-item flex items-center justify-between cursor-pointer"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("hireGame", null)}
                >
                  <p>Hire Game Developers</p>
                  <FaChevronRight />
                </span>

                <ul
                  className={`nested-submenu ${
                    subMenuOpen === "hireGame" ? "active" : ""
                  }`}
                >
                  <li className="submenu-item cursor-pointer"  onClick={() => toggleSubMenu("hireGame", "hireResources")}>
                    <span
                      className="flex items-center "
                     
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <b>Hire Game Developers</b>
                  </li>
                  { gameList.map((item, index) => (
                    <li
                    key={index}
                    className="submenu-item flex items-center justify-between cursor-pointer"
                  >
                    <Link href={item.link}>
                      {item.title.length > 31 ? `${item.title.slice(0, 31)}...` : item.title}
                    </Link>
                  </li>
                  ))}
                </ul>
              </li>

              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("hireeCommerce", null)}
                >
                  <p>Hire eCommerce Developers</p>
                  <FaChevronRight />
                </span>

                <ul
                  className={`nested-submenu ${
                    subMenuOpen === "hireeCommerce" ? "active" : ""
                  }`}
                >
                  <li className="submenu-item cursor-pointer"  onClick={() => toggleSubMenu("hireeCommerce", "hireResources")}>
                    <span
                      className="flex items-center "
                     
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <b>Hire eCommerce Developers</b>
                  </li>
                  { ecommerceList.map((item, index) => (
                    <li
                    key={index}
                    className="submenu-item flex items-center justify-between cursor-pointer"
                  >
                    <Link href={item.link}>
                      {item.title.length > 31 ? `${item.title.slice(0, 31)}...` : item.title}
                    </Link>
                  </li>
                  ))}
                </ul>
              </li>

              <li className="submenu-item">
                <span
                  style={{ display: "flex" }}
                  className="menu-link items-center justify-between w-full cursor-pointer"
                  onClick={() => toggleSubMenu("hireDedicated", null)}
                >
                  <p>Hire Dedicated Developers</p>
                  <FaChevronRight />
                </span>

                <ul
                  className={`nested-submenu ${
                    subMenuOpen === "hireDedicated" ? "active" : ""
                  }`}
                >
                  <li className="submenu-item cursor-pointer" onClick={() => toggleSubMenu("hireDedicated", "hireResources")}>
                    <span
                      className="flex items-center"
                      
                    >
                      <MdArrowBackIos />
                      <span className="ml-2">Back</span>
                    </span>
                  </li>
                  <li className="submenu-item flex items-center justify-between cursor-pointer">
                    <b>Hire dedicated Developers</b>
                  </li>
                  { dedicatedDeveloperList.map((item, index) => (
                    <li
                    key={index}
                    className="submenu-item flex items-center justify-between cursor-pointer"
                  >
                    <Link href={item.link}>
                      {item.title.length > 31 ? `${item.title.slice(0, 31)}...` : item.title}
                    </Link>
                  </li>
                  ))}
                </ul>
              </li>
            </ul>
            

          </li>

          

          

          {/* Industries Section */}
          <li className="menu-item">
            <div
              style={{ display: "flex" }}
              className="menu-link items-center justify-between w-full cursor-pointer"
              onClick={() => toggleMenu("industries")}
            >
              <p>Industries</p>
              <FaChevronRight className="" />
            </div>
            <ul
              className={`submenu ${openMenu === "industries" ? "active" : ""}`}
            >
               <li className="submenu-item cursor-pointer" onClick={() => toggleMenu("")}>
                <span
                  className="flex items-center "
                 
                >
                  <MdArrowBackIos />
                  <span className="ml-2" onClick={() => toggleMenu("about")}>
                    Back
                  </span>
                </span>
              </li>
              <li className="submenu-item">
                <Link href="/education-app-development">Education</Link>
              </li>
              <li className="submenu-item">
                <Link href="/real-estate">Real-Estate</Link>
              </li>
              <li className="submenu-item">
                <Link href="/logistic-app-development">Logistics</Link>
              </li>
              <li className="submenu-item">
                <Link href="/entertainment">Entertainment</Link>
              </li>
              <li className="submenu-item">
                <Link href="/healthcare-app-development">Healthcare</Link>
              </li>
              <li className="submenu-item">
                <Link href="/retail-app-development">Retail</Link>
              </li>
              <li className="submenu-item">
                <Link href="/app-development-for-restaurant-and-food-services">
                  Food & Restaurant
                </Link>
              </li>
              <li className="submenu-item">
                <Link href="/ondemand-app-development">On-Demand</Link>
              </li>
              <li className="submenu-item">
                <Link href="/app-development-for-finance-and-banking">
                  Fintech
                </Link>
              </li>
              <li className="submenu-item">
                <Link href="/travel-app-development">Travel & Hospitality</Link>
              </li>
              <li className="submenu-item">
                <Link href="/gaming-app-development">Game</Link>
              </li>
              <li className="submenu-item">
                <Link href="/sports-app-development">Sports</Link>
              </li>
            </ul>
          </li>

          {/* Case Study Section */}
          <li className="menu-item">
            <span
              className="menu-link"
              onClick={() => (window.location.href = "/case-study")}
            >
              Case Study
            </span>
          </li>

          {/* Our Resources Section */}
          <li className="menu-item">
            <div
              style={{ display: "flex" }}
              className="menu-link items-center justify-between w-full cursor-pointer"
              onClick={() => toggleMenu("resources")}
            >
              <p>Our Resources</p>
              <FaChevronRight className="" />
            </div>
            <ul
              className={`submenu ${openMenu === "resources" ? "active" : ""}`}
            >
               <li className="submenu-item w-full cursor-pointer" onClick={() => toggleMenu("")}>
                <span
                  className="flex items-center "
                 >
                  <MdArrowBackIos />
                  <span className="ml-2" onClick={() => toggleMenu("about")}>
                    Back
                  </span>
                </span>
              </li>
              <li className="submenu-item">
                <Link href="/blog">Latest Blogs</Link>
              </li>
              <li className="submenu-item">
                <Link href="/research">Research</Link>
              </li>
              <li className="submenu-item">
                <Link href="/media-coverage">Media Coverage</Link>
              </li>
              <li className="submenu-item">
                <Link href="/press-releases">Press Release</Link>
              </li>
              <li className="submenu-item">
                <Link href="/technews">Tech News</Link>
              </li>
              <li className="submenu-item">
                <Link href="/articles">Articles</Link>
              </li>
              <li className="submenu-item">
                <Link href="/whitepaper">Whitepaper</Link>
              </li>
              <li className="submenu-item">
                <Link href="/podcast">Podcast</Link>
              </li>
              <li className="submenu-item">
                <Link href="/our-portfolio">Portfolio</Link>
              </li>
              <li className="submenu-item">
                <Link href="/download-brochure">Download Brochure</Link>
              </li>
            </ul>
          </li>

          {/* Contact Us Section */}
          <li className="menu-item">
            <span
              className="menu-link"
              onClick={() => (window.location.href = "/contact")}
            >
              Contact Us
            </span>
          </li>
        </li>

        {/* Contact Numbers */}

        <li className="contact-list w-full">
          <a
            href="tel:+918000161161"
            className="py-0 px-[20px] w-full flex items-center border-b-[1px] [black]"
          >
            <img
              alt="india"
              src="https://www.hyperlinkinfosystem.com/assets/img/ind-flag.svg"
              className="mr-1"
            />{" "}
            <span> +91 8000 161161</span>
          </a>
          <a
            href="tel:+13097914105"
            className="py-0 px-[20px] flex items-center border-b-[1px] [black]"
          >
            <img
              alt="usa"
              src="https://www.hyperlinkinfosystem.com/assets/img/us-flag.svg"
              className="mr-1"
            />{" "}
            <span> +1 309 791 4105</span>
          </a>
          <a
            href="tel:+442032879060"
            className="py-0 px-[20px] flex items-center  border-b-[1px] [black]"
          >
            <img
              alt="uk"
              src="https://www.hyperlinkinfosystem.com/assets/img/uk-flag.svg"
              className="mr-1"
            />{" "}
            <span> +44 20 3287 9060</span>
          </a>
          <div className="flex items-center justify-around ">
            <a
              href="https://www.facebook.com/Hyperlink-infosystem-140449209446270/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 mx-2 ml-3"
            >
              <img
                src="https://www.hyperlinkinfosystem.com/assets/img/fb-icon.svg"
                alt="Facebook"
                className="w-[30px] h-[30px]"
              />
            </a>
            <a
              href="https://twitter.com/hyperlinkinfo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 mx-2 ml-3"
            >
              <img
                src="https://www.hyperlinkinfosystem.com/assets/img/tw-icon.svg"
                alt="Twitter"
                className="w-[30px] h-[30px]"
              />
            </a>
            <a
              href="https://www.instagram.com/hyperlink_infosystem/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 mx-2 ml-3"
            >
              <img
                src="https://www.hyperlinkinfosystem.com/assets/img/insta-icon.svg"
                alt="Instagram"
                className="w-[30px] h-[30px]"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/hyperlinkinfosystem"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 mx-2 ml-3"
            >
              <img
                src="https://www.hyperlinkinfosystem.com/assets/img/in-icon.svg"
                alt="LinkedIn"
                className="w-[30px] h-[30px]"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UC1-3xlMsMK-47ew6WfbLqsQ"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 mx-2 ml-3"
            >
              <img
                src="https://www.hyperlinkinfosystem.com/assets/img/yt-icon.svg"
                alt="YouTube"
                className="w-[30px] h-[30px]"
              />
            </a>
            <a
              href="https://topappdevelopmentcompanies.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 mx-2 ml-3"
            >
              <img
                src="https://www.hyperlinkinfosystem.com/assets/img/tp-icon.svg"
                alt="Top App Companies"
                className="w-[30px] h-[30px]"
              />
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
