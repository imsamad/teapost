const content = `<div>​<span style=\"color: rgb(34, 34, 34); font-family: Merriweather; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">Application security is an important factor for every web application. Web developers use various strategies to improve the security layer of their web applications, such as implementing vulnerability prevention techniques.</span></div><div><br></div><div><span style=\"color: rgb(34, 34, 34); font-family: Merriweather; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">Web application security risks typically increase when you start processing raw HTML and manipulate the DOM with untrusted content. If you are rendering HTML directly from a third-party source and the source gets affected by an internet-based threat, attackers can execute JavaScript code on your application users’ computers without your consent. These security attacks are known as XSS (cross-site scripting) attacks.</span></div><div><br></div><div><span style=\"color: rgb(34, 34, 34); font-family: Merriweather; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">HTML sanitisation is an<span>&nbsp;</span></span><a target=\"_blank\" href=\"https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#introduction\" alt=\"OWASP-recommended\">OWASP-recommended</a><span style=\"color: rgb(34, 34, 34); font-family: Merriweather; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\"><span>&nbsp;</span>strategy to prevent XSS vulnerabilities in web applications. HTML sanitization offers a security mechanism to remove unsafe (and potentially malicious) content from untrusted raw HTML strings before presenting them to the user.</span></div><div><br></div><div><span style=\"color: rgb(34, 34, 34); font-family: Merriweather; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">The experimental, inbuilt browser Sanitization API helps you to insert untrusted HTML strings to your web application’s DOM in a safe way. In this article, I will discuss:</span></div><div>​<br></div><div> <ul><li><a target=\"_blank\" href=\"https://blog.logrocket.com/what-you-need-know-inbuilt-browser-html-sanitization/#what-html-sanitization\" alt=\"What is HTML sanitization?\"><span style=\"font-size: 14px;\">What is HTML sanitization?</span></a><span style=\"font-size: 14px;\">​</span></li><li style=\"font-size: 14px;\"><span style=\"font-size: 14px;\">​<a href=\"https://blog.logrocket.com/what-you-need-know-inbuilt-browser-html-sanitization/#why-need-browser-native-sanitization-api\" alt=\"Why do we need a browser-native Sanitization API?\">Why do we need a browser-native Sanitization API?</a>​</span></li><li><a href=\"https://blog.logrocket.com/what-you-need-know-inbuilt-browser-html-sanitization/#sanitizer-api-methods\" alt=\"Sanitizer API methods:&nbsp;sanitize,&nbsp;sanitizeFor, and&nbsp;setHTML\">Sanitizer API methods:&nbsp;sanitize,&nbsp;sanitizeFor, and&nbsp;setHTML</a></li><li style=\"font-size: 14px;\"><span style=\"font-size: 14px;\">​<a href=\"https://blog.logrocket.com/what-you-need-know-inbuilt-browser-html-sanitization/#understanding-html-sanitization-api\" alt=\"Understanding the HTML Sanitization API\">Understanding the HTML Sanitization API</a>​</span></li><li style=\"font-size: 14px;\"><span style=\"font-size: 14px;\">​<a href=\"https://blog.logrocket.com/what-you-need-know-inbuilt-browser-html-sanitization/#experimenting-sanitizer-api\" alt=\"Experimenting with the Sanitizer API\">Experimenting with the Sanitizer API</a>​</span></li><li style=\"font-size: 14px;\"><span style=\"font-size: 14px;\">​<a href=\"https://blog.logrocket.com/what-you-need-know-inbuilt-browser-html-sanitization/#sanitizing-iframes\" alt=\"Sanitizing iframes\">Sanitizing iframes</a>​</span></li><li><span style=\"font-size: 14px;\">​</span><a href=\"https://blog.logrocket.com/what-you-need-know-inbuilt-browser-html-sanitization/#browser-support-api-status\" alt=\"Browser support and API status\"><span style=\"font-size: 14px;\">Browser support and API status</span></a></li></ul></div><div><br></div><h2>What is HTML sanitization?</h2><div><br></div><div>​<span style=\"color: rgb(34, 34, 34); font-family: Merriweather; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">HTML sanitization generally refers to removing potentially malicious JavaScript content from raw HTML strings. There are two different HTML sanitization implementations:</span></div><div><br></div><div><br></div><div> <ul><li style=\"font-size: 14px;\"><span style=\"font-size: 14px;\">Client-side sanitization: prevents unsafe content from the DOM level</span></li><li style=\"font-size: 14px;\"><span style=\"font-size: 14px;\">Server-side sanitization: prevents the storage of malicious HTML content in databases</span></li></ul></div><div><br></div><div><br></div><div>​<span style=\"color: rgb(34, 34, 34); font-family: Merriweather; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">We indeed need to use both sanitization layers to prevent XSS vulnerabilities. If your database is affected by malicious XSS payloads, the client-side sanitization layer will protect all application users, but if an attacker sends malicious HTML directly from the RESTful API, server-side sanitization will protect the system.</span></div><div><br></div><p><span style=\"font-size: 18px;\">Web developers tend to use the following libraries for client-side/DOM-level sanitization:</span></p><div> <ul><li><a href=\"https://github.com/cure53/DOMPurify\" target=\"_blank\" rel=\"noopener\"><span style=\"font-size: 14px;\">DOMPurity</span></a><span style=\"font-size: 14px;\">: HTML sanitizer library for JavaScript that</span> <ul><li style=\"font-size: 14px;\"><span style=\"font-size: 14px;\">Also works on server-side Node.js via the&nbsp;<a href=\"https://github.com/jsdom/jsdom\" target=\"_blank\" rel=\"noopener\">jsdom</a>&nbsp;package</span></li></ul> </li><li style=\"font-size: 14px;\"><span style=\"font-size: 14px;\"><a href=\"https://github.com/leizongmin/js-xss\" target=\"_blank\" rel=\"noopener\">js-xss</a>: An HTML sanitizer library that works on browser, server-side Node.js, and as a command-line tool</span></li><li><a href=\"https://github.com/apostrophecms/sanitize-html\" target=\"_blank\" rel=\"noopener\"><span style=\"font-size: 14px;\">sanitize-html</span></a><span style=\"font-size: 14px;\">: An&nbsp;</span><a href=\"https://github.com/fb55/htmlparser2\" target=\"_blank\" rel=\"noopener\"><span style=\"font-size: 14px;\"><code class=\" prettyprinted\"><span class=\"pln\" style=\"box-sizing: inherit;\">htmlparser2</span></code>-based</span></a><span style=\"font-size: 14px;\">&nbsp;sanitizer library for Node.js and browser that’s very popular among React developers because there is a&nbsp;</span><a href=\"https://www.npmjs.com/package/sanitize-html-react\" target=\"_blank\" rel=\"noopener\"><span style=\"font-size: 14px;\">wrapper library</span></a><span style=\"font-size: 14px;\">&nbsp;especially for React</span></li></ul></div><p><span>&nbsp;</span><code class=\" prettyprinted\"><span class=\"pln\" style=\"box-sizing: inherit;\">innerHTML</span></code>.</p><h2>Why do we need a browser-native Sanitization API?</h2><p>​<span style=\"color: rgb(34, 34, 34); font-family: Merriweather; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">HTML sanitization generally refers to removing potentially malicious JavaScript content from raw HTML strings. There are two different HTML sanitization implementations:</span></p><p><br></p><p class=\"__se__p-spaced\" style=\"line-height: 1.5;\"><span style=\"color: rgb(34, 34, 34); font-family: Merriweather; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">These libraries typically parse unsafe HTML using either the browser’s inbuilt DOM iterator, or a custom HTML parser that excludes unsafe HTML content before using<span>&nbsp;</span></span><code class=\" prettyprinted\"><span class=\"pln\" style=\"box-sizing: inherit; color: rgb(255, 0, 0); background-color: rgb(250, 224, 212);\">innerHTML</span></code><span style=\"color: rgb(34, 34, 34); font-family: Merriweather; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;\">.</span></p><p><br></p><div class=\"se-component se-image-container __se__float-center\" contenteditable=\"false\"><figure style=\"margin: auto;\"><img src=\"http://res.cloudinary.com/dnkb5aetl/image/upload/v1648218289/dnenz1bkupq1h1vxg6ob.png\" alt=\"\" data-rotate=\"\" data-proportion=\"true\" data-rotatex=\"\" data-rotatey=\"\" data-size=\",\" data-align=\"center\" data-percentage=\"auto,auto\" data-index=\"0\" data-file-name=\"undefined\" data-file-size=\"undefined\" data-origin=\",\" style=\"\"></figure></div><p class=\"__se__p-spaced\" style=\"line-height: 1.5;\">​<span style=\"color: rgb(34, 34, 34); font-family: Merriweather; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">If you are using Mozilla Firefox, you can enable this feature via<span>&nbsp;</span></span><code class=\" prettyprinted\"><span class=\"pln\" style=\"box-sizing: inherit;\">about</span><span class=\"pun\" style=\"box-sizing: inherit;\">:</span><span class=\"pln\" style=\"box-sizing: inherit;\">config</span></code><span style=\"color: rgb(34, 34, 34); font-family: Merriweather; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">, as follows.</span></p><p class=\"__se__p-spaced\" style=\"line-height: 1.5;\"><br></p><p class=\"__se__p-spaced\" style=\"line-height: 1.5;\">​<br></p><div class=\"se-component se-image-container __se__float-center\" contenteditable=\"false\"><figure style=\"margin: auto;\"><img src=\"http://res.cloudinary.com/dnkb5aetl/image/upload/v1648218357/dfqlqbdpb3ixfgn2zu8j.png\" alt=\"\" data-rotate=\"\" data-proportion=\"true\" data-rotatex=\"\" data-rotatey=\"\" data-size=\",\" data-align=\"center\" data-percentage=\"auto,auto\" data-index=\"1\" data-file-name=\"undefined\" data-file-size=\"undefined\" data-origin=\",\" style=\"\"></figure></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div>`;
const stories = [
  {
    _id: "6221becd44eaf2d6fc67b984",
    slug: "mirqnqmtrrzltqs6_6gds",
    tags: ["6221bf0044eaf2d6fc67b995"],
    author: "6221be7444eaf2d6fc67b964",
    isPublished: true,
    subtitle:
      "The Russian invasion of Ukraine reveals a surprising truth about Russia’s conventional military forces: they are not nearly as formidable as Putin (and the West) believed.",
    title:
      "Putin’s Attack on Ukraine Shows the Danger of Believing Your Own Hype",
    keywords: "The Russian invasion",
    titleImage:
      "http://res.cloudinary.com/dnkb5aetl/image/upload/v1646378793/zf21btzxnootou1drmdb.jpg",
    content,
  },
  {
    _id: "6221bf3c44eaf2d6fc67b9c5",
    slug: "mirqnqmtrrzltqs6_",
    tags: ["6221bf8144eaf2d6fc67b9ed"],
    author: "6221be7444eaf2d6fc67b964",
    isPublished: true,
    subtitle: "That aren’t just, “Hey, how’re you feeling?”",
    title: "Emotional Check-Ins For Yourself and Others",
    titleImage:
      "http://res.cloudinary.com/dnkb5aetl/image/upload/v1646378890/inobpaq8odctm5h38hk2.jpg",
    content,

    keywords: "That aren’t just",
  },
  {
    _id: "6221bfde44eaf2d6fc67ba2a",
    slug: "87mmwekellcu-nex4uec7",
    tags: ["6221c01544eaf2d6fc67ba46"],
    author: "6221be8f44eaf2d6fc67b96a",
    isPublished: true,
    keywords: "The president of Russia lied",
    title: "Lying to Soldiers",
    subtitle:
      "The president of Russia lied about the political reality in Ukraine and his justifications",
    titleImage:
      "http://res.cloudinary.com/dnkb5aetl/image/upload/v1646379076/afizecla0b384o655bhw.jpg",
    content,
  },
  {
    _id: "6221c05d44eaf2d6fc67ba83",
    slug: "87mmwekellc",
    tags: ["6221c0a144eaf2d6fc67baaa"],
    author: "6221be8f44eaf2d6fc67b96a",
    isPublished: true,
    keywords: "onflict between Russian and NATO for",
    subtitle:
      "I don’t normally write about current events, but, as a mathematician, I felt compelled to",
    title:
      "Game theorists: NATO needs to convince Russia everything is still on the table",
    titleImage:
      "http://res.cloudinary.com/dnkb5aetl/image/upload/v1646379178/pyx108yyfcnxk6xwykmq.jpg",
    content,
  },
  {
    _id: "6221c12244eaf2d6fc67baf1",
    slug: "pg6-epuyzisnstrgiyo1w",
    tags: ["6221c15c44eaf2d6fc67bb1b"],
    author: "6221be9844eaf2d6fc67b96f",
    isPublished: true,
    keywords: "On loving your child and",
    subtitle: "On loving your child and losing yourself",
    title: "The Adjusted Age of Parenthood in a Pandemic",
    titleImage:
      "http://res.cloudinary.com/dnkb5aetl/image/upload/v1646379348/xxnfsoicf0cwaec7jj6v.jpg",
    content,
  },
  {
    _id: "6221c1b244eaf2d6fc67bb48",
    slug: "xydlq9duptxg64yhn8mtc",
    tags: ["6221c1ce44eaf2d6fc67bb5e"],
    author: "6221bea144eaf2d6fc67b974",
    isPublished: true,
    keywords: "He’s Doubling Down",
    subtitle: "Why Putin’s Not Backing Down — He’s Doubling Down",
    title: "Why Putin’s Not Backing Down — He’s Doubling Down",
    titleImage:
      "http://res.cloudinary.com/dnkb5aetl/image/upload/v1646379503/yvwqnyuykwincxipxjet.jpg",
    content,
  },
  {
    _id: "6221c22f44eaf2d6fc67bba3",
    slug: "xydlq9duptxg6",
    tags: ["6221c26a44eaf2d6fc67bbc8"],
    author: "6221bea144eaf2d6fc67b974",
    isPublished: true,
    keywords: "urAge Fitness Challenge",
    subtitle:
      "Join me in the #DoYourAge Fitness Challenge to improve your physical health and mental well-being",
    title: "The Motivating Power of an Age-Based Fitness Goal",
    titleImage:
      "http://res.cloudinary.com/dnkb5aetl/image/upload/v1646379621/wokndxowqqsldoqtkdxx.jpg",
    content,
  },
];
export default stories;
