function fetchJSON(url) {
  return fetch(url).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
}

function marvelFactory(config) {
  return function(path) {
    var timestamp = new Date().getTime();
    var hash = CryptoJS.MD5(timestamp + config.privateKey + config.publicKey).toString();
    var url = config.hostname + '/v' + config.version + '/public' + path + '?apikey=' + config.publicKey + '&ts=' + timestamp + '&hash=' + hash;
    console.log(url);

    return fetchJSON(url);
  }
}

// Get an instance of the marvel api
var marvel = marvelFactory({
  hostname: 'http://gateway.marvel.com',
  publicKey: '2c75fc18d125009804c24d5d29c25268',
  privateKey: '9e72845868dd8d8a238b208cf4f03848db410744',
  version: '1'
});

// 1. Sign up for the marvel api: https://developer.marvel.com
// 2. Get your public and private key from: https://developer.marvel.com/account
// 3. Replace the above config with your own public and private key
// 4. On the account page, a new allowed referer: localhost
// 5. Make sure you hit update!
// 6. Fork jimthedev/promises on github
// 7. Clone <<yourusername>>/promises from github to your computer
// 8. cd in your promises folder and run `npm install`.
// 9. Modify marvel.js to add the name of the character as well.
// 10.You can run a server with: `./node_modules/.bin/http-server`
// 11.Once the server is running, you can see the code at:
//       http://localhost:8080/marvel.html
//
//map
// marvel('/characters').then(function(json) { 
//   var count = 0;
//   json.data.results.map(function(character){

//     var characterContainer = document.createElement('character');

//      // Any operations specific to this character
//     var imgPath = character.thumbnail.path + '.' + character.thumbnail.extension;
//     var name = character.name;

//     var img = document.createElement('img'); // Create an element node
//     img.setAttribute('src', imgPath); // Set some properties on the node

//     var nameTag = document.createElement('character-name'); // <character-name>

//     var nameTextNode = document.createTextNode(name); // 3D-Man
//     var nameLinkNode = document.createElement('a'); // <a>
//     nameLinkNode.setAttribute('href', 'https://www.google.com/#q=' + encodeURIComponent(name));
//     nameLinkNode.appendChild(nameTextNode); // <a href="...">3D-Man</a>

//     nameTag.appendChild(nameLinkNode); // <character-name><a href="...">3D-man</a></character-name>

//     // Add different properties for a single character
//     characterContainer.appendChild(nameTag); // <character><character-name>3D-Man</character-name></character>
//     characterContainer.appendChild(img); // <character><character-name>3D-Man</character-name><img src="..." /></character>
//     // var letTag = document.createElement('letter-container');
//     // // var letterContainer = document.querySelector('letter')
//     // letTag.appendChild(nameTag);


//     // Add the character tag to the overall list of characters
//     var container = document.querySelector('characters'); // <characters><character><character-name>3D-Man</character-name><img src="..." /></character></characters>
//     // container.appendChild(characterContainer); 

//     if (imgPath !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
//       container.appendChild(characterContainer)
//     } else {
//       count++;
//     }

//   });
//   console.log(count);
// });

marvel('/characters').then(function(json) { 
      var container = document.querySelector('characters');
  var count = 0;
  var noImageArray = json.data.results.filter(function(character){

    var characterContainer = document.createElement('character');

     // Any operations specific to this character
    var imgPath = character.thumbnail.path + '.' + character.thumbnail.extension;
    var name = character.name;

    var img = document.createElement('img'); // Create an element node
    img.setAttribute('src', imgPath); // Set some properties on the node

    var nameTag = document.createElement('character-name'); // <character-name>

    var nameTextNode = document.createTextNode(name); // 3D-Man
    var nameLinkNode = document.createElement('a'); // <a>
    nameLinkNode.setAttribute('href', 'https://www.google.com/#q=' + encodeURIComponent(name));
    nameLinkNode.appendChild(nameTextNode); // <a href="...">3D-Man</a>

    nameTag.appendChild(nameLinkNode); // <character-name><a href="...">3D-man</a></character-name>

    // Add different properties for a single character
    characterContainer.appendChild(nameTag); // <character><character-name>3D-Man</character-name></character>
    characterContainer.appendChild(img); // <character><character-name>3D-Man</character-name><img src="..." /></character>
    // var letTag = document.createElement('letter-container');
    // // var letterContainer = document.querySelector('letter')
    // letTag.appendChild(nameTag);


    // Add the character tag to the overall list of characters
 // <characters><character><character-name>3D-Man</character-name><img src="..." /></character></characters>
    // container.appendChild(characterContainer); 

    if (imgPath === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
     return true;
  
    } else {
          container.appendChild(characterContainer)
      return false;
    }

  });
  console.log(noImageArray.length);
});



// // Make a call using the api
// marvel('/characters').then(function(json) { 
//   var finalCount = 0;
//   json.data.results.reduce(function(accumulator, character){

//     var characterContainer = document.createElement('character');

//      // Any operations specific to this character
//     var imgPath = character.thumbnail.path + '.' + character.thumbnail.extension;
//     var name = character.name;

//     var img = document.createElement('img'); // Create an element node
//     img.setAttribute('src', imgPath); // Set some properties on the node

//     var nameTag = document.createElement('character-name'); // <character-name>

//     var nameTextNode = document.createTextNode(name); // 3D-Man
//     var nameLinkNode = document.createElement('a'); // <a>
//     nameLinkNode.setAttribute('href', 'https://www.google.com/#q=' + encodeURIComponent(name));
//     nameLinkNode.appendChild(nameTextNode); // <a href="...">3D-Man</a>

//     nameTag.appendChild(nameLinkNode); // <character-name><a href="...">3D-man</a></character-name>

//     // Add different properties for a single character
//     characterContainer.appendChild(nameTag); // <character><character-name>3D-Man</character-name></character>
//     characterContainer.appendChild(img); // <character><character-name>3D-Man</character-name><img src="..." /></character>
//     // var letTag = document.createElement('letter-container');
//     // // var letterContainer = document.querySelector('letter')
//     // letTag.appendChild(nameTag);


//     // Add the character tag to the overall list of characters
//     var container = document.querySelector('characters'); // <characters><character><character-name>3D-Man</character-name><img src="..." /></character></characters>
//     // container.appendChild(characterContainer); 

//     if (imgPath !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
//       container.appendChild(characterContainer)
//       return {count:accumulator.count};
//     } else {
//       if (typeof accumulator.count==='undefined'){
//         return {count:1};
//       } else{
//         var characterWithCount = character;
//         characterWithCount.count= accumulator.count++;
//         return characterWithCount;
//     }
//   }

//   });

// });

// marvel('/characters').then(function(json) { 
//   json.data.results.reduce(function(character){

//     var imgPath = ;
    // if { (character.thumbnail.path == image_not_available) + '.' + (character.thumbnail.extension === .jpeg) }


//   });

// });