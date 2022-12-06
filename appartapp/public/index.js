  const input = document.querySelector('input[type="file"]')
  var preview = document.getElementById('preview');
  var filebutton = document.getElementById('filebutton');
  var viewportHeight = window.innerHeight || 
                    document.documentElement.clientHeight || 
                    document.body.clientHeight;
  var viewportWidth = window.innerWidth || 
                    document.documentElement.clientWidth || 
                    document.body.clientWidth;
  var pdfpreview = document.createElement("object");
  var Data ={};

  function createTable(container,headers,matrixelements){
    const tblcontainer = document.getElementById(container);
     //creates table elements
     const tbl = document.createElement("table");
     const tblBody = document.createElement("tbody")
     const tblHead = document.createElement("thead")
     const theadrow = document.createElement("tr")

     for (i in headers){
        var theadercell = document.createElement("td")
         var theadercelltext = document.createTextNode(headers[i])
         theadercell.appendChild(theadercelltext)
         theadrow.appendChild(theadercell)
      }
      tblHead.appendChild(theadrow)
     for (j in matrixelements[0]){
      console.log(j)
      var row = document.createElement("tr")
       for (i in headers){
          var cell = document.createElement("td")
          var cellText = document.createTextNode(matrixelements[i][j])
          cell.appendChild(cellText)
          row.appendChild(cell)
        }
        tblBody.appendChild(row)
       }

     tbl.appendChild(tblHead)
     tbl.appendChild(tblBody)

     tblcontainer.appendChild(tbl)
  }

  function handleFiles (files) {
    console.log(files)
    
    const reader = new FileReader()
  // reader.readAsDataURL(files[0])
  // reader.onloadend = function () {
      
  //     pdfpreview.type = "application/pdf";
  //     pdfpreview.data = reader.result;
  //     pdfpreview.height = viewportHeight;
  //     pdfpreview.width = viewportWidth/1.5;
  //     pdfpreview.style.display = "block";
  //     pdfpreview.style.margin = "auto";
  //     preview.appendChild(pdfpreview);
  //   }
    reader.readAsText(files[0],['ISO-8859-1']);
    reader.onloadend = function () {
      const textfile = reader.result;
      Data = textparserJson(textfile);
    }
  }
  function textparserJson (file){
     //selects table container
     var tablediv = document.getElementById("table-container");
     //creates table elements
     const tbl = document.createElement("table");
     const tblBody = document.createElement("tbody")
     const tblHead = document.createElement("thead")

    var lines = file.split("\n");
    var headers = lines[0].replace("\r","").split("\t");
    var obj = [];
    var locations=[]; 
    var data = {};
    var arrey=[];
    var theadrow = document.createElement("tr")

    for(var i=1;i<lines.length-1;i++){
      var currentline= lines[i].split("\t");
      arrey.push(currentline);
    }
    for (var i=0;i<headers.length;i++){
      var theadercell = document.createElement("td")
      var theadercelltext = document.createTextNode(headers[i])

      theadercell.appendChild(theadercelltext)
      theadrow.appendChild(theadercell)
    }
    for(var i=0;i<arrey.length;i++){
      var row = document.createElement("tr")

      obj[i]={}
      locations[i]={}
      obj[i]["latLng"]={}
      locations[i]["latLng"]={}
        for(var j=0; j<(headers.length);j++){          
        if(headers[j]=="latLng"){
          var temp= arrey[i][j].split(",")
          var lat = temp[0]
          var lng = temp[1]
          obj[i][headers[j]]["lat"]=lat;
          obj[i][headers[j]]["lng"]=lng;
          locations[i][headers[j]]=obj[i][headers[j]]
          } else if(headers[j] == "lat"||headers[j]=="lng"){
            obj[i]["latLng"][headers[j]]=arrey[i][j];
            locations[i]["latLng"][headers[j]]=obj[i]["latLng"][headers[j]]
        } else {
          obj[i][headers[j]]=arrey[i][j]
        }
        var cell = document.createElement("td")
        var cellText = document.createTextNode(arrey[i][j])

        cell.appendChild(cellText)
        row.appendChild(cell)
      }
      tblHead.appendChild(theadrow)
      tblBody.appendChild(row)
      locations[i]["street"]=obj[i].rua
      }
      tbl.appendChild(tblHead)
      tbl.appendChild(tblBody)
      tablediv.appendChild(tbl)
      data["locations"]= locations;
      console.log(data)

      return (data)
    }
 async function sendfileData(){
    const routeType = document.getElementById('routeType');
    const unit = document.getElementById('unit')
    const matrixType = document.getElementById('matrixType')
    matrixTypesres=matrixType.options[matrixType.selectedIndex].value.split(",");

    const options = {};

    options["routeType"]=routeType.options[routeType.selectedIndex].value;
    options["unit"]=unit.options[unit.selectedIndex].value;
    options["manyToOne"]=matrixTypesres[0];
    options["allToAll"]=matrixTypesres[1];

    Data["options"]= options;

    const fetch_options = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(Data)
    };
    let fetch_response = await fetch('/fileapi',fetch_options);
    let fetch_json = await fetch_response.json();
    console.log(fetch_json);
    createTable('tbloutput',['distance','time'],[fetch_json['distance'],fetch_json['time']])
  }
  input.addEventListener('change', function (e) {
    handleFiles(input.files)
  }, false)
  
  document.addEventListener('dragover', function (e) {
    e.preventDefault()
    e.stopPropagation()
  }, false)
  document.addEventListener('drop', function (e) {
    e.preventDefault()
    e.stopPropagation()
    handleFiles(e.dataTransfer.files)
  }, false)

  