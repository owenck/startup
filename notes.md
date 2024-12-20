# CS 260 NOTES
## GitHub Assignment
### Commits
Upload commits frequently, at significant functionality milestones to not lose work.
### Resolving Merge Conflicts
Compare versions and reslove through GitLens merge conflict resolver

## HTML
### Basic HTML Tags
html	The page container
head	Header information
title	Title of the page
meta	Metadata for the page such as character set or viewport settings
script	JavaScript reference. Either a external reference, or inline
include	External content reference
body	The entire content body of the page
header	Header of the main content
footer	Footer of the main content
nav	Navigational inputs
main	Main content of the page
section	A section of the main content
aside	Aside content from the main content
div	A block division of content
span	An inline span of content
h<1-9>	Text heading. From h1, the highest level, down to h9, the lowest level
p	A paragraph of text
b	Bring attention
table	Table
tr	Table row
th	Table header
td	Table data
ol,ul	Ordered or unordered list
li	List item
a	Anchor the text to a hyperlink
img	Graphical image reference
dialog	Interactive component such as a confirmation
form	A collection of user input
input	User input field
audio	Audio content
video	Video content
svg	Scalable vector graphic content
iframe	Inline frame of another HTML page

1. **Link Element**:
   - The `<link>` element links external resources, typically CSS stylesheets, to an HTML document.

2. **Div Tag**:
   - The `<div>` tag is a block-level container used to group elements for styling with CSS or scripting with JavaScript.

3. **#title vs .grid Selector**:
   - `#title` targets an element with the id `title` (unique), while `.grid` targets all elements with the class `grid` (multiple).

4. **Padding vs Margin**:
   - **Padding**: Space inside an element, between the content and its border.
   - **Margin**: Space outside an element, between the element and other elements.

5. **Flex Display for Images**:
   - Using flexbox, images can be aligned in a row or column based on the `flex-direction` property and can be spaced evenly or centered.

6. **Padding CSS**:
   - The specified padding CSS adds space inside an element, pushing the content away from the borders.

7. **Arrow Syntax Function Declaration**:
   - It defines a function using a shorter syntax. Example: `const add = (a, b) => a + b;` returns the sum of `a` and `b`.

8. **Map with Array Output**:
   - `map` creates a new array populated with the results of calling a provided function on every element in the original array.

9. **getElementById and addEventListener Output**:
   - The code will attach an event listener to an element, executing a function when the specified event occurs (e.g., click).

10. **# Selector in JavaScript**:
    - Using `document.querySelector('#id')` selects the first element with that specific id.

11. **True Statements about the DOM**:
    - The DOM represents the structure of a document as a tree.
    - It allows JavaScript to access and manipulate HTML elements dynamically.

12. **Default CSS Display of Span**:
    - The default display property value of the `<span>` element is `inline`.

13. **CSS for Div Background Color**:
    ```css
    div {
        background-color: red;
    }
    ```

14. **Display Image with Hyperlink**:
    ```html
    <a href="URL"><img src="image.jpg" alt="description"></a>
    ```

15. **CSS Box Model Order**:
    - **Content** → **Padding** → **Border** → **Margin**.

16. **CSS for Specific Text Color**:
    ```css
    .trouble { color: green; }
    ```

17. **For Loop Output**:
    - Will output the current value of the loop variable at each iteration.

18. **Change Text Color in JavaScript**:
    ```javascript
    document.getElementById('byu').style.color = 'green';
    ```

19. **Opening HTML Tags**:
    - Paragraph: `<p>`
    - Ordered List: `<ol>`
    - Unordered List: `<ul>`
    - Second Level Heading: `<h2>`
    - First Level Heading: `<h1>`
    - Third Level Heading: `<h3>`

20. **Declare Document Type**:
    - `<!DOCTYPE html>`

21. **Valid JavaScript Syntax**:
    - If: `if (condition) { }`
    - Else: `else { }`
    - For: `for (let i = 0; i < 10; i++) { }`
    - While: `while (condition) { }`
    - Switch: 
    ```javascript
    switch (expression) {
        case value:
            // code
            break;
        default:
            // code
    }
    ```

22. **Creating a JavaScript Object**:
    ```javascript
    const obj = {
        key: 'value',
        anotherKey: 'anotherValue'
    };
    ```

23. **Add Properties to JavaScript Objects**:
    - Yes, you can add new properties at any time.

24. **Include JavaScript on HTML Page**:
    - Use the `<script>` tag.

25. **Change Text in JavaScript**:
    ```javascript
    document.querySelector('.animal').textContent = 'crow';
    ```

26. **JSON Description**:
    - JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for humans to read and write, and easy for machines to parse and generate.

27. **Console Commands**:
    - `chmod`: Change file permissions.
    - `pwd`: Print working directory.
    - `cd`: Change directory.
    - `ls`: List directory contents.
    - `vim/nano`: Text editors.
    - `mkdir`: Make a new directory.
    - `mv`: Move or rename files/directories.
    - `rm`: Remove files/directories.
    - `man`: View manual for commands.
    - `ssh`: Secure shell for remote login.
    - `ps`: Display current processes.
    - `wget`: Download files from the web.
    - `sudo`: Execute commands with superuser privileges.

28. **Create Remote Shell Session**:
    - `ssh` creates a remote shell session.

29. **-la Parameter for ls Command**:
    - Shows all files (including hidden ones) in a detailed list format.

30. **Domain Name Structure**:
    - Top Level Domain: `.click`
    - Subdomain: `banana.fruit`
    - Root Domain: `bozo.click`

31. **Web Certificate for HTTPS**:
    - Yes, a web certificate is necessary to use HTTPS.

32. **DNS A Record**:
    - A DNS A record points to an IP address, not another A record.

33. **Reserved Ports**:
    - Port 443: HTTPS
    - Port 80: HTTP
    - Port 22: SSH

34. **Promises Output**:
    - The output depends on the promise's resolution or rejection handling in the provided code.


# Final Exam

---

## **Ports and Protocols**
- **HTTP Default Port**: 80  
- **HTTPS Default Port**: 443  
- **SSH Default Port**: 22  

---

## **HTTP Basics**
- **HTTP Status Codes**:
  - **300s**: Redirects (e.g., 301 for permanent, 302 for temporary)  
  - **400s**: Client Errors (e.g., 404 Not Found, 403 Forbidden)  
  - **500s**: Server Errors (e.g., 500 Internal Server Error)

- **`Content-Type` Header**: Specifies the data format of the response (e.g., `application/json`, `text/html`).

---

## **Cookies**
- **Secure Cookie**: Only sent over HTTPS.
- **Http-Only Cookie**: Not accessible via JavaScript (`document.cookie`).
- **Same-Site Cookie**: Restricts cross-site requests:
  - `Strict`: Only sent on same-site requests.
  - `Lax`: Sent on top-level navigation.

---

## **Express.js**
- Middleware example: Log sequence may vary based on middleware order. Carefully inspect the provided function and path matching.

- Front-end fetch + Express response: Understand how Express sends JSON (`res.json`) and how `fetch` handles promises.

---

## **MongoDB**
- Query Example: `{name: "Mark"}` selects documents where the field `name` equals `"Mark"`. Ensure proper case sensitivity.

---

## **Security**
- **Password Storage**: Always hash passwords with a strong algorithm (e.g., bcrypt, Argon2). Never store plain text passwords.

---

## **Websockets**
- **Purpose**: Enables full-duplex communication between client and server over a single TCP connection.

- Back-end and Front-end Logs: Match message sequences between `ws.send` (server-side) and `onmessage` (client-side).

---

## **Acronyms**
- **JSX**: JavaScript XML  
- **JS**: JavaScript  
- **AWS**: Amazon Web Services  
- **NPM**: Node Package Manager  
- **NVM**: Node Version Manager  

---

## **React**
- **React.useState**: Manages state within a functional component.
- **React Hooks**:
  - **State Hook (`useState`)**: Adds state to functional components.
  - **Context Hook (`useContext`)**: Accesses context values.
  - **Ref Hook (`useRef`)**: Manages DOM references or mutable values.
  - **Effect Hook (`useEffect`)**: Handles side effects (e.g., fetching data).
  - **Performance Hook (`useMemo`, `useCallback`)**: Optimizes performance.

- **React Router**: Understand routing logic and props like `useParams`.

---

## **Node.js and Tools**
- **`package.json`**: Defines dependencies, scripts, and metadata for your project.

- **`fetch` Function**: Performs asynchronous HTTP requests; returns a promise.

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.

- **PM2**: Process manager for Node.js applications; supports scaling, monitoring.

- **Vite**: Front-end build tool offering fast development environment.

---

## **Miscellaneous**
- **React Component Output**: Check how props and children are rendered within the component's return statement.

- **React Nested Components**: Understand the rendering tree created by component composition.
