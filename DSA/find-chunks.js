function findChunks(lines){
    const line=lines[0];
    const chunkMaxLength=parseInt(lines[1]);
    const chunkMinLength=7;
    
    const lineArr=line.split(' ');
    let wordCount=0;
    const chunkArr=[];
    let count=chunkMinLength;
    let chunk='';
    while(wordCount < lineArr.length){
        const wordLength=lineArr[wordCount].length;
        count+=wordLength;
        if(count <= chunkMaxLength){
            chunk+=' '+lineArr[wordCount];
            wordCount++;
        }
        else{
          chunk.trim();
            chunkArr.push(chunk);
            chunk='';
            count=chunkMinLength;
        }
    }
    if(!chunkArr.includes(lineArr[lineArr.length-1])){
      chunkArr.push(lineArr[lineArr.length-1])
    }
    const totalChunks=chunkArr.length;
    const newArr=[];
    for(let i=0;i<totalChunks;i++){
        const str='['+(i+1)+'/'+totalChunks+']: '+chunkArr[i];
        newArr.push(str);
    }
    return chunkArr;
}

console.log(findChunks(['It is an amazing experience to give tests on DoSelect!!',17]));