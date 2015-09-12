function ReadTimeSeries() {

    $('#progressBar').hide();
    $('#chartPage').hide();

    function drawCharts(name, header, data) {

        var mySeries = [];
        for(i=1; i<header.length; i++)
            mySeries.push({
                name: header[i],
                data: data[header[i]]
            });

        $('#chart').highcharts('StockChart', {
            chart: {
                type: 'spline',
                zoomType: 'x'
            },
            title: {
                text: name
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: 'Date'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },
            rangeSelector: {

                buttons: [{
                    type: 'day',
                    count: 3,
                    text: '3d'
                }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 3
            },
            legend: { enabled: true },
            series: mySeries
        });

        $('#progressBar').hide();
        $('#chartPage').show();
    }

    function setProgress(percent) {
        $('#progressBar').attr('class', 'center c100 p'+percent);
        $('#progressBar>span').html(percent+'%');
    }

    function readData(filePath, lineCnt) {
        $('#progressBar').show();
        $('#chartPage').hide();

        var processedLines = 0;
        var percentDone = 0;
        setProgress(0);

        var Transform = require('stream').Transform;
        var csv = require('csv-streamify');

        var transform = new Transform({objectMode: true});
        transform.header = null;
        transform._transform = function(data, encoding, done) {
            if (!this.header) {
                this.header = data;
                this.push(data);
                done();
            } else {
                var record = {};
                for(i=0; i<this.header.length; i++)
                    record[this.header[i]] = data[i];
                this.push(record);
                done();
            }
            processedLines += 1;
            var percent = Math.floor((processedLines/lineCnt)*100);
            if(percentDone != percent)
            {
                percentDone = percent;
                if(percentDone%5 === 0)
                    setProgress(percentDone);
            }
        };
        var csvToJson = csv({objectMode: true});

        var store = new Transform({objectMode: true});
        store.header = null;
        store.buffer = null;
        store._transform = function(data, encoding, done) {
            if(!this.buffer) {
                this.header = data;
                this.buffer = {};
                for(i=1; i < this.header.length; i++)
                    this.buffer[this.header[i]] = [];
                done();
            } else {
                for (i = 1; i < this.header.length; i++)
                    this.buffer[this.header[i]].push([Date.parse(data[this.header[0]]), parseFloat(data[this.header[i]])]);
                done();
            }
        };

        fs.createReadStream(filePath)
            .pipe(csvToJson)
            .pipe(transform)
            .pipe(store)
            .on('finish', function() {
                drawCharts(filePath, this.header, this.buffer);
            })
        ;

    }

    function readDroppedFile() {

        fs = require('fs');
        var dropbox = document.getElementById('dropbox');
        dropbox.addEventListener('dragenter', dragenter, false);
        dropbox.addEventListener('dragover', dragover, false);
        dropbox.addEventListener('drop', drop, false);

        function dragenter(e) {
            e.stopPropagation();
            e.preventDefault();
        }

        function dragover(e) {
            e.stopPropagation();
            e.preventDefault();
        }

        function drop(e) {
            e.stopPropagation();
            e.preventDefault();
            var dt = e.dataTransfer;
            var file = dt.files[0];

            var lineCnt = countLinesSync(file.path);

            readData(file.path, lineCnt);
        }

        function countLinesSync(filePath) {
            var linesWithAtLeastOneNonSpaceCharacterRegex = /.*\S+.*/g;
            var contents = fs.readFileSync(filePath, 'utf8');
            var matches = contents.match(linesWithAtLeastOneNonSpaceCharacterRegex);
            if (matches) {
                return matches.length;
            }
            return 0;
        }
    }

    readDroppedFile();
}

