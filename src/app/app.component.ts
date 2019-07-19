import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import 'fabric';
import { Labels } from '../models/label';
declare const fabric: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // selectedLanguage = 1;
  // google: any;
  // languageContents: any;
  // endPoint: String = "lang.json";
  label: any;

  private canvas: any;
  private props: any = {
    canvasFill: '#ffffff',
    canvasImage: '',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: null,
    TextDecoration: ''
  };

  private textString: string;
  private url: string = '';
  private size: any = {
    width: 700,
    height: 500
  };

  private pieTitle;
  private pieColor1;
  private pieColor2;
  private pieLegend1;
  private pieLegend2;

  private stackTitle;
  private stackColor1;
  private stackColor2;
  private stackLegend1;
  private stackLegend2;
  private stackXAxis;
  private stackYAxis;


  private barTitle;
  private barXlabel;
  private barYlabel;
  private barColor;
  private filterName;
  private tableTitle;
  private tableData;

 private horizontalBarTitle;
 private horizontalColor;

  private json: any;
  private globalEditor: boolean = false;
  private textEditor: boolean = false;
  private imageEditor: boolean = false;
  private figureEditor: boolean = false;
  private selected: any;
  private imageNumber;
  private horizontalXAxis;
  private horizontalYAxis;

  constructor() {
    this.pieTitle = "Pie Chart";
    this.pieColor1 = "#20f7f6";
    this.pieColor2 = "#fb4c55";
    this.pieLegend1 = "NNA";
    this.pieLegend2 = "NML";

    this.stackTitle = "Stack Bar";
    this.stackColor1 = "#20f7f6";
    this.stackColor2 = "#fb4c55";
    this.stackLegend1 = "NNA";
    this.stackLegend2 = "NML";
    this.stackXAxis = "Years";
    this.stackYAxis = "Sales";

    this.barTitle ="Bar Chart";
    this.barXlabel="Years";
    this.barYlabel="sales";
    this.barColor="#20f7f6";


    this.filterName="Filter Name";

    this.tableTitle = "Table Heading";
    this.tableData = "xyz";


    this.horizontalBarTitle = "Horizontal Chart";
    this.horizontalXAxis="Years";
    this.horizontalYAxis="Profit";
    this.horizontalColor="#20f7f6";
  }

  ngOnInit() {
    this.imageNumber = 0;
    // this.getContents();
    this.label = new Labels();
    //setup front side canvas
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue'
    });

    this.canvas.on({
      'object:moving': (e) => { },
      'object:modified': (e) => { },
      'object:selected': (e) => {

        let selectedObject = e.target;
        this.selected = selectedObject
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        // selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';

        this.resetPanels();

        if (selectedObject.type !== 'group' && selectedObject) {

          this.getId();
          this.getOpacity();

          switch (selectedObject.type) {
            case 'rect':
            case 'circle':
            case 'triangle':
              this.figureEditor = true;
              this.getFill();
              break;
            case 'i-text':
              this.textEditor = true;
              this.getLineHeight();
              this.getCharSpacing();
              this.getBold();
              this.getFontStyle();
              this.getFill();
              this.getTextDecoration();
              this.getTextAlign();
              this.getFontFamily();
              break;
            case 'image':
              console.log('image');
              break;
          }
        }
      },
      'selection:cleared': (e) => {
        this.selected = null;
        this.resetPanels();
      }
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);

    // get references to the html canvas element & its context
    // this.canvas.on('mouse:down', (e) => {
    // let canvasElement: any = document.getElementById('canvas');
    // console.log(canvasElement)
    // });

  }

  getImage(idname: any) {
    this.imageNumber++;
    var imageId = 'myImage' + this.imageNumber;


    var canvasPreview = document.getElementById(idname) as HTMLCanvasElement;

    var newImg = document.createElement('img');
    newImg.id = imageId;
    //var newImg = new Image();
    newImg.width = 150;
    newImg.height = 150;
    newImg.className = "images-item";
    // imageId.addEventListener("click", (e:Event) => this.getImgPolaroid(newImg));
    //newImg.onclick=this.getImgPolaroid;
    newImg.draggable = true;
    newImg.src = canvasPreview.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");

    console.log(newImg.src);
    //  this.getImgPolaroid(newImg);

    var temp2 = document.getElementById("imagePreview").appendChild(newImg);
    var temp = document.getElementById(imageId);
    temp2.addEventListener("click", (e: Event) => this.getImgPolaroid(newImg));




  }
  /*----------------------------------Filters---------------------------------------------------*/
//   resetCanvas(idName){
//     var width = document.getElementById(idName).clientWidth;
//     var height = document.getElementById(idName).clientHeight;
//     document.getElementById(idName).remove();
//     var canvas = document.createElement('canvas');

//     canvas.id =idName;
//     canvas.width = width;
//     canvas.height = height;
//     document.getElementById('col-8 form-group pl-2 pr-4').appendChild(canvas);
//     // var canvas = document.getElementById('previewCanvas-filter') as HTMLCanvasElement;
//     // var ctx = canvas.getContext("2d");
//     // var i,j;
//     // ctx.fillStyle = "white";
//     // ctx.fillRect(0,0,canvas.width,canvas.height);
//     // ctx.stroke();
    
// }


getTable(){
  
  let rows=7;
  let columns=4;
  var canvas =<HTMLCanvasElement> document.getElementById('previewCanvas-table');
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  var i,j;
  var canvasWidth =canvas.width;
  var canvasHeight =canvas.height;

  var tableHeight = canvasHeight-(canvasHeight/8);
  ctx.rect(0,canvasHeight-tableHeight,canvasWidth,tableHeight);
  ctx.font = "18px Arial";
  this.addTextFilter(ctx,this.tableTitle,0,0,canvasWidth,canvasHeight/9);
  ctx.stroke();
//   ctx.lineWidth="0";
  ctx.font = "14px Arial";
  for(i=0;i<columns;i++){
    for(j=1;j<rows+1;j++){
        ctx.rect(canvasWidth*i/columns,tableHeight*j/rows,canvasWidth/columns,tableHeight/rows);
        this.addTextFilter(ctx,this.tableData,canvasWidth*i/columns,tableHeight*j/rows,canvasWidth/columns,tableHeight/rows);
    }
    
  }

  
  ctx.stroke();
  


}



getDate(){
  //this.resetCanvas('previewCanvas-filter');
   
   
  let rows=7;
    let columns=4;
    
    var canvas = document.getElementById('previewCanvas-date') as HTMLCanvasElement;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var filterimg = new Image();
    filterimg.width=100;
    filterimg.height=60;
    filterimg.src = "assets/img/date2.png";

    //ctx.font = "bold 35px sans-serif";
    //this.addTextFilter(ctx,this.filterName,10,30,100,60);
    

    ctx.drawImage(filterimg,5,30);
    ctx.stroke();

   
 }







  getFilter(){
   //this.resetCanvas('previewCanvas-filter');
    let rows=7;
    let columns=4;
    
    var canvas = document.getElementById('previewCanvas-filter') as HTMLCanvasElement;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var filterimg = new Image();
    filterimg.width=100;
    filterimg.height=60;
     filterimg.src = "assets/img/filter(1).PNG";


     
    //filterimg.src = "assets/img/date2.png";

    ctx.font = "bold 35px sans-serif";
    this.addTextFilter(ctx,this.filterName,10,30,100,60);
    

    ctx.drawImage(filterimg,5,70);
    ctx.stroke();

  //   var canvasWidth =canvas.width/2;
  //   var canvasHeight =canvas.height/2;
  //   var tableHeight = 100;
  
  //   ctx.moveTo(canvasWidth-85, canvasHeight-(canvasHeight/2)-10);
  //   ctx.lineTo(canvasWidth-85, canvasHeight-(canvasHeight/2)+90);
  
  //   ctx.strokeStyle = '#00000';
  //   ctx.stroke();
  //   ctx.lineWidth = 3;
  //   ctx.rect(0,canvasHeight-(canvasHeight/2)+20,canvasWidth,tableHeight-10);
  //   ctx.stroke();
  //   ctx.font = "bold 30px sans-serif";
    
  //   this.addTextFilter(ctx,this.filterName,10,10,canvasWidth-(canvasWidth/3),canvasHeight/1.5);
  //   ctx.stroke();
  
  //   ctx.beginPath();
  // ctx.moveTo(canvasWidth-60, canvasHeight-(canvasHeight/2)+30);
  // ctx.lineTo(canvasWidth-45, canvasHeight-(canvasHeight/2)+50);
  // ctx.lineTo(canvasWidth-30, canvasHeight-(canvasHeight/2)+30);
  // ctx.closePath();
   
  // // the outline
  // ctx.lineWidth = 1;
  // ctx.strokeStyle = '#00000';
  // ctx.stroke();
   
  // // the fill color
  // ctx.fillStyle = "#00000";
  // ctx.fill();
  
  // ctx.font = "bold 50px sans-serif";
  // this.addTextFilter(ctx,"All",canvasWidth/9,canvasHeight/8,canvasWidth-(canvasWidth/6),canvasHeight);
  //   ctx.stroke();
    
    
  }
  
  addTextFilter(con,text,x,y,width,height){
      
    var size = text.length;
    var sizeAdj=24/5;
    var textX=x+width/2-(size*sizeAdj);
    var textY=y+height/2+sizeAdj;
    con.fillText(text,textX,textY);
    
  
  }


  /*-------------------------------------Charts-------------------------------------------------*/

  getPieChart() {
    // let pieTitle=this.pieTitle;


    new Chart(document.getElementById("previewCanvas-piechart"), {
      type: 'pie',
      data: {
        labels: [this.pieLegend1, this.pieLegend2],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: [this.pieColor1, this.pieColor2],
          data: [2478, 5267]
        }]
      },
      options: {
        title: {
          display: true,
          //text: 'Predicted world population (millions) in 2050'
          text: this.pieTitle
        }
      }
    });
  }


  getDoughnutChart() {

    new Chart(document.getElementById("previewCanvas-doughnutchart"), {
      type: 'doughnut',
      data: {
        labels: [this.pieLegend1,this.pieLegend2],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: [this.pieColor1,this.pieColor2],
            data: [2478, 5267]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.pieTitle
        }
      }
    });
  }


  getLineChart(){
  
    var yname=this.stackYAxis;
    var xname=this.stackXAxis;
    var heading_name=this.stackTitle;
    Chart.defaults.global.defaultFontColor = 'black';
    new Chart(document.getElementById("previewCanvas-linechart"), {
        type: 'line',
        data: {
          labels: ["","","","","","","","",""],
          datasets: [{ 
              lineTension: 0,
              data: [2486,3114,3006,4506,3607,3111,4333,4221,5783,3478],
              label: this.stackLegend1,
              borderColor:this.stackColor1,
              fill: false
            }, {
              lineTension: 0, 
              data: [2282,2590,3411,4202,3235,3109,4000,4002,5000,3267],
              label:this.stackLegend2,
              borderColor: this.stackColor2,
              fill: false
            }
          ]
        },
        options: {  
          
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                fontSize:14,
                fontStyle: 'bold',
                labelString: yname,
              },
              gridLines:{
                display:false,
                color:"#000000",
              lineWidth:4,
              
              
              }
            }],
            xAxes: [{
                  
                    gridLines:{
                      display:false,
                      color:"#000000",
                    lineWidth:4,
                    
                    
                    },
                    scaleLabel:{
                        fontSize:14,
                        fontStyle: 'bold',
                        display:true,
                        labelString: xname
        
                    }
                }]
            
        
          }     ,
         
          title: {
            display: true,
            fontSize:18,
            text:heading_name 
          }
        }
      });
    




}







  getBarChart() {
    console.log("Inside BarCHart()_");
    var yname = this.barYlabel;
    var xname = this.barXlabel;
    var heading_name =this.barTitle;
    new Chart(document.getElementById("previewCanvas-barchart"), {
      type: 'bar',
      data: {
        labels: ["", "", "", "", ""],

        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: [this.barColor,this.barColor, this.barColor,this.barColor],
            data: [4078, 5267, 3734, 3484]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              fontSize: 14,
              fontStyle: 'bold',
              labelString: yname,
            },
            gridLines: {
              display: false,
              lineWidth: 1,
              color: "#131c2b"
            }
          }],
          xAxes: [{

            categoryPercentage: 1.0,
            barPercentage: 1.0,
            barThickness: 36,
            maxBarThickness: 40,
            minBarLength: 1,
            gridLines: {
              display: false,
              lineWidth: 1,
              color: "#131c2b"
            },
            scaleLabel: {
              fontSize: 14,
              fontStyle: 'bold',
              display: true,
              labelString: xname

            },

          }]


        },
        legend: { display: false },
        title: {
          fontSize: 18,
          fontStyle: 'bold',
          display: true,
          text: heading_name
        }
      }
    });
  }

 
  getStackedBarChart(){
    
    var yname=this.stackYAxis;
        var xname=this.stackXAxis;
    Chart.defaults.global.defaultFontColor = 'black';
    new Chart(document.getElementById("previewCanvas-StackedBar"), {
      type: 'bar',
      data: {
        labels: ["", "", "", "", "", ""],
        datasets: [{
            label:this.stackLegend1,
            data: [10, 19, 3, 5, 2, 3],
            backgroundColor: [this.stackColor1,this.stackColor1,this.stackColor1,this.stackColor1,this.stackColor1,this.stackColor1],
            
          },
          {
            label: this.stackLegend2,
            data: [15, 19, 3, 5, 2, 3],
            backgroundColor: [this.stackColor2,this.stackColor2,this.stackColor2,this.stackColor2,this.stackColor2,this.stackColor2],
            
          }
        ]
      },
      options: {
    
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            },
            gridLines:{
              display:false,
              color:"#000000",
            lineWidth:4,     
            },
            scaleLabel:{
              fontSize:14,
              fontStyle: 'bold',
              display:true,
              labelString: yname
    
          }
           
          }],
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            },
            gridLines:{
              display:false,
              color:"#000000",
            lineWidth:4,     
            },
            scaleLabel:{
              fontSize:14,
              fontStyle: 'bold',
              display:true,
              labelString: xname
    
          }
          }]
    
        },
        title: {
          display: true,
          text: this.stackTitle,
          fontSize:18
        }
      }
    });
    
    }
    











  getHorizontalBarChart(){
    
      var yname=this.horizontalYAxis;
      var xname=this.horizontalXAxis;
      var heading_name=this.horizontalBarTitle;
      Chart.defaults.global.defaultFontColor = 'black';
    new Chart(document.getElementById("previewCanvas-horizontalBarChart"), {
      type: 'horizontalBar',
      data: {
        labels: ["", "", "", "", ""],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: [this.horizontalColor,this.horizontalColor,this.horizontalColor,this.horizontalColor,this.horizontalColor],
            data: [2478,5267,734,784,433]
            
          }
        ]
      },
      options: {
        scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          fontSize:14,
          fontStyle: 'bold',
          labelString: yname,
        },
        gridLines:{
          display:false,
          color:"#000000",
        lineWidth:4,
        
        
        }
      }],
      xAxes: [{
              categoryPercentage: 1.0,
              barPercentage: 1.0,
              barThickness: 36,
              maxBarThickness: 40,
              minBarLength:1,
              gridLines:{
                display:false,
                color:"#000000",
              lineWidth:4,
              
              
              },
              scaleLabel:{
                  fontSize:14,
                  fontStyle: 'bold',
                  display:true,
                  labelString: xname
  
              }
          }]
      
  
    }     ,
        legend: { display: false },
        title: {
          fontSize: 18,
          fontStyle: 'bold',
          display: true,
          text:heading_name
        }
      }
  });
  }
  
  getGroupedBarChart(){
    
    var yname=this.stackYAxis;
    var xname=this.stackXAxis;
    Chart.defaults.global.defaultFontColor = 'black';
    new Chart(document.getElementById("previewCanvas-groupedBarChart"), {
      type: 'bar',
      data: {
        labels: ["", "", "", "", "", ""],
        datasets: [{
            label: this.stackLegend1,
            data: [10, 19, 3, 5, 2, 3],
            backgroundColor: [this.stackColor1,this.stackColor1,this.stackColor1,this.stackColor1,this.stackColor1,this.stackColor1],
            
          },
          {
            label: this.stackLegend2,
            data: [15, 19, 2, 8, 7, 3],
            backgroundColor: [this.stackColor2,this.stackColor2,this.stackColor2,this.stackColor2,this.stackColor2,this.stackColor2],
            
          }
        ]
      },
      options: {
    
        scales: {
          yAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true
            },
            gridLines:{
              display:false,
              color:"#000000",
            lineWidth:4,
            
            
            },
          
            scaleLabel:{
              fontSize:14,
              fontStyle: 'bold',
              display:true,
              labelString: yname
    
          }
          }],
          xAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true
            },
            gridLines:{
              display:false,
              color:"#000000",
            lineWidth:4,
            
            
            },
          
            scaleLabel:{
              fontSize:14,
              fontStyle: 'bold',
              display:true,
              labelString: xname
    
          }
          }]
    
        },
        title: {
          display: true,
          fontSize:18,
          text:this.stackTitle
        }
      }
    });
    
    }
    
    getAreaChart(){
      
      var yname=this.stackYAxis;
      var xname=this.stackXAxis;
      var heading_name=this.stackTitle;
      Chart.defaults.global.defaultFontColor = 'black';
      new Chart(document.getElementById("previewCanvas-areaChart"), {
          type: 'line',
          data: {
            labels: [,,,,,,,,,],
            datasets: [{ 
                lineTension: 0,
                data: [1200,1000,1006,1006,1207,1311,1333,1221,3700],
                label: this.stackLegend1,
                borderColor: this.stackColor1,
                backgroundColor:this.stackColor1,
                fill: true
              }, {
                lineTension: 0, 
                data: [1500,2350,2350,2350,2335,2369,2347,2002,4700],
                label: this.stackLegend2,
                borderColor:this.stackColor2,
                backgroundColor:this.stackColor2,
                fill: true
              }
            ]
          },
          options: {
    
            scales: {
              yAxes: [{
    
                gridLines:{
                  display:false,
                  color:"#000000",
                lineWidth:4,
                
                
                },
              
                scaleLabel:{
                  fontSize:14,
                  fontStyle: 'bold',
                  display:true,
                  labelString: yname
        
              },
              ticks:{
                beginAtZero:true
              }
               
              }],
              xAxes: [{
                
                gridLines:{
                  display:false,
                  color:"#000000",
                lineWidth:4,
                
                
                },
              
                scaleLabel:{
                  fontSize:14,
                  fontStyle: 'bold',
                  display:true,
                  labelString: xname
        
              }
              }]
            },
            title: {
              display: true,
              fontSize:18,
              text:heading_name 
            }
          }
        });
      
    
    
    
    
    }

  
    getMixedChart(){
      
      var yname=this.stackYAxis;
      var xname=this.stackXAxis;
      var heading_name=this.stackTitle;
      Chart.defaults.global.defaultFontColor = 'black';
      new Chart(document.getElementById("previewCanvas-mixedChart"), {
        type: 'bar',
        data: {
          labels: ["", "", "", ""],
          datasets: [{
            
              label: this.stackLegend1,
              type: "line",
              lineTension: 0,
              borderColor: this.stackColor1,
              data: [308,447,375,734],
              fill: false
            },  {
              label:this.stackLegend2,
              type: "bar",
              backgroundColor:this.stackColor2,
              data: [408,547,675,734],
            }
          ]
        },
        options: {
      
          scales: {
            yAxes: [{
      
              gridLines:{
                display:false,
                color:"#000000",
              lineWidth:4,
              
              
              },
            
              scaleLabel:{
                fontSize:14,
                fontStyle: 'bold',
                display:true,
                labelString: yname
      
            },
            ticks:{
              beginAtZero:true
            }
             
            }],
            xAxes: [{
              
              gridLines:{
                display:false,
                color:"#000000",
              lineWidth:4,
              
              
              },
            
              scaleLabel:{
                fontSize:14,
                fontStyle: 'bold',
                display:true,
                labelString: xname
      
            }
            }]
          },
      
          title: {
            display: true,
            fontSize:18,
            text:heading_name
          },
          legend: { display: false }
        }
        
      });
      
      
      }

      



  /*-------------------------Charts End-----------------------------*/

  addBackOnCanvas(url) {
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornersize: 10,
          hasRotatingPoint: true,
          selectable: false
        });
        image.setWidth(this.canvas.width);
        image.setHeight(this.canvas.height);
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }

  chosenMod: string = "";

  modo() {
    switch (this.chosenMod) {
      case "nml": {
        this.url = "assets/img/NML_template.png"
        this.addBackOnCanvas(this.url)
        break;
      }
      case "ne": {
        this.url = "assets/img/NE_template.png"
        this.addBackOnCanvas(this.url)
        break;
      }
      case "nna": {
        this.url = "assets/img/NNA_template.png"
        this.addBackOnCanvas(this.url)
        break;
      }
    }
  }

  /*------------------------Block elements------------------------*/

  //Block "Size"

  changeSize(event: any) {
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  //Block "Add text"

  addText() {
    let textString = this.textString;
    console.log(textString);
    let text = new fabric.IText(textString, {
      left: 10,
      top: 10,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true
    });
    this.extend(text, this.randomId());
    this.canvas.add(text);
    this.selectItemAfterAdded(text);
    this.textString = '';
  }

  //Block "Add images"

  getImgPolaroid(el) {
    console.log(event);
    // let el = event.target;
    fabric.Image.fromURL(el.getAttribute("src"), (image) => {
      image.set({
        left: 10,
        top: 10,
        angle: 0,
        padding: 10,
        cornersize: 10,
        hasRotatingPoint: true,
        peloas: 12
      });
      image.setWidth(150);
      image.setHeight(150);
      image.set
      console.log(this);
      this.extend(image, Math.floor(Math.random() * 999999) + 1);
      this.canvas.add(image);
      this.selectItemAfterAdded(image);
    });
  }

  //Block "Upload Image"

  addImageOnCanvas(url) {
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornersize: 10,
          hasRotatingPoint: true
        });
        image.setWidth(200);
        image.setHeight(200);
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        this.url = event.target['result'];
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeWhite(url) {
    this.url = '';
  };

  //Block "Add figure"

  addFigure(figure) {
    let add: any;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200, height: 100, left: 10, top: 10, angle: 0,
          fill: '#3f51b5'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: 10, top: 10, angle: 0,
          fill: '#4caf50'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100, height: 100, left: 10, top: 10, fill: '#2196f3'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: 10, top: 10, fill: '#ff5722'
        });
        break;
    }
    this.extend(add, this.randomId());
    this.canvas.add(add);
    this.selectItemAfterAdded(add);
  }

  /*Canvas*/

  cleanSelect() {
    this.canvas.deactivateAllWithDispatch().renderAll();
  }

  selectItemAfterAdded(obj) {
    this.canvas.deactivateAllWithDispatch().renderAll();
    this.canvas.setActiveObject(obj);
  }

  setCanvasFill() {
    if (!this.props.canvasImage) {
      this.canvas.backgroundColor = this.props.canvasFill;
      this.canvas.renderAll();
    }
  }

  extend(obj, id) {
    obj.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: id
        });
      };
    })(obj.toObject);
  }

  setCanvasImage() {
    let self = this;
    if (this.props.canvasImage) {
      this.canvas.setBackgroundColor({ source: this.props.canvasImage, repeat: 'repeat' }, function () {
        // self.props.canvasFill = '';
        self.canvas.renderAll();
      });
    }
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  /*------------------------Global actions for element------------------------*/

  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
  }


  setActiveStyle(styleName, value, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return;

    if (object.setSelectionStyles && object.isEditing) {
      var style = {};
      style[styleName] = value;
      object.setSelectionStyles(style);
      object.setCoords();
    }
    else {
      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }


  getActiveProp(name) {
    var object = this.canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
  }

  setActiveProp(name, value) {
    var object = this.canvas.getActiveObject();
    if (!object) return;
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  clone() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({ left: 10, top: 10 });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  getId() {
    this.props.id = this.canvas.getActiveObject().toObject().id;
  }

  setId() {
    let val = this.props.id;
    let complete = this.canvas.getActiveObject().toObject();
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = val;
      return complete;
    };
  }

  getOpacity() {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  setOpacity() {
    this.setActiveStyle('opacity', parseInt(this.props.opacity) / 100, null);
  }

  getFill() {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  setFill() {
    this.setActiveStyle('fill', this.props.fill, null);
  }

  getLineHeight() {
    this.props.lineHeight = this.getActiveStyle('lineHeight', null);
  }

  setLineHeight() {
    this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
  }

  getCharSpacing() {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  setCharSpacing() {
    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }

  getFontSize() {
    this.props.fontSize = this.getActiveStyle('fontSize', null);
  }

  setFontSize() {
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize), null);
  }

  getBold() {
    this.props.fontWeight = this.getActiveStyle('fontWeight', null);
  }

  setBold() {
    this.props.fontWeight = !this.props.fontWeight;
    this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
  }

  getFontStyle() {
    this.props.fontStyle = this.getActiveStyle('fontStyle', null);
  }

  setFontStyle() {
    this.props.fontStyle = !this.props.fontStyle;
    this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
  }


  getTextDecoration() {
    this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
  }

  setTextDecoration(value) {
    let iclass = this.props.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, "g"), "");
    } else {
      iclass += ` ${value}`
    }
    this.props.TextDecoration = iclass;
    this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
  }

  hasTextDecoration(value) {
    return this.props.TextDecoration.includes(value);
  }


  getTextAlign() {
    this.props.textAlign = this.getActiveProp('textAlign');
  }

  setTextAlign(value) {
    this.props.textAlign = value;
    this.setActiveProp('textAlign', this.props.textAlign);
  }

  getFontFamily() {
    this.props.fontFamily = this.getActiveProp('fontFamily');
  }

  setFontFamily() {
    this.setActiveProp('fontFamily', this.props.fontFamily);
  }

  /*System*/


  removeSelected() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      let self = this;
      objectsInGroup.forEach(function (object) {
        self.canvas.remove(object);
      });
    }
  }

  bringToFront() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      activeObject.bringToFront();
      // activeObject.opacity = 1;
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.bringToFront();
      });
    }
  }

  sendToBack() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      activeObject.sendToBack();
      // activeObject.opacity = 1;
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.sendToBack();
      });
    }
  }

  confirmClear() {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
    }
  }

  rasterize() {
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
      console.log(this.canvas.toDataURL('png'))
      //window.open(this.canvas.toDataURL('png'));
      // var image = new Image();
      // image.src = this.canvas.toDataURL('png')
      // var w = window.open("");
      // w.document.write(image.outerHTML);
      var image = new Image();
      // image.src = this.canvas.toDataURL('png')
      // var w = window.open("");
      // w.document.write(image.outerHTML);
      image.src = this.canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
      var link = document.createElement('a');
      link.download = "my-image.png";
      link.href = image.src;
      link.click();
    }
  }

  rasterizeSVG() {
    console.log(this.canvas.toSVG())
    // window.open(
    //   'data:image/svg+xml;utf8,' +
    //   encodeURIComponent(this.canvas.toSVG()));
    // console.log(this.canvas.toSVG())
    // var image = new Image();
    // image.src = this.canvas.toSVG()
    var w = window.open("");
    w.document.write(this.canvas.toSVG());
  };


  saveCanvasToJSON() {
    let json = JSON.stringify(this.canvas);
    localStorage.setItem('Kanvas', json);
    console.log('json');
    console.log(json);

  }

  loadCanvasFromJSON() {
    let CANVAS = localStorage.getItem('Kanvas');
    console.log('CANVAS');
    console.log(CANVAS);

    // and load everything from the same json
    this.canvas.loadFromJSON(CANVAS, () => {
      console.log('CANVAS untar');
      console.log(CANVAS);

      // making sure to render canvas at the end
      this.canvas.renderAll();

      // and checking if object's "name" is preserved
      console.log('this.canvas.item(0).name');
      console.log(this.canvas);
    });

  };

  rasterizeJSON() {
    this.json = JSON.stringify(this.canvas, null, 2);
  }

  resetPanels() {
    this.textEditor = false;
    this.imageEditor = false;
    this.figureEditor = false;
  }

}
