# time-series-reader-nw #
## Simple time series reader written in nodejs (node-webkit) plotting chart from csv time series data using Highstocks (Highcharts)
### Version
0.3.0

### Dependencies
* [node-webkit](https://github.com/nwjs/nw.js/)
* [json-stream](https://github.com/mmalecki/json-stream)
* [csv-stream](https://github.com/klaemo/csv-stream)

### Usage
Grunt is used for building and deploying the app for mac, linux and windows.
- To build the app type: 
```sh
$ grunt
```
- To run the app type: 
```sh
$ nw dist
```
ALSO: The executable file will be created in /dist-pkt/releases/*** for each system.

### Csv structure
* The structure of the file must follow rules:
    * File must begin with headers (column names)
    * First column is the timestamp
    * Other values are floats
* Example:
    * File:
    
    timestamp,CORE VOLTAGE,CPU TEMP,GPU TEMP
    Thu Jan 15 16:25:48 2015,0.661133,49.875000,53.125000
    Thu Jan 15 16:25:49 2015,0.677490,49.875000,53.125000
    Thu Jan 15 16:25:49 2015,0.677490,49.875000,53.125000
    Thu Jan 15 16:25:50 2015,0.653809,49.750000,52.875000
    Thu Jan 15 16:25:50 2015,0.653809,49.750000,52.875000
    Thu Jan 15 16:25:51 2015,0.654541,49.750000,53.000000
    Thu Jan 15 16:25:51 2015,0.654541,49.750000,53.000000
    Thu Jan 15 16:25:52 2015,0.672424,49.625000,52.875000
    Thu Jan 15 16:25:52 2015,0.672424,49.625000,52.875000
    Thu Jan 15 16:25:53 2015,0.705627,49.500000,52.750000
    Thu Jan 15 16:25:53 2015,0.705627,49.500000,52.750000
    Thu Jan 15 16:25:54 2015,0.677795,49.500000,52.750000
    Thu Jan 15 16:25:54 2015,0.677795,49.500000,52.750000

    * Data:

| timestamp                | CORE VOLTAGE | CPU TEMP  | GPU TEMP  |
|--------------------------|--------------|-----------|-----------|
| Thu Jan 15 16:25:48 2015 | 0.661133     | 49.875000 | 53.125000 |
| Thu Jan 15 16:25:49 2015 | 0.677490     | 49.875000 | 53.125000 |
| Thu Jan 15 16:25:49 2015 | 0.677490     | 49.875000 | 53.125000 |
| Thu Jan 15 16:25:50 2015 | 0.653809     | 49.750000 | 52.875000 |
| Thu Jan 15 16:25:50 2015 | 0.653809     | 49.750000 | 52.875000 |
| Thu Jan 15 16:25:51 2015 | 0.654541     | 49.750000 | 53.000000 |
| Thu Jan 15 16:25:51 2015 | 0.654541     | 49.750000 | 53.000000 |
| Thu Jan 15 16:25:52 2015 | 0.672424     | 49.625000 | 52.875000 |
| Thu Jan 15 16:25:52 2015 | 0.672424     | 49.625000 | 52.875000 |
| Thu Jan 15 16:25:53 2015 | 0.705627     | 49.500000 | 52.750000 |
| Thu Jan 15 16:25:53 2015 | 0.705627     | 49.500000 | 52.750000 |
| Thu Jan 15 16:25:54 2015 | 0.677795     | 49.500000 | 52.750000 |
| Thu Jan 15 16:25:54 2015 | 0.677795     | 49.500000 | 52.750000 |

### Licence 
The MIT License (MIT)

Copyright (c) 2015 Karol Dzitkowski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.