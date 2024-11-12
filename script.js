/*
STRUCTURE OF GAME:
1  2  3  4 
5  6  7  8 
9  10 11 12
13 14 15 16

ROW STRUCTURE:
0
1
2
3


--------THINGS TO DO---------
Tiles merge though eachother
Win detection
Loss detection
Score
Format buttons & things above and below game, instead of on top

*/


function addBgColor(value, id) {
    let num = null
    
    let outputname = "tile-"
    if (value === null) {
        num = "blank"
    } else {
        num = value.toString()
    }
    


    outputname = outputname.concat(num)

    console.log(outputname, id)
    let element = document.getElementById(id.toString())
    element.className = ""
    element.classList.add(outputname)

    return outputname
}


function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function debug(text) {
    document.getElementById("debug").innerHTML = text
}



var occupiedTiles = []


function clearTile(id) { //relying on the fact that we remove only tiles that exsist
    document.getElementById(`${id}`).innerHTML = ""
    document.getElementById(`${id}`).className = ''
    addBgColor(0, id)



    occupiedTiles.splice(occupiedTiles.indexOf(id), 1)
    
}

function addTile(tileId, tileValue, index) {
    occupiedTiles.splice(index,0,tileId);
    document.getElementById(`${tileId}`).innerHTML = tileValue
    addBgColor(tileValue, tileId)
}


function removeFirstOccurrence(arr, value) {
    const index = arr.indexOf(value);  // Find the index of the first occurrence
    if (index !== -1) {  // Check if the value exists in the array
        arr.splice(index, 1);  // Remove the element at that index
    }
    return arr;
}

function spawnStartingBlocks() {
    let randomnum = RandomInt(1,16)
    let element = document.getElementById(`${randomnum}`)
    element.innerHTML = "2"
    addBgColor(2, randomnum)
    occupiedTiles.push(randomnum);



let randomnum2
do {
    randomnum2 = RandomInt(1,16)
    if (randomnum != randomnum2) {
        let element = document.getElementById(`${randomnum2}`)

        element.innerHTML = "2"
        addBgColor(2, randomnum2)
        occupiedTiles.push(randomnum2);

    }

} while (randomnum2 === randomnum) 

}


window.addEventListener('load', function() {
    
    spawnStartingBlocks()

});





function spawnBlock() {
    let randomnum = RandomInt(1,16);
    if (occupiedTiles.length != 16) { //need to check if its full, otherwise loop below never ends
        while (occupiedTiles.includes(randomnum)) { //checks if it exists already, if it does, generates a new location
            randomnum = RandomInt(1,16);
        }
    
    
    
        document.getElementById(`${randomnum}`).innerHTML = "2"
        addBgColor(2, randomnum)
    
        occupiedTiles.push(randomnum);
    } else {console.log("occupiedtiles is full, not spawning new tile.")}
   
}









function arrowRight() {
    let anyTileMoved = false;
    occupiedTiles.sort((a, b) => b - a);

    occupiedTiles.forEach((tileId,index) => {
        let newTileNum = parseInt(document.getElementById(tileId).innerText, 10);
        
        let newPosition = null;
        let row = Math.floor((tileId - 1) / 4);
        let rightmost = row * 4 + 4;

        for (let pos = rightmost; pos > row * 4; pos--) {
             //start at the rightmost position
             if (pos === tileId) {
                newPosition = pos;
                break;
            }
            
            if (!occupiedTiles.includes(pos)) {
                newPosition = pos;
                break;
            } else {
                if (document.getElementById(pos).innerText === document.getElementById(tileId).innerText) {
                    newPosition = pos;
                    newTileNum *=2
                    break;
                }
            }
        }

        


        if (newPosition !== tileId) {
            anyTileMoved = true;  // Indicate that at least one tile moved
            if (occupiedTiles.indexOf(newPosition) != -1) {
                console.log(`${newPosition} is occupied`)
                removeFirstOccurrence(occupiedTiles, newPosition)
            }
        }

        clearTile(tileId);
        addTile(newPosition, newTileNum, index)
    });


    return anyTileMoved;
}


function arrowUp() {
    let anyTileMoved = false;

    occupiedTiles.forEach((tileId, index) => {
        let newPosition = null
        let newTileNum = parseInt(document.getElementById(tileId).innerText, 10); //what to set the destination tile to


        let column = (tileId - 1) % 4 + 1;
        let topmost = column;
        for (let pos = topmost; pos <= tileId; pos += 4) {
            if (pos === tileId) {
                newPosition = pos;
                break;
            }
            
            if (!occupiedTiles.includes(pos)) {
                newPosition = pos;
                break;
            } else {
                if (document.getElementById(pos).innerText === document.getElementById(tileId).innerText) {
                    newPosition = pos;
                    newTileNum *=2
                    break;
                }
            }
            
        }

        if (newPosition !== tileId) {
            anyTileMoved = true; 
            if (occupiedTiles.indexOf(newPosition) != -1) {
                console.log(`${newPosition} is occupied`)
                removeFirstOccurrence(occupiedTiles, newPosition)
            }
        }
        


        clearTile(tileId);
        addTile(newPosition, newTileNum, index)
    });

    return anyTileMoved;
}

function arrowDown() {
    let anyTileMoved = false;

    occupiedTiles.forEach((tileId, index) => {
        let newPosition = null
        let newTileNum = parseInt(document.getElementById(tileId).innerText, 10);


        let column = (tileId - 1) % 4 + 1;
        let bottommost = 12 + column;
        for (let pos = bottommost; pos >= column; pos -= 4) {
            if (pos === tileId) {
                newPosition = pos;
                break;
            }
            
            if (!occupiedTiles.includes(pos)) {
                newPosition = pos;
                break;
            } else {
                if (document.getElementById(pos).innerText === document.getElementById(tileId).innerText) {
                    newPosition = pos;
                    newTileNum *=2
                    break;
                }
            }
        }
            


        if (newPosition !== tileId) {
            anyTileMoved = true; 
            if (occupiedTiles.indexOf(newPosition) != -1) {
                removeFirstOccurrence(occupiedTiles, newPosition)
            }
        }


        clearTile(tileId);
        addTile(newPosition,newTileNum, index)
    });

    return anyTileMoved;
}

function arrowLeft() {
    let anyTileMoved = false;
    occupiedTiles.sort((a, b) => a - b);

    occupiedTiles.forEach((tileId,index) => {
        let newPosition = null;
        let newTileNum = parseInt(document.getElementById(tileId).innerText, 10);


        let row = Math.floor((tileId-1) / 4);
        let leftmost = row * 4 + 1 ;
        for (let pos = leftmost; pos <= row * 4 + 4; pos++) {    
            if (pos === tileId) {
                newPosition = pos;
                break;
            }
            
            if (!occupiedTiles.includes(pos)) {
                newPosition = pos;
                break;
            } else {
                if (document.getElementById(pos).innerText === document.getElementById(tileId).innerText) {
                    newPosition = pos;
                    newTileNum *=2
                    break;
                }
            }
        }


        if (newPosition !== tileId) {
            anyTileMoved = true; 
            if (occupiedTiles.indexOf(newPosition) != -1) {
                removeFirstOccurrence(occupiedTiles, newPosition)
            }
        }
        clearTile(tileId);
        addTile(newPosition,newTileNum, index)


    });

    return anyTileMoved;
}


document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case "ArrowUp":
            let tileMovedUp = arrowUp();
            if (tileMovedUp) {
                spawnBlock();
            }
            console.log(`Table: ${JSON.stringify(occupiedTiles)}`);
        break;


        case "ArrowDown":
        let tileMovedDown = arrowDown();
        if (tileMovedDown) {
            spawnBlock();
        }
        console.log(`Table: ${JSON.stringify(occupiedTiles)}`);
        break;


        case "ArrowLeft":
            let tileMovedLeft = arrowLeft();
       		if (tileMovedLeft) {
           		spawnBlock();
        	}
			console.log(`Table: ${JSON.stringify(occupiedTiles)}`);
        break;


        case "ArrowRight":
        let tileMovedRight = arrowRight();
        if (tileMovedRight) {
            spawnBlock();
        }
        console.log(`Table: ${JSON.stringify(occupiedTiles)}`);
        break;

        case "`":
        console.log(numToClassName(452))
        
        break;
    }


});

function refreshboard() {
    for (let i = 1; i <= 16; i++) {
        clearTile(i)
    }
    console.log("-------NEW GAME--------")
    spawnStartingBlocks()
    console.log(`Table: ${JSON.stringify(occupiedTiles)}`);
}

