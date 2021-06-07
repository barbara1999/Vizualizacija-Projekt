// set the dimensions and margins of the graph

// var data = [{"Županije": "Zagrebačka","Površina": 3060,"Gradovi": 8,"Općine": 26,"Naselja": 697},
// {"Županije": "Krapinsko-zagorska ","Površina": 1229,"Gradovi": 7,"Općine": 25,"Naselja": 423},
// {"Županije": "Sisačko-moslavačka ","Površina": 4468,"Gradovi": 6,"Općine": 13,"Naselja": 456},
// {"Županije": "Karlovačka ","Površina": 3626,"Gradovi": 5,"Općine": 16,"Naselja": 649},
// {"Županije": "Varaždinska ","Površina": 1262,"Gradovi": 6,"Općine": 22,"Naselja": 301},
// {"Županije": "Koprivničko-križevačka ","Površina": 1748,"Gradovi": 3,"Općine": 22,"Naselja": 264},
// {"Županije": "Bjelovarsko-bilogorska ","Površina": 2640,"Gradovi": 5,"Općine": 18,"Naselja": 323},
// {"Županije": "Primorsko-goranska ","Površina": 3588,"Gradovi": 14,"Općine": 21,"Naselja": 536},
// {"Županije": "Ličko-senjska ","Površina": 5353,"Gradovi": 4,"Općine": 8,"Naselja": 252},
// {"Županije": "Virovitičko-podravska ","Površina": 2024,"Gradovi": 3,"Općine": 13,"Naselja": 190},
// {"Županije": "Požeško-slavonska ","Površina": 1823,"Gradovi": 4,"Općine": 6,"Naselja": 277},
// {"Županije": "Brodsko-posavska ","Površina": 2030,"Gradovi": 2,"Općine": 26,"Naselja": 185},
// {"Županije": "Zadarska ","Površina": 3646,"Gradovi": 6,"Općine": 26,"Naselja": 221},
// {"Županije": "Osječko-baranjska ","Površina": 4155,"Gradovi": 7,"Općine": 35,"Naselja": 264},
// {"Županije": "Šibensko-kninska ","Površina": 2984,"Gradovi": 5,"Općine": 13,"Naselja": 196},
// {"Županije": "Vukovarsko-srijemska ","Površina": 2454,"Gradovi": 4,"Općine": 26,"Naselja": 85},
// {"Županije": "Splitsko-dalmatinska ","Površina": 4540,"Gradovi": 16,"Općine": 39,"Naselja": 367},
// {"Županije": "Istarska ","Površina": 2813,"Gradovi": 9,"Općine": 30,"Naselja": 648},
// {"Županije": "Dubrovačko-neretvanska ","Površina": 1781,"Gradovi": 5,"Općine": 17,"Naselja": 227},
// {"Županije": "Međimurska ","Površina": 729,"Gradovi": 3,"Općine": 21,"Naselja": 128},
// {"Županije": "Grad Zagreb","Površina": 641,"Gradovi": 1,"Općine": 0,"Naselja": 70}];


//Broj općina po županijama i broj gradova po županijama


var margin = {top: 20, right: 50, bottom: 40, left: 180},
    width = 800 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg1 = d3.select(".community-barchart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

var svg2=d3.select(".city-barchart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("county.csv", function(data) {

  // Add X axis
  var x1 = d3.scaleLinear()
    .domain([0, 40])
    .range([ 0, width]);

  var x2=d3.scaleLinear()
    .domain([0,17])
    .range([0,width]);

  svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x1))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-family","Roboto")
      .style("font-size","15px");

  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x2))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-family","Roboto")
      .style("font-size","15px");

  // Y axis
  var y1 = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.Županije; }))
    .padding(.15);

  svg1.append("g")
    .call(d3.axisLeft(y1))
    .selectAll("text")
        .style("font-size","15px")
        .style("text-anchor", "end")
        .style("font-family","Roboto");

  svg2.append("g")
    .call(d3.axisLeft(y1))
    .selectAll("text")
      .style("font-size","15px")
      .style("text-anchor", "end")
      .style("font-family","Roboto");

  //Bars
  svg1.selectAll("myRect1")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d){return 1.5})
    .attr("y", function(d) { return y1(d.Županije); })
    .attr("width", 0 )
    .attr("height", y1.bandwidth() )
    .attr("fill", "#A8DADC");
  

    svg1
      .selectAll("rect")
      .transition()
      .duration(5000)
      .attr("x",1,5)
      .attr("width",function(d){return x1(d.Općine)})
      .delay(function(d,i){return (i*100)})

    svg2.selectAll("myRect2")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d){return 1.5})
      .attr("y", function(d) { return y1(d.Županije); })
      .attr("width", 0 )
      .attr("height", y1.bandwidth() )
      .attr("fill", "#A8DADC");
  
      svg2
        .selectAll("rect")
        .transition()
        .duration(5000)
        .attr("x",1,5)
        .attr("width",function(d){return x2(d.Gradovi)})
        .delay(function(d,i){return (i*100)})
    
    
})

function changeColor(color){
  d3.selectAll("rect")
    .transition()
    .duration(2000)
    .style("fill", color)
}

//Migracije OBŽ

var svg3 = d3.select("#migration-OBZ")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

d3.csv("doseljenistvo.csv", function(data) {
  var subgroups = data.columns.slice(1)
  var groups = d3.map(data, function(d){return(d.year)}).keys()

  var x3 = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])

  svg3.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x3).tickSize(0))
    .selectAll("text")
      .style("font-family","Roboto")
      .style("font-size","15px");
      

  var y3 = d3.scaleLinear()
    .domain([0, 140000])
    .range([ height, 0 ]);

  svg3.append("g")
    .call(d3.axisLeft(y3))
    .selectAll("text")
      .style("font-family","Roboto")
      .style("font-size","15px");

  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x3.bandwidth()])
    .padding([0.05])

  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#2A9D8F','#E76F51'])

  svg3.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x3(d.year) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y3(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - y3(d.value); })
      .attr("fill", function(d) { return color(d.key); });

 
      svg3.append("circle").attr("cx",100).attr("cy",30).attr("r", 6).style("fill", "#2A9D8F")
      svg3.append("circle").attr("cx",100).attr("cy",60).attr("r", 6).style("fill", "#E76F51")
      svg3.append("text").attr("x", 120).attr("y", 30).text("doseljeno").style("font-size", "15px").attr("alignment-baseline","middle")
      svg3.append("text").attr("x", 120).attr("y", 60).text("iseljeno").style("font-size", "15px").attr("alignment-baseline","middle")
  })

//KARTA 
var width_cro = 960;
var height_cro = 700;

var projection = d3.geo.mercator()
  .center([0, 10])
  .scale(6000)
  .translate([17600, 4500])
  .rotate([-180, 0]);

var colors =["#ffcccc","#ff7f7f","#ff4c4c","#cc0000","#7f0000","#4c0000"];

var skala=d3.scale.linear()
  .domain([52000,800000])
  .range([0,5]);    
        
var path = d3.geo.path()
 	  .projection(projection);

var svg_cro = d3.select(".cro").append("svg")
  .attr("width", width_cro)
  .attr("height", height_cro)
  .style("background", "white");

d3.select(".cro")
  .append("div")
  .attr("id", "name");


  svg_cro.append("circle").attr("cx",100).attr("cy",530).attr("r", 6).style("fill", "#4c0000")
  svg_cro.append("circle").attr("cx",100).attr("cy",560).attr("r", 6).style("fill", "#7f0000")
  svg_cro.append("circle").attr("cx",100).attr("cy",590).attr("r", 6).style("fill", "#cc0000")
  svg_cro.append("circle").attr("cx",100).attr("cy",620).attr("r", 6).style("fill", "#ff4c4c")
  svg_cro.append("circle").attr("cx",100).attr("cy",650).attr("r", 6).style("fill", "#ff7f7f")

  svg_cro.append("text").attr("x", 120).attr("y", 530).text("više od 800 000").style("font-size", "16px").attr("alignment-baseline","middle").style("font-family","Roboto")
  svg_cro.append("text").attr("x", 120).attr("y", 560).text("do 500 0000").style("font-size", "16px").attr("alignment-baseline","middle").style("font-family","Roboto")
  svg_cro.append("text").attr("x", 120).attr("y", 590).text("do 330 000").style("font-size", "16px").attr("alignment-baseline","middle").style("font-family","Roboto")
  svg_cro.append("text").attr("x", 120).attr("y", 620).text("do 210 000").style("font-size", "16px").attr("alignment-baseline","middle").style("font-family","Roboto")
  svg_cro.append("text").attr("x", 120).attr("y", 650).text("do 130 000").style("font-size", "16px").attr("alignment-baseline","middle").style("font-family","Roboto")
//GRAPH-CRO

var margin_cro_graph = {top: 30, right: 30, bottom: 30, left: 60}
var width_cro_graph = 600 - margin_cro_graph.left - margin_cro_graph.right
var height_cro_graph = 500 - margin_cro_graph.top - margin_cro_graph.bottom;

// append the svg object to the body of the page
var svg_c = d3.select(".cro-graph")
  .append("svg")
    .attr("width", width_cro_graph + margin_cro_graph.left + margin_cro_graph.right)
    .attr("height", height_cro_graph + margin_cro_graph.top + margin_cro_graph.bottom)
  .append("g")
    .attr("transform","translate(" + margin_cro_graph.left + "," + margin_cro_graph.top + ")");

var x_c = d3.scaleBand()
    .range([ 0, width_cro_graph ])
    .padding(0.2);
var xAxis = svg_c.append("g")
    .attr("transform", "translate(0," + height_cro_graph + ")")

// Initialize the Y axis
var y_c = d3.scaleLinear()
  .range([ height_cro_graph, 0]);
var yAxis = svg_c.append("g")
  .attr("class", "myYaxis")

  function update(selectedVar) {

    // Parse the Data
    d3.csv("fertility.csv", function(data) {
  
      // X axis
      x_c.domain(data.map(function(d) { return d.Godina; }))
      xAxis
        .transition()
        .duration(1000)
        .call(d3.axisBottom(x_c))
        .style("font-family","Roboto")
        .style("font-size","15px");

  
      // Add Y axis
      y_c.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
      yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y_c))
        .style("font-family","Roboto")
        .style("font-size","15px");

  
      // variable u: map data to existing bars
      var u = svg_c.selectAll("rect")
        .data(data)
     
  
      // update bars
      u
        .enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
          .attr("x", function(d) { return x_c(d.Godina); })
          .attr("y", function(d) { return y_c(d[selectedVar]); })
          .attr("width", x_c.bandwidth())
          .attr("height", function(d) { return height_cro_graph - y_c(d[selectedVar]); })
          .attr("fill", function(d,i){
            var colors_graph=d3.scaleOrdinal()
              .domain([0,1,2,3,4,5])
              .range(["#264653","#2A9D8F","#E9C46A","#F4A261","#E76F51","#A8DADC"])
            return colors_graph(i);
          })
          
    })
  
  }
  

d3.json("croatia.json", function(error, cro) {

  var data_cro = topojson.feature(cro, cro.objects.layer1);
  var states = svg_cro.selectAll("path.county")
  	.data(data_cro.features)
  	.enter()
  	.append("path")
    .attr("class", "county")
  	.attr("id", function(d) { return d.id; })
  	.attr("d", path) 
    .style("fill", function(d){
      var value=Math.round(skala(d.properties.stanovnistvo));
      return colors[value]
    })
  	.style("stroke", "gray")
  	.style("stroke-width", 1)
  	.style("stroke-opacity", 1)
  	.on("mouseover", function(d) {
      document.getElementById("title").innerHTML="Vitalna statistika"
      var zupanija=d.properties.name
      document.getElementById("graph-title").innerHTML=zupanija
      update(zupanija)
  	    });
  	});

//AREA

var margin_area = {top: 10, right: 10, bottom: 10, left: 10}
var width_area = 1000 - margin_area.left - margin_area.right
var height_area = 800 - margin_area.top - margin_area.bottom;
      
// append the svg object to the body of the page
var svg_area = d3.select("#area")
  .append("svg")
  .attr("width", width_area + margin_area.left + margin_area.right)
  .attr("height", height_area + margin_area.top + margin_area.bottom)
  .append("g")
  .attr("transform","translate(" + margin_area.left + "," + margin_area.top + ")");
      
// read json data
d3.json("area.json", function(data) {
      
// Give the data to this cluster layout:
var root = d3.hierarchy(data).sum(function(d){ return d.value}) // Here the size of each leave is given in the 'value' field in input data
      
// Then d3.treemap computes the position of each element of the hierarchy
d3.treemap()
  .size([width_area, height_area])
  .paddingTop(28)
  .paddingRight(7)
  .paddingInner(4)
  (root)


var color = d3.scaleOrdinal()
  .domain(["Zapadna", "Istocna", "Sredisnja","Sjeverna","Juzna"])
  .range([ "#264653", "#2A9D8F", "#E9C46A","#F4A261","#2b7eba"]);

var opacity = d3.scaleLinear()
  .domain([640, 4000])
  .range([.5,1])

         
var tooltip = d3.select('body')
  .append('div')
  .style('position', 'absolute')
  .style('z-index', '10')
  .style('visibility', 'hidden')
  .style('border', 'solid')
  .style('border-color',"#f9d6bf")
  .style('border-width', '2px')
  .style('border-radius', '5px')
  .style("background-color","#fcf6f2")
  .style("text-color","#323232")
  .style('padding', '5px');
  
var mouseover = function(d) {
  tooltip.style('visibility', 'visible'); 
  }

var mousemove = function(d) {
  d3.select(this)
    .style("stroke","none")
  var county = d.data.name;
  var area = d.data.value;
  return tooltip
    .html("Županija: " + county + "<br>" + "Površina: " + area +"m2")
    .style('top', d3.event.pageY - 10 + 'px')
    .style("color","#333333")
    .style("font-size","20px")
    .style("border","3px")
    .style('left', d3.event.pageX + 10 + 'px');
  }

var mouseleave = function(d) {
  d3.select(this)
    .style("stroke","black")
  tooltip.style('visibility', 'hidden');
  }
      
// use this information to add rectangles:
svg_area
  .selectAll("rect")
  .data(root.leaves())
  .enter()
  .append("rect")
  .attr('x', function (d) { return d.x0; })
  .attr('y', function (d) { return d.y0; })
  .attr('width', function (d) { return d.x1 - d.x0; })
  .attr('height', function (d) { return d.y1 - d.y0; })
  .style("stroke", "black")
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)
  .attr("class","example")
  .style("fill", function(d){return color(d.parent.data.name)})
  .style("opacity", function(d){ return opacity(d.data.value)})  
            
// and to add the text labels
svg_area
  .selectAll("text")
  .data(root.leaves())
  .enter()
  .append("text")
  .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
  .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
  .text(function(d){ return d.data.name })
  .attr("font-size", "15px")
  .attr("overflow-wrap","break-word")
  .attr("word-break","normal")
  .attr("fill", "white");

svg_area
  .selectAll("titles")
  .data(root.descendants().filter(function(d){return d.depth==1}))
  .enter()
  .append("text")
  .attr("x", function(d){ return d.x0})
  .attr("y", function(d){ return d.y0+21})
  .text(function(d){ return d.data.name })
  .attr("font-size", "25px")
  .attr("fill",  function(d){ return color(d.data.name)} )
  
 })

      
  
