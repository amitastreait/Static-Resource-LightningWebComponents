import { LightningElement, track, api } from 'lwc';

import rexourceContainer from '@salesforce/resourceUrl/Resources';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';

export default class LibsChartjs extends LightningElement {
    @track error;
    chart;
    steppedChart;
    @api greeting;
    @api heading;
    @api message;
    chartjsInitialized = false;

    /* generate the URL for the JavaScript, CSS and image file */
    chartjs = rexourceContainer + '/js/chart.js';
    utilJs = rexourceContainer + '/js/utils.js';
    styleCss = rexourceContainer + '/css/style.css';
    einsteinURL = rexourceContainer + '/image/einstein.png';
    astroURL = rexourceContainer + '/image/astro.png';
    codeyURL = rexourceContainer + '/image/codey.png';
    trailheadLWCURL = rexourceContainer + '/image/trailhead.png';

    
    renderedCallback() {
        /*eslint-disable */
        
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;
        Promise.all([
            loadScript(this, this.utilJs),
            loadScript(this, this.chartjs),
            loadStyle(this, this.styleCss)
        ]).then(() => {
            this.generateSteppedChart();
        })
        .catch(error => {
            this.error = error;
            console.log(' Error Occured ', error);
        });
    }
    errorCallback(error, stack) {
        this.error = error;
        console.log(' this.error ', this.error);
    }
    generateSteppedChart(){
        var barChartData = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				label: 'Dataset 1',
				backgroundColor: [
					window.chartColors.red,
					window.chartColors.orange,
					window.chartColors.yellow,
					window.chartColors.green,
					window.chartColors.blue,
					window.chartColors.purple,
					window.chartColors.red
				],
				yAxisID: 'y-axis-1',
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}, {
				label: 'Dataset 2',
				backgroundColor: window.chartColors.grey,
				yAxisID: 'y-axis-2',
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}]
        };
        
        var dataSet = {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Multi Axis'
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                scales: {
                    yAxes: [{
                        type: 'linear', 
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                    }, {
                        type: 'linear', 
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }],
                }
            }
        }
        //document.querySelector
        const ctx = this.template
                    .querySelector('canvas.stepped')
                    .getContext('2d');
        this.steppedChart = new window.Chart(ctx, dataSet);
    }
}