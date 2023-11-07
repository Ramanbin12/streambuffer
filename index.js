const {PassThrough} =require("stream")
const express=require("express")
const port=4000
const app=express()
const https=require("https")
const fetch=require("node-fetch")
// const multer=require("multer")
// const stream1="./public/video/video.mp4"
// const stream2="./public/video/nature.mp4"
const fs=require("fs")
const stream=require("stream")
// app.post("/",multer().single('video'),(req,res)=>{  
//     console.log(req.file);
//     const writestream=fs.createWriteStream(`./public/video/${req.file.originalname}`)
//     console.log("writestream",writestream)

//     writestream.write(req.file.buffer)
//     writestream.on('finish', () => {
//         res.status(200).send("File uploaded successfully.");
//     });
// })


// app.get('/mergevideo',(req,res)=>{
//     const video1=fs.readFileSync(stream1)
//     const video2=fs.readFileSync(stream2)
//     const combinevideo=Buffer.concat([video1,video2])
//     console.log("video1",video1)
//     console.log("video2",video2)
//     console.log("combinesviedo",combinevideo) 

//     // const writestream=fs.createWriteStream(`./public/video/combine.mp4`)
//     // writestream.write(combinevideo)
//     // const writeStream = fs.createWriteStream('./public/video/combined.mp4');
//     // writeStream.write(combinevideo);
//     // writeStream.end();
// // Create a custom Transform stream to merge video frames
// const videoMerger = new VideoMerger();

// // Pipe the input video streams to the custom Transform stream
// const videoStream1 = fs.createReadStream('video1.h264');
// const videoStream2 = fs.createReadStream('video2.h264');
// videoStream1.pipe(videoMerger);
// videoStream2.pipe(videoMerger);

// videoMerger.pipe(mergedVideoStream);

     
// })


app.get("/video",(req,response)=>{
const videourl="https://media.istockphoto.com/id/1407324483/video/abstract-digital-grids-wire-frame-dots-blue-loop-background.mp4?s=mp4-640x640-is&k=20&c=26GOwfuXX9wUccr0Rm1QqDLA08RiDYF-fyVA2_U1m28="
const filePath='video5.mp4'
const fileStream = fs.createWriteStream(filePath);
console.log(fileStream)
https.get(videourl, (videoResponse) => {
    if (videoResponse.statusCode === 200) {
      videoResponse.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => {
          response.send('Video download complete.');
        });
      });
    } else {
      console.error(`Failed to download the video. Status code: ${videoResponse.statusCode}`);
      response.status(videoResponse.statusCode).end();
    }
  }).on('error', (err) => {
    console.error('Error downloading the video:', err);
    response.status(500).end();
  });

})

app.get("/mergevideo",async()=>{
    const urls = [
        'https://pixabay.com/videos/candle-animated-blow-off-party-1437/',
        'https://pixabay.com/videos/atoms-electrons-logo-logo-animation-13232/',
        
      ]
      const req=await Promise.all(urls.map(fetch))
      const streams=reqs.map(req=>req.res)
      const stream=new PassThrough()
      const newvideo=combinestreams(streams,stream).catch((err)=>stream.destroy(err))
      const filePath='video6.mp4'
      const fileStream = fs.createWriteStream(filePath);
      fileStream.pipe(newvideo)
      
})
async function combinestreams(sources, destination) {
    for (const stream of sources) {
      await new Promise((resolve, reject) => {
        stream.pipe(destination, { end: false })
        stream.on('end', resolve)
        stream.on('error', reject)
      })
    }
    destination.emit('end')
  }

app.listen(port,()=>{
    console.log("listening at port 4000")
})