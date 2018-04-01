


const readlineModule = require('readline');

const readLine = readlineModule.createInterface({
    input: process.stdin,
    output: process.stdout
});


const emptyField = '□';
const lifecell = '■';

const worldWidth = 50;
const worldHeight = 50;


readLine.question("Type start configuration:", (configuration) => {

    const realm = createRealm(worldWidth, worldHeight);
    const isValid = configureRealm(realm, configuration);

    if(isValid)
    {
        createNewState(realm);
        setInterval(() => {
            startLifeCycle(realm);
            console.clear();
            createNewState(realm);
        }, 100);
    }
    else{
        console.log('Invalid configuration');
    }
    readLine.close();
})

function startLifeCycle(realm)
{
    let state = realm.map(a => a.slice());
    for(let i = 0; i < worldHeight; i++)
    {
        for(let j = 0; j < worldWidth; j++)
        {
            const survivedCount = getSurvivedCount(j, i, state);

            if(realm[i][j] == lifecell && (survivedCount == 2 || survivedCount == 3))
            {
                continue;
            }
            if (survivedCount <= 1) {
                realm[i][j] = emptyField;
            }
            if (survivedCount >= 4) {
                realm[i][j] = emptyField;
            }
            if (survivedCount == 3) {
                realm[i][j] = lifecell;
            }
        }
    }

}

function getSurvivedCount(x, y, state) {
    const dirs = [[0, 1], [1, 0], [1, -1], [-1, 1], [-1, 0], [-1, -1],  [1, 1], [1, -1]];
    let sum = 0;
    dirs.forEach(pair => {
        sum += NaturalSelection(x + pair[0], y + pair[1], state);
    })

    return sum;
}

function NaturalSelection (x, y, state)
{
    if (x < 0 || y < 0 || x >= worldWidth || y >= worldHeight) {
        return 0;
    }

    return (state[y][x] == lifecell ? 1 : 0);
}

function createRealm(width, height)
{
    let realmArray = new Array(height);
    for(let i = 0; i<height; i++)
    {
        realmArray[i] = new Array(width);
        for(let j = 0; j < width; j++)
        {
            realmArray[i][j] = emptyField;
        }
    }
return realmArray;
}

function configureRealm(realm, configuration)
{
    if(configuration.trim() == 'randomSettings')
    {
        let randomNumber = Math.random() * 1000;
        for(let i=0; i < randomNumber; i++)
        {
            let x = Math.floor(Math.random() * 100);
            let y = Math.floor(Math.random() * 100);
            x %= worldWidth;
            y %= worldHeight;
            realm[y][x] = lifecell;
        }
        return true;
    }

    configurationData = configuration.split('');

    let n =+ configurationData[0];
    if(isNaN(n) || n == 0){
        return false;
    }
    let index = 1;
    for(let i = 0; i<n; i++)
    {
        let x =+ configurationData[index++];
        let y =+ configurationData[index++];
        realm[y][x] = lifecell;
    }
    return true;
}

function createNewState(realm)
{
    realm.forEach(row=>
    {
        console.log(row.join(''));
    })
}