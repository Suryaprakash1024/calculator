import { Component, Input, Renderer2, SimpleChanges } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {

  @Input() size: number = 300;
  @Input() value: number = 50;
  @Input() ringWidth: number = 100;
  @Input() limitData: number[] = [0,25,100];
  @Input() metricLabel: string = "";
  @Input() bestValue: string = "LTB";
  @Input() index: number = 0;
  @Input() innerLabel: string = '';
  @Input() outerLabel: string = '';
  @Input() bottomLabel: string = '';


  gaugemap:any = {};
  range = 360;
  ContainerStyles = {};
  container: any;

  constructor(private renderer: Renderer2) {
    this.size = 300;
    this.value = 50;
    this.ringWidth = 50;
  }

  ngOnInit() {
    this.draw();
    this.ContainerStyles = {
      'width': this.size + 'px'
    };
  }
  getClassName(){
    return 'power-gauge'+this.index;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('limitData' in changes && this.gaugemap && this.gaugemap.update) {
      const powerGauge = document.querySelector('.power-gauge' + this.index);
      if (powerGauge) {
        // Remove all child elements inside the power-gauge element
        while (powerGauge.firstChild) {
          this.renderer.removeChild(powerGauge, powerGauge.firstChild);
        }
      }
      this.gaugemap.update(this.limitData[1]);
    }
  }
  draw() {
    var chartSize = this.size;
    var chartValue = this.value;
    var ringWidth = this.ringWidth;
    var limitData = this.limitData;
    var bestValue = this.bestValue;
    var innerLabel = this.innerLabel;
    var outerLabel = this.outerLabel;
    var bottomLabel = this.bottomLabel;

    var self = this;
    
    var gauge = function (container: any, configuration: any) {
      //Configuration Settings
      var config = {
        size: chartSize,
        clipWidth: chartSize + 15,
        clipHeight: chartSize,
        ringWidth: ringWidth,
        maxValue: 10,
        transitionMs: 4000,
        ringInset: 20,
        pointerWidth: 10,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.85,
        minValue: 0,
        minAngle: -180,
        maxAngle: 180,
        majorTicks: 5,
        labelFormat: d3.format('d'),
        labelInset: 10,
        arcColorFn: d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a'))
      };
      var range: number | undefined = undefined;
      var r: string | number | undefined = undefined;
      var pointerHeadLength: number | undefined = undefined;
      // var value = 0;

      var svg: any | undefined = undefined;
      var arc: any | undefined = undefined;
      var scale: any  | undefined = undefined;
      var ticks = [0, 5, 7, 10];
      var tickData: number[] = [];
      var pointer: any | undefined = undefined;

      // var donut = d3.pie();
      var gaugemap: any = {};

      function deg2rad(deg: number) {
        return deg * Math.PI / 180;
      }


      function configure(configuration: any = {},newValue = null) {
        if(newValue){
          limitData[1]= newValue;
        }
        var prop = "";

        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

        // a linear scale this.gaugemap maps domain values to a percent from 0..1
        scale = d3.scaleLinear()
          .range([0, 1])
          .domain([config.minValue, config.maxValue]);

        ticks = []
        tickData = [];
        limitData.forEach(x => {
          ticks.push(x / 10);
        });
        tickData[0] = (ticks[1] - ticks[0]) / 10;
        tickData[1] = (ticks[2] - ticks[1]) / 10;
        tickData[2] = (ticks[3] - ticks[2]) / 10;

        arc = d3.arc()
          .innerRadius(r - config.ringWidth - config.ringInset)
          .outerRadius(r - config.ringInset)
          .startAngle(function (d: any, i: number) {
            if (i == 0) {
              return deg2rad(-180);
            }
            // else if (i == 1) {
            //   return deg2rad((tickData[0] * 360) - 180);
            // }
            else if (i == 1) {
              return deg2rad(180 - d * 360);
            }
            return 0;
          })
          .endAngle(function (d: any, i: number) {
            if (i == 0) {
              return deg2rad((d * 360) - 180);
            }
            // else if (i == 1) {
            //   return deg2rad(((tickData[0] * 360) - 180) + d * 360);
            // }
            else if (i == 1) {
              return deg2rad(180);
            }
            return 0;
          });
      }


      gaugemap.configure = configure;

      function centerTranslation() {
        r = config.size / 2;
        return 'translate(' + r + ',' + r + ')';
      }

      function isRendered() {
        return (svg !== undefined);
      }

      gaugemap.isRendered = isRendered;

      function render(newValue: any) {
        svg = d3.select(container)
          .append('svg:svg')
          .attr('class', 'gauge')
          .attr('width', config.clipWidth)
          .attr('height', config.clipHeight);

        var centerTx = centerTranslation();
        let r = config.size / 2;
        let pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);
        if (svg)
          var arcs = svg.append('g')
            .attr('class', 'arc')
            .attr('transform', centerTx +' rotate(180)');
        if (bestValue == 'HTB') {
          var colors = ['#b81f2d', '#edd148', '#2bd81f'];
        }
        else if (bestValue == 'LTB') {
          var colors = ['#2bd81f', '#edd148', '#b81f2d'];
        }

        arcs.selectAll('path')
          .data(tickData)
          .enter().append('path')
          .attr('fill', function (d: any, i: number) {
            return colors[i];
          })
          .attr('d', arc);

        if (svg) {
          svg.append('g')
            .attr('class', 'arc')
            .attr('transform', centerTx);
        }

        //Values outside radius, uncomment outerLabel to work
        if (svg){
           var lg = svg.append('g')
            .attr('class', 'label')
            .attr('transform', centerTx)
        }
        lg.selectAll('text')
          .data(ticks)
          .enter().append('text')
          .attr('transform', function (d: any, i: number) {
            var ratio = scale(d);
            var newAngle = config.minAngle + (ratio * 360) ;
            var makeItCenter = -1 * (outerLabel.length * 5 - 5);
            if ((i == 2 && bestValue == 'HTB') || (i == 1 && bestValue == 'LTB')) {
              return 'rotate(' + newAngle + ') translate(' + makeItCenter +',' + (config.labelInset - r) + ')';
            }
            return '';
          })
          .text(function (d: any, i: number) {
            if ((i == 2 && bestValue == 'HTB') || (i == 1 && bestValue == 'LTB')) {
              return outerLabel;
            }
            return ''
          })
          .style("fill", "black").
          style('font-size','13')
          .style("font-weight", "bold");


        // Pointer Values
        // var lineData = [[config.pointerWidth / 2, 0],
        // [0, -pointerHeadLength],
        // [-(config.pointerWidth / 2), 0],
        // [0, config.pointerTailLength],
        // [config.pointerWidth / 2, 0]];
        // var pointerLine = d3.line().curve(d3.curveLinear)
        // if (svg)
        //   var pg = svg.append('g').data([lineData])
        //     .attr('class', 'pointer')
        //     .attr('transform', centerTx)
        //     .style('fill','white')
        //     .style('stroke','black');

        // pointer = pg.append('path')
        //   .attr('d', pointerLine)
        //   .attr('transform', 'rotate(' + config.minAngle + ')');

        //update(newValue === undefined ? 0 : newValue);

        //Middle circle near pointer
        // svg.append("circle")
        //   .attr("cx", r)
        //   .attr("cy", r)
        //   .attr("r", 25)
        //   .style("fill", "#d0d0ce");
        
        //Text inside middle circle
        // svg.append("text")
        //   .attr("x", r)
        //   .attr("y", r)
        //   .attr("text-anchor", "middle")
        //   .attr("alignment-baseline", "middle")
        //   .text(innerLabel)
        //   .style("fill", "#05054b")
        //   .style("font-size", "13")
        //   .style("font-weight", "bold");

       // Last 90 days text
        svg.append("text")
          .attr("x", r)
          .attr("y", r*1.5)
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .text(bottomLabel)
          .style("fill", "#05054b")
          .style("font-size", "17")
          .style("font-weight", "bold");

        //LTB or HTB text  
        // svg.append("text")
        //   .attr("x", bestValue === 'LTB' ? 15 : chartSize - 15)
        //   .attr("y", r*1.5)
        //   .attr("text-anchor", "middle")
        //   .attr("alignment-baseline", "middle")
        //   .text(bestValue)
        //   .style("fill", "#05054b")
        //   .style("font-size", "15")
        //   .style("font-weight", "bold");


        //Do Not Touch, Trignometry here  
        var k = chartSize / 2;
        var l = chartSize / 2;
        var τ = 2 * Math.PI;
        var borderInner = r - config.ringWidth - config.ringInset;
        var borderouter = r - config.ringInset;
        var linedegree = bestValue == 'HTB' ? 180 - tickData[2] * 360 : (tickData[0] * 360) ;
        var start: any = [k + (borderInner * Math.sin((τ * linedegree) / 360)), 
          ((l + borderInner * -Math.cos((τ * linedegree) / 360)))];
        var end:any = [k + ((borderouter) * Math.sin((τ * linedegree) / 360)), 
          ((l + (borderouter) * -Math.cos((τ * linedegree) / 360)))];
        var endLabel:any = [k + ((borderouter +15) * Math.sin((τ * linedegree) / 360)), 
          ((l + (borderouter + 15) * -Math.cos((τ * linedegree) / 360)))];
        //Trigno Ends

        //Black stroke for Green Lower Limit
        var line = d3.line()([start, end]);
        svg.append("path")
          .attr("d", line)
          .style("stroke", "white")
          .style("stroke-width", "2");
        var line2 = d3.line()([[chartSize/2,0],[(chartSize/2),ringWidth+20]]);
        svg.append("path")
          .attr("d", line2)
          .style("stroke", "white")
          .style("stroke-width", "2");
          
        if(chartSize/3 >= endLabel[0] && outerLabel.length >= 3){
          endLabel[0] +=15;
        }
        //Outer label along black stroke  
      //   svg.append("text")
      //     .attr("x", endLabel[0])
      //     .attr("y", endLabel[1])
      //     .attr("text-anchor", "middle")
      //     .attr("alignment-baseline", "middle")
      //     // .attr("class", "zindex")
      //     .text(outerLabel)
      //     .style("fill", "gray")
      //     .style("font-size", "13")
      //     .style("font-weight", "bold")
      //     // .style("z-index","10000");
      }

      
      gaugemap.render = render;
      function update(newValue: any, newConfiguration?: any) {
        // if (newConfiguration !== undefined) {
          if(newValue){
            configure(newConfiguration,newValue);
            render(newValue)
          }
          
        // }
        var ratio = chartValue;
        var newAngle = config.minAngle + (ratio * 360);
        if (pointer)
          pointer.transition()
            .duration(config.transitionMs)
            .ease(d3.easeElastic)
            .attr('transform', 'rotate(' + newAngle + ')');
      }
      gaugemap.update = update;

      configure(configuration);

      return gaugemap;
    };

    setTimeout( (x: any) => {
      var powerGauge = gauge('.power-gauge'+this.index, {
        size: this.size,
        clipWidth: this.size,
        clipHeight: this.size,
        ringWidth: 60,
        maxValue: 10,
        transitionMs: 4000,
      });
      powerGauge.render(this.value);
      this.gaugemap = powerGauge;
    }, 10);
  }
}
interface GaugeMap {
  configure?: any;
  isRendered?: any;
  render?: any;
  update?: any;
}