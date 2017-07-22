var moment = require('moment');
var request = require('request');

var heartdataGenerator = {

    generate: function(data){
        var minute = {};
        request.get('https://s3.ca-central-1.amazonaws.com/www.marcelli.ca/heartrates/2017-07-07/rawminute.json', function(error, response, body){
          minute = JSON.parse(body);
          heartdataGenerator.assemble_minutes(minute, '2017-07-09');
        });
    },

    get_resting_heart: function(minute){
      return new Promise(function(resolve){
        resolve(minute['activities-heart'][0].value.restingHeartRate);
      });
    },

    assemble_minutes: function(minute, date){
      return new Promise(function(resolve){
        var minute_object = {};
        var raw_dataset = minute['activities-heart-intraday'].dataset;
        var parsed_minutes = [];
        raw_dataset.forEach(heartdataGenerator.extract_time, {parsed_minutes, date});
        heartdataGenerator.generate_average({value: 1, type: 'hour'}, parsed_minutes);
        //resolve(dataset);
      })
    },

    generate_average: function(interval, data, isSecond){
      return new Promise(function(resolve){
          var interval_start = moment(data[0].dateTime);
          var interval_end = (interval_start.clone()).add(interval.value, interval.type);
          var averages = [];
          var running_sum = 0, count = 0;
          data.forEach(function(value){

            if(moment(value.dateTime).isBetween(interval_start, interval_end, null, '[]')){
              running_sum += value.value;
              count++;
            }else{
              var midpoint = moment(interval_start.clone()).add((interval.value / 2), interval.type).valueOf();
              averages.push({
                dateTime: midpoint,
                value: running_sum/count
              });
              running_sum = 0;
              count = 0;
              interval_start.add(interval.value, interval.type);
              interval_end.add(interval.value, interval.type);
            }
          });
          console.log(averages);
      });
    },

    extract_time: function(value, index, values){
      var time = value.time;
      var dateTime = moment(this.date + ' ' + time + (moment(this.date).isDST() ? String('-0400') : String('-0500')));
      var datapoint = {
        dateTime: dateTime.valueOf(),
        value: value.value
      }

      var last_item = this.parsed_minutes[this.parsed_minutes.length - 1];
      var last_dateTime = (last_item ? moment(last_item.dateTime) : null);
      var offset = (last_dateTime ? dateTime.diff(last_dateTime, 'minutes') : 0);
      var offset_moment = (offset > 1 ? last_dateTime.clone() : null);
      var null_items = [];

      while(offset_moment && dateTime.diff(offset_moment, 'minutes') >= 0){
        var null_time = offset_moment.add(5, 'minutes').clone();
        null_items.push({dateTime:null_time.valueOf(), no_data: true});
       }

      this.parsed_minutes.push.apply(this.parsed_minutes, null_items);
      this.parsed_minutes.push(datapoint);
    }
}

module.exports = heartdataGenerator;
