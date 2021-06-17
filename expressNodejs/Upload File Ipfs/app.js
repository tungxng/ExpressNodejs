const ipfsClient = require('ipfs-http-client');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const ipfs = ipfsClient.create({host: 'localhost', port: '5001',protocol: 'http'});
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

app.get('/',(req,res) => {
    res.render('home');
});

app.post('/upload', (req,res) => {
    const file = req.files.file;
    const fileName = req.body.fileName;
    const filePath = 'files' + fileName;
    const description = req.body.description;


    file.mv(filePath, async (err) => {
        if (err) {
            console.log('Error: failed to dowload the file');
            return res.status(500).send(err);
        }

        const fileHash = await addFile(fileName, filePath);
        
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err);
            }
        });
        const newHash = "https://cloudflare-ipfs.com/ipfs/"+decodeURI(fileHash);
        res.render('upload', { fileName, fileHash,newHash});
        writeJson(fileName,description,newHash);
    });
     
    
});

const addFile = async (fileName, filePath) => {
    const file = fs.readFileSync(filePath);
    const fileAdded = ipfs.add({path: fileName, content: file})
    const fileHash = (await fileAdded).cid;

    return fileHash;
}

const writeJson = async (name,description,uriImg) =>{
    var obj = {
        description: "",
        image:"",
        name:""
    }
    obj.name =name;
    obj.description = description;
    obj.image = uriImg;

    fs.writeFile ("input.json", JSON.stringify(obj), function(err) {
        if (err) throw err;
       
        }
    );
}

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
